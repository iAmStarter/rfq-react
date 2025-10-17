import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Collapse,
  Tooltip,
  Popover,
  useTheme,
  Badge,
} from "@mui/material";
import MenuRounded from "@mui/icons-material/MenuRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  DarkModeRounded,
  Email,
  ExpandLess,
  ExpandMore,
  LightModeRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../../store/authSlice";
import { navItems } from "./NavItems";
import { toggleMode } from "../../store/themeSlice";
import { Alert } from "../../helpers/AlertComponent";

const drawerWidth = 250;
const miniWidth = 80;

export default function Layout() {
  const theme = useTheme();

  // Mobile drawer toggle
  const [mobileOpen, setMobileOpen] = useState(false);

  // User menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Mini-rail toggle (persisted)
  const [isMini, setIsMini] = useState<boolean>(() => {
    const saved = localStorage.getItem("layout:isMini");
    return saved ? saved === "1" : false;
  });
  useEffect(() => {
    localStorage.setItem("layout:isMini", isMini ? "1" : "0");
  }, [isMini]);

  const drawerWidthComputed = isMini ? miniWidth : drawerWidth;

  const user = useAppSelector((s) => s.auth.data);
  const mode = useAppSelector((s) => s.theme.mode);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Open states for expanded drawer (non-mini)
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>(
    () => {
      const init: Record<string, boolean> = {};
      for (const item of navItems) {
        const hasSub = Array.isArray(item.subMenus) && item.subMenus.length > 0;
        const matchesSelf =
          location.pathname === item.path ||
          location.pathname.startsWith(item.path + "/");
        let shouldOpen = false;
        if (hasSub) {
          shouldOpen = item.subMenus.some(
            (sub: any) =>
              location.pathname === sub.path ||
              location.pathname === sub.to ||
              location.pathname.startsWith((sub.to || sub.path) + "/")
          );
        }
        init[item.path] = shouldOpen || matchesSelf;
      }
      return init;
    }
  );

  // ---------- Mini-mode popover management (CLICK ONLY) ----------
  const [miniAnchors, setMiniAnchors] = useState<Record<string, HTMLElement | null>>({});
  const [currentOpenPath, setCurrentOpenPath] = useState<string | null>(null);
  const openTimers = useRef<Record<string, number>>({});
  const closeTimers = useRef<Record<string, number>>({});

  const clearTimer = (map: React.MutableRefObject<Record<string, number>>, key: string) => {
    if (map.current[key]) {
      window.clearTimeout(map.current[key]);
      delete map.current[key];
    }
  };

  const scheduleOpen = (path: string, el: HTMLElement, delay = 0) => {
    // Only click/keyboard uses this; delay kept for parity and easy tuning
    clearTimer(closeTimers, path);
    if (currentOpenPath && currentOpenPath !== path) {
      setMiniAnchors((prev) => ({ ...prev, [currentOpenPath]: null }));
    }
    clearTimer(openTimers, path);
    openTimers.current[path] = window.setTimeout(() => {
      setMiniAnchors((prev) => ({ ...prev, [path]: el }));
      setCurrentOpenPath(path);
    }, delay);
  };

  const scheduleClose = (path: string, delay = 0) => {
    clearTimer(openTimers, path);
    clearTimer(closeTimers, path);
    closeTimers.current[path] = window.setTimeout(() => {
      setMiniAnchors((prev) => ({ ...prev, [path]: null }));
      if (currentOpenPath === path) setCurrentOpenPath(null);
    }, delay);
  };

  // Close all popovers and recompute which sections should be open on route change
  useEffect(() => {
    const updated: Record<string, boolean> = {};
    for (const item of navItems) {
      const hasSub = Array.isArray(item.subMenus) && item.subMenus.length > 0;
      let shouldOpen = false;
      if (hasSub) {
        shouldOpen = item.subMenus.some(
          (sub: any) =>
            location.pathname === sub.path ||
            location.pathname === sub.to ||
            location.pathname.startsWith((sub.to || sub.path) + "/")
        );
      }
      const matchesSelf =
        location.pathname === item.path ||
        location.pathname.startsWith(item.path + "/");
      updated[item.path] = shouldOpen || matchesSelf;
    }
    setOpenSubmenus(updated);

    // close mini popovers on route change
    setMiniAnchors({});
    setCurrentOpenPath(null);
    Object.keys(openTimers.current).forEach((k) => clearTimer(openTimers, k));
    Object.keys(closeTimers.current).forEach((k) => clearTimer(closeTimers, k));
  }, [location.pathname]);

  // ---------------------------------------------------------------

  const isSubItemActive = (subItems: any[]) => {
    if (!subItems || !Array.isArray(subItems)) return false;
    return subItems.some((subItem) => {
      const target = subItem?.to || subItem?.path;
      if (!target || typeof target !== "string") return false;
      return (
        location.pathname === target ||
        location.pathname.startsWith(target + "/")
      );
    });
  };

  const toggleSubmenu = (path: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderIcon = (icon: React.ElementType | string | undefined) => {
    if (!icon) return null;
    if (typeof icon === "function" || typeof icon === "object") {
      const IconComponent = icon as React.ElementType;
      return <IconComponent />;
    }
    if (typeof icon === "string") {
      return <i className={icon} style={{ width: 24, textAlign: "center" }} />;
    }
    return null;
  };

  const signout = async () => {
    const result = await Alert.confirm("Are you sure to logout?");
    if (result.isConfirmed) {
      await dispatch(logout());
      navigate("/login");
    }
  };

  const drawerHeader = (
    <Box
      sx={{
        p: 2,
        borderBottom: (t) => `0px solid ${t.palette.divider}`,
        display: "flex",
        alignItems: "center",
        justifyContent: isMini ? "center" : "space-between",
        gap: 1,
        minHeight: 64,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // ensures centered text
          flexGrow: 1,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          noWrap
          sx={{
            flexGrow: 1,
            textAlign: "center",
            transition: theme.transitions.create(["opacity", "width"], {
              duration: theme.transitions.duration.shorter,
            }),
            background: "linear-gradient(90deg, #5ca581ff 0%, #7f9cb8ff 100%)", // pastel gradient fill
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", // makes text gradient-filled
            letterSpacing: 1,
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "inline-block",
              width: "100%",
              textAlign: "center",
            }}
          >
            {isMini ? "SCE" : "SCE Workflow"}
          </Link>
        </Typography>
      </Box>


    </Box>
  );

  const drawerList = (
    <List sx={{ py: 1 }}>
      {navItems.map((item) => {
        const hasSubs = Array.isArray(item.subMenus) && item.subMenus.length > 0;
        const isMainItemActive =
          location.pathname === item.path ||
          (hasSubs && isSubItemActive(item.subMenus));

        const pathKey = item.path;

        // CLICK ONLY: open/close popover in mini mode
        const onMiniClick = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
          if (isMini && hasSubs) {
            e.preventDefault();
            const el = e.currentTarget as HTMLElement;
            if (miniAnchors[pathKey]) {
              scheduleClose(pathKey, 0);
            } else {
              scheduleOpen(pathKey, el, 0);
            }
          }
        };
        const onMiniKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (!isMini || !hasSubs) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (miniAnchors[pathKey]) {
              scheduleClose(pathKey, 0);
            } else {
              scheduleOpen(pathKey, e.currentTarget as HTMLElement, 0);
            }
          }
        };

        const itemButton = (
          <ListItemButton
            component={hasSubs ? "div" : NavLink}
            to={hasSubs ? undefined : item.path}
            onClick={(e) => {
              if (hasSubs) {
                if (isMini) onMiniClick(e);
                else {
                  e.preventDefault();
                  toggleSubmenu(item.path);
                }
              } else {
                setMobileOpen(false);
              }
            }}
            onKeyDown={onMiniKeyDown}
            selected={isMainItemActive}
            sx={{
              mx: 1.5,
              my: 0.5,
              borderRadius: 1.5,
              px: isMini ? 1.2 : 1.5,
              justifyContent: isMini ? "center" : "flex-start",
              transition: theme.transitions.create(["padding", "width"], {
                duration: theme.transitions.duration.shorter,
              }),
              cursor: "pointer",
            }}
            aria-haspopup={hasSubs ? "menu" : undefined}
            aria-expanded={Boolean(miniAnchors[pathKey])}
            aria-controls={hasSubs ? `mini-popover-${pathKey}` : undefined}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isMini ? 0 : 1.5,
                justifyContent: "center",
              }}
            >
              {renderIcon(item.icon)}
            </ListItemIcon>

            <ListItemText
              primary={item.name}
              sx={{
                opacity: isMini ? 0 : 1,
                ml: isMini ? 0 : 0.5,
                transition: theme.transitions.create(["opacity", "margin"], {
                  duration: theme.transitions.duration.shorter,
                }),
                whiteSpace: "nowrap",
              }}
            />
            {!isMini && hasSubs && (openSubmenus[item.path] ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        );

        return (
          <div key={pathKey}>
            {isMini ? (
              <Tooltip title={item.name} placement="right">
                {/* Make wrapper full-width so centering is exact */}
                <div style={{ width: "100%" }}>
                  <ListItemButton
                    component={hasSubs ? "div" : NavLink}
                    to={hasSubs ? undefined : item.path}
                    selected={isMainItemActive}
                    onClick={(e) => {
                      if (hasSubs) onMiniClick(e);
                      else setMobileOpen(false);
                    }}
                    sx={{
                      // center the item inside the 80px rail
                      mx: 1,                 // small side margins for pleasant spacing
                      my: 0.5,
                      px: 0,                 // remove horizontal padding
                      height: 44,           // fixed hit target
                      borderRadius: 1.5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        // hard-center the icon
                        minWidth: 0,
                        m: 0,
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {renderIcon(item.icon)}
                    </ListItemIcon>
                  </ListItemButton>
                </div>
              </Tooltip>
            ) : (
              itemButton
            )}


            {/* Expanded nested list when NOT mini */}
            {!isMini && hasSubs && (
              <Collapse in={openSubmenus[pathKey]} timeout="auto" unmountOnExit>
                {/* Rail wrapper */}
                <Box sx={{ position: "relative", pl: 2 /* keep your indent */ }}>
                  {/* Vertical rail */}
                  <Box
                    sx={(t) => ({
                      position: "absolute",
                      left: 26,               // align with child indent (tweak if needed)
                      top: -10,
                      bottom: 6,
                      width: 2,
                      bgcolor: t.palette.mode === "light" ? t.palette.divider : t.palette.action.hover,
                      borderRadius: 999,      // rounded caps
                      pointerEvents: "none",
                    })}
                  />
                  <List component="div" disablePadding sx={{ pr: 0.5 }}>
                    {item.subMenus.map((subItem: any, idx: number) => (
                      <ListItemButton
                        key={subItem.path}
                        component={NavLink}
                        to={subItem.path}
                        onClick={() => setMobileOpen(false)}
                        sx={(t) => ({
                          // spacing & shape
                          // mx: 1.5,
                          // mr: 2,
                          height: 35,
                          borderRadius: 12,
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                          borderTopRightRadius: 24,
                          borderBottomRightRadius: 24,
                          // pl: 4.5, // indent so text clears the rail + dot
                          minHeight: 40,

                          // draw a small connector dot on the rail
                          // position: "relative",
                          // "&::before": {
                          //   content: '""',
                          //   position: "absolute",
                          //   left: 1,           // center of the rail (left + rail width/2)
                          //   top: "50%",
                          //   transform: "translate(-50%, -50%)",
                          //   width: 10,
                          //   height: 10,
                          //   borderRadius: "50%",
                          //   backgroundColor: t.palette.mode === "light"
                          //     ? "#CFE7DB"
                          //     : "#2C4437"
                          // },

                          // selected state: tint the dot and give subtle bg
                          "&.Mui-selected::before": {
                            backgroundColor: t.palette.primary.main,
                          },
                          "&.Mui-selected": {
                            backgroundColor: t.palette.action.selected,
                            "&:hover": {
                              backgroundColor: t.palette.action.selected,
                            },
                          },
                        })}
                      >
                        <ListItemIcon sx={{ minWidth: 0, mr: 0.5 }}>
                          {renderIcon(subItem.icon)}
                        </ListItemIcon>
                        <ListItemText primary={subItem.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </Collapse>

            )}

            {/* Mini-mode submenu popover (CLICK ONLY) */}
            {isMini && hasSubs && (
              <Popover
                id={`mini-popover-${pathKey}`}
                open={Boolean(miniAnchors[pathKey])}
                anchorEl={miniAnchors[pathKey]}
                onClose={() => scheduleClose(pathKey, 0)} // close on outside click / ESC
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                disableAutoFocus
                disableEnforceFocus
                disableRestoreFocus
                PaperProps={{
                  sx: {
                    ml: 0.5,
                    minWidth: 220,
                    overflow: "hidden",
                    border: (t) => `1px solid ${t.palette.divider}`,
                    boxShadow: (t) => t.shadows[4],
                  },
                }}
              >
                <List dense disablePadding>
                  {item.subMenus.map((subItem: any) => (
                    <ListItemButton
                      key={subItem.path}
                      component={NavLink}
                      to={subItem.path}
                      onClick={() => {
                        setMobileOpen(false);
                        scheduleClose(pathKey, 0);
                      }}
                      sx={{ px: 2.25, py: 1.25 }}
                    >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        {renderIcon(subItem.icon)}
                      </ListItemIcon>
                      <ListItemText primary={subItem.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Popover>
            )}
          </div>
        );
      })}
    </List>
  );

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 0 }}>
      {drawerHeader}
      <Box sx={{ flex: 1, overflowY: "auto" }}>{drawerList}</Box>
      <Box sx={{ p: 1.5 }}>{/* footer if needed */}</Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        sx={{
          width: { md: `calc(100% - ${drawerWidthComputed}px)` },
          ml: { md: `${drawerWidthComputed}px` },
          backdropFilter: "saturate(180%) blur(6px)",
          bgColor: (t) => t.palette.background.paper,
          transition: theme.transitions.create(["width", "margin"], {
            duration: theme.transitions.duration.shorter,
          }),
          border: "none",
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {/* Mobile hamburger */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ display: { md: "none" } }}
          >
            <MenuRounded />
          </IconButton>

          {/* Desktop mini toggle */}
          <IconButton
            onClick={() => setIsMini((v) => !v)}
            sx={{ display: { xs: "none", md: "inline-flex" } }}
            edge="start"
            aria-label={isMini ? "Expand side menu" : "Collapse side menu"}
          >
            {isMini ? <ChevronRightRounded /> : <ChevronLeftRounded />}
          </IconButton>

          <Typography variant="h4" sx={{ flex: 1 }} />
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ pr: 3 }}>
              <Badge badgeContent={4} sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ff756bff', // or your custom color
                  color: '#fff',
                },
              }}>
                <NotificationsIcon color="primary" />
              </Badge>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mr: 1 }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {user?.buName}
              </Typography>
            </Box>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar src={user?.imageProfile} sx={{ width: 40, height: 40 }} />
            </IconButton>
          </Stack>
          <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
            <MenuItem disabled>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              {user?.email}
            </MenuItem>
            <MenuItem
              onClick={async () => {
                await dispatch(toggleMode());
                setAnchorEl(null);
              }}
            >
              <ListItemIcon>{mode === "light" ? <DarkModeRounded /> : <LightModeRounded />}</ListItemIcon>
              <ListItemText>Switch to {mode === "light" ? "dark" : "light"} mode</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={async () => {
                await signout();
                setAnchorEl(null);
              }}
            >
              <ListItemIcon>
                <LogoutRounded />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Box component="nav" sx={{ width: { md: drawerWidthComputed }, flexShrink: { md: 0 } }} aria-label="menu">
        {/* Mobile drawer (unchanged) */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer with mini-variant */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              overflowX: "hidden",
              whiteSpace: "nowrap",
              width: drawerWidthComputed,
              transition: theme.transitions.create("width", {
                duration: theme.transitions.duration.shorter,
              }),
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidthComputed}px)` },
          transition: theme.transitions.create("width", {
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
