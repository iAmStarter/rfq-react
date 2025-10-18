import React, { useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { setReadData } from "../../store/notifySlice";
import { Menu, MenuItem, IconButton, Badge, ListItemIcon, ListItemText, Skeleton } from "@mui/material";
import { Notifications, Assignment, CheckCircle, Error, Info } from "@mui/icons-material";
import type { Notification as NotificationType } from "../../types";
import { useNavigate } from "react-router-dom";

export default function NotificationMenu() {
  const notifAnchorRef = useRef<HTMLButtonElement | null>(null);
  const notifMenuRef = useRef<HTMLUListElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const notifications = useAppSelector((s) => s.notify.data);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((s) => s.notify.loading);
  const [hasMore] = React.useState(true);
  const navigate = useNavigate();

  const handleNotifOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleNotifClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleNotifClick = useCallback((item: NotificationType) => {
    dispatch(setReadData(item.id));
    setAnchorEl(null);
    navigate(item.link);
  }, [dispatch, navigate]);

  const handleNotifScroll = useCallback((e: React.UIEvent<HTMLUListElement>) => {
    const target = e.target as HTMLUListElement;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
      if (hasMore && !loading) {
        // Load more notifications here if needed
      }
    }
  }, [hasMore, loading]);

  return (
    <>
      <IconButton color="inherit" onClick={handleNotifOpen} size="large" ref={notifAnchorRef}>
        <Badge badgeContent={notifications.filter(n => n.unread).length} color="error" max={99}>
          <Notifications fontSize="medium" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleNotifClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            minWidth: 320,
            maxHeight: 400,
            overflowY: 'auto',
          },
        }}
        MenuListProps={{
          ref: notifMenuRef,
          onScroll: handleNotifScroll,
        }}
      >
        {notifications.length === 0 && !loading ? (
          <MenuItem disabled>ไม่มีการแจ้งเตือน</MenuItem>
        ) : (
          <>
            {notifications.map((n) => {
              let icon = null;
              switch (n.type) {
                case 'task': icon = <Assignment fontSize="small" color="primary" />; break;
                case 'approve': icon = <CheckCircle fontSize="small" color="success" />; break;
                case 'reject': icon = <Error fontSize="small" color="error" />; break;
                case 'info': icon = <Info fontSize="small" color="info" />; break;
                default: icon = <Info fontSize="small" />;
              }
              return (
                <MenuItem key={n.id} onClick={() => handleNotifClick(n)} selected={n.unread}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={n.text} />
                </MenuItem>
              );
            })}
            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <MenuItem key={`skeleton-${i}`} disabled>
                  <ListItemIcon>
                    <Skeleton variant="circular" width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Skeleton variant="rounded" width="80%" height={16} />}
                  />
                </MenuItem>
              ))}
            {!hasMore && !loading && notifications.length > 0 && (
              <MenuItem disabled sx={{ justifyContent: 'center', opacity: 0.7 }}>
                <ListItemText primary="โหลดครบแล้ว" sx={{ textAlign: 'center' }} />
              </MenuItem>
            )}
          </>
        )}
      </Menu>
    </>
  );
}
