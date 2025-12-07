'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';

import { createAppTheme } from '@/lib/theme';
import { useAppStore } from '@/store/useAppStore';

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const themeSetting = useAppStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = useMemo(() => createAppTheme(themeSetting === 'dark' ? 'dark' : 'light'), [themeSetting]);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
