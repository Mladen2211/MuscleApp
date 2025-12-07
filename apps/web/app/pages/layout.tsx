'use client';

import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Container from '@mui/material/Container';
import { usePathname, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { ToastStack } from '@/components/organisms/ToastStack';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  borderRight: 'none',
  background: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(12px)',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  borderRight: 'none',
  background: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(12px)',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  minHeight: 64,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/pages/dashboard' },
  { text: 'Activity', icon: <FitnessCenterIcon />, path: '/pages/activity' },
  { text: 'Profile', icon: <PersonIcon />, path: '/pages/profile' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/pages/settings' },
];

const roleItems = [
  { text: 'Admin', icon: <AdminPanelSettingsIcon />, path: '/pages/admin' },
  { text: 'Coach', icon: <SupervisorAccountIcon />, path: '/pages/coach' },
  { text: 'Nutrition', icon: <RestaurantIcon />, path: '/pages/nutrition' },
];

import NotificationsIcon from '@mui/icons-material/Notifications';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { theme: appTheme, toasts, hydrate } = useAppStore();

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Sync theme with document
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const shouldDark = appTheme === 'dark' || (appTheme === 'system' && media.matches);
      document.documentElement.classList.toggle('dark', shouldDark);
    };
    applyTheme();
    if (appTheme === 'system') {
      media.addEventListener('change', applyTheme);
      return () => media.removeEventListener('change', applyTheme);
    }
  }, [appTheme]);

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ justifyContent: open ? 'space-between' : 'center', px: 2.5 }}>
            {open && (
                <Box sx={{ fontWeight: 800, fontSize: '1.25rem', color: 'primary.main' }}>
                    MuscleApp
                </Box>
            )}
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => {
            const isSelected = pathname?.startsWith(item.path);
            return (
            <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 1 }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  ...(isSelected && {
                    background: theme.palette.mode === 'dark' 
                        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)' 
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%)',
                    boxShadow: theme.palette.mode === 'dark'
                        ? '0 4px 12px rgba(0,0,0,0.4)'
                        : '0 4px 12px rgba(0,0,0,0.05)',
                    '& .MuiListItemIcon-root': {
                        color: 'primary.main'
                    },
                    '& .MuiTypography-root': {
                        fontWeight: 600,
                        color: 'text.primary'
                    }
                  })
                }}
                selected={isSelected}
                onClick={() => router.push(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color: isSelected ? 'primary.main' : 'text.secondary'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            );
          })}
        </List>
        <Divider sx={{ my: 1, mx: 2, opacity: 0.5 }} />
        <List sx={{ px: 2 }}>
          {roleItems.map((item) => {
             const isSelected = pathname?.startsWith(item.path);
             return (
            <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 1 }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  ...(isSelected && {
                    background: theme.palette.mode === 'dark' 
                        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)' 
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%)',
                    boxShadow: theme.palette.mode === 'dark'
                        ? '0 4px 12px rgba(0,0,0,0.4)'
                        : '0 4px 12px rgba(0,0,0,0.05)',
                    '& .MuiListItemIcon-root': {
                        color: 'primary.main'
                    },
                    '& .MuiTypography-root': {
                        fontWeight: 600,
                        color: 'text.primary'
                    }
                  })
                }}
                selected={isSelected}
                onClick={() => router.push(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color: isSelected ? 'primary.main' : 'text.secondary'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
             );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Box>
        <Container maxWidth={false} sx={{ flexGrow: 1, pb: 4, maxWidth: '1180px' }}>
            {children}
        </Container>
      </Box>
      <ToastStack toasts={toasts} />
    </Box>
  );
}
