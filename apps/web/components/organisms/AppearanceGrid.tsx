import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Box from '@mui/material/Box';

import styles from './AppearanceGrid.module.scss';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import type { ThemeSetting } from '@/types';

interface AppearanceGridProps {
  theme: ThemeSetting;
  // options: ThemeOption[]; // Removed as we are using hardcoded toggles
  onChange: (theme: ThemeSetting) => void;
}

export function AppearanceGrid({ theme, onChange }: AppearanceGridProps) {
  const handleThemeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTheme: ThemeSetting | null,
  ) => {
    if (newTheme !== null) {
      onChange(newTheme);
    }
  };

  return (
    <Stack component="section" spacing={2} className={styles.section}>
      <SectionLabel className={styles.label}>Appearance</SectionLabel>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
            Choose your preferred theme:
        </Typography>
        <ToggleButtonGroup
            value={theme}
            exclusive
            onChange={handleThemeChange}
            aria-label="theme selection"
            size="small"
            sx={{
                '& .MuiToggleButton-root': {
                    borderRadius: '10px',
                    px: 2,
                    py: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        }
                    }
                }
            }}
        >
            <ToggleButton value="light" aria-label="light theme">
                <LightModeIcon sx={{ mr: 1, fontSize: 20 }} />
                Light
            </ToggleButton>
            <ToggleButton value="system" aria-label="system theme">
                <SettingsBrightnessIcon sx={{ mr: 1, fontSize: 20 }} />
                System
            </ToggleButton>
            <ToggleButton value="dark" aria-label="dark theme">
                <DarkModeIcon sx={{ mr: 1, fontSize: 20 }} />
                Dark
            </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Stack>
  );
}

export default AppearanceGrid;
