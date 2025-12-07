import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import styles from './SettingsView.module.scss';
import { AppearanceGrid } from '@/components/organisms/AppearanceGrid';
import { DataStorageCard } from '@/components/organisms/DataStorageCard';
import { LocalizationCard } from '@/components/organisms/LocalizationCard';
import type { ThemeSetting } from '@/types';

interface SettingsViewProps {
  theme: ThemeSetting;
  onThemeChange: (theme: ThemeSetting) => void;
  onExport: () => void;
  onReset: () => void;
}

export function SettingsView({ theme, onThemeChange, onExport, onReset }: SettingsViewProps) {
  return (
    <Grid container spacing={3} className={styles.section}>
      <Grid xs={12}>
        <header className={styles.header}>
          <Typography variant="h4" className={styles.title} component="h1">
            Settings
          </Typography>
          <Typography variant="body2" className={styles.subtitle} component="p">
            App customization.
          </Typography>
        </header>
      </Grid>
      <Grid xs={12} md={6}>
        <AppearanceGrid theme={theme} onChange={onThemeChange} />
        <Box sx={{ mt: 3 }}>
          <LocalizationCard language="en" onLanguageChange={() => {}} />
        </Box>
      </Grid>
      <Grid xs={12} md={6}>
        <DataStorageCard onExport={onExport} onReset={onReset} />
      </Grid>
    </Grid>
  );
}

export default SettingsView;
