import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Typography>Loading…</Typography>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          boxShadow: 1,
        }}
      >
        <IconButton color="inherit" onClick={() => setDrawerOpen(true)} sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          Admin
        </Typography>
        <Typography variant="body2" sx={{ mr: 1 }}>
          {user.email}
        </Typography>
        <IconButton color="inherit" onClick={handleLogout} title="Log out">
          <LogoutIcon />
        </IconButton>
      </Box>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', top: 64 },
        }}
      >
        <Toolbar />
        <List>
          <ListItemButton
            component={Link}
            to="/admin/events"
            selected={location.pathname === '/admin/events'}
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText primary="Events" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: { xs: 0, md: 0 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
