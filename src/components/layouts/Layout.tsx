import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import MenuRounded from "@mui/icons-material/MenuRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import ThemeSwitcher from "./../ThemeSwitcher";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../../store/authSlice";
import {
  DarkModeRounded,
  Email,
  ExpandLess,
  ExpandMore,
  LightModeRounded,
} from "@mui/icons-material";
import { navItems } from "./NavItems";
import { toggleMode } from "../../store/themeSlice";
import { Alert } from "../../helpers/AlertComponent";

const drawerWidth = 250;
export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useAppSelector((s) => s.auth.data);
  const mode = useAppSelector((s) => s.theme.mode);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

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
    setOpenSubmenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };


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
  }, [location.pathname]);

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

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: (theme) => `0px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            SCE Workflow
          </Link>
        </Typography>
      </Box>
      {/* <Divider /> */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List>
          {/* {user?.listMenu.map((item) => { */}
          {navItems.map((item) => {
            // Check if main item is active or if any sub-item is active
            const isMainItemActive =
              location.pathname === item.path ||
              (item.subMenus && isSubItemActive(item.subMenus));

            return (
              <div key={item.path}>
                <ListItemButton
                  component={item.subMenus.length > 0 ? "div" : NavLink}
                  to={item.subMenus.length > 0 ? undefined : item.path}
                  onClick={(
                    e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>
                  ) => {
                    if (item.subMenus.length > 0) {
                      e.preventDefault();
                      toggleSubmenu(item.path);
                    } else {
                      // Only close drawer for items without sub-items
                      setMobileOpen(false);
                    }
                  }}
                  
                  selected={isMainItemActive} // Set selected state
                >
                  <ListItemIcon>{renderIcon(item.icon)}</ListItemIcon>
                  <ListItemText primary={item.name} />
                  {item.subMenus.length > 0 &&
                    (openSubmenus[item.path] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>

                {item.subMenus.length > 0 && (
                  <Collapse
                    in={openSubmenus[item.path]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.subMenus.map((subItem) => (
                        <ListItemButton
                          key={subItem.path}
                          component={NavLink}
                          to={subItem.path}
                          sx={{
                            pl: 4,
                           
                          }}
                          onClick={() => setMobileOpen(false)}
                        >
                          <ListItemIcon>
                            {renderIcon(subItem.icon)}
                          </ListItemIcon>
                          <ListItemText primary={subItem.name} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
            );
          })}
        </List>
      </Box>
      {/* <Divider /> */}
      <Box sx={{ p: 2 }}>
        {/* <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<LogoutRounded />}
          onClick={async () => {
            await dispatch(logout());
            navigate("/login");
          }}
        >
          Logout
        </Button> */}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backdropFilter: "saturate(180%) blur(6px)",
          bgColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Toolbar sx={{ gap: 1, border: "none" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ display: { md: "none" } }}
          >
            <MenuRounded />
          </IconButton>
          <Typography variant="h4" sx={{ flex: 1 }}>
            
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Box>
              <Typography variant="body2" sx={{ mr: 1 }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {user?.buName}
              </Typography>
            </Box>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar
                src={user?.imageProfile}
                sx={{ width: 40, height: 40 }}
              ></Avatar>
            </IconButton>
          </Stack>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem disabled>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              {user?.email}
            </MenuItem>
            <MenuItem
              onClick={async () => {
                await dispatch(toggleMode());
              }}
            >
              <ListItemIcon>
                {mode === "light" ? <DarkModeRounded /> : <LightModeRounded />}
              </ListItemIcon>
              <ListItemText>
                Switch to {mode === "light" ? "dark" : "light"} mode
              </ListItemText>
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
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
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
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
