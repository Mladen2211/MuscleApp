import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import styles from './DashboardHeader.module.scss';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { Profile, DeficitStatus } from '@/types';

interface DashboardHeaderProps {
  profile: Profile | null;
  deficitStatus: DeficitStatus;
}

export function DashboardHeader({ profile, deficitStatus }: DashboardHeaderProps) {
  const firstName = profile?.firstName || 'Athlete';

  return (
    <Box component="header" className={styles.header}>
      <div>
        <Typography variant="h5" className={styles.title} component="h1">
          MuscleApp
        </Typography>
        <Typography variant="caption" className={styles.subtitle}>
          Hi, <span>{firstName}</span>
        </Typography>
      </div>
      <StatusBadge tone={deficitStatus.tone} label={deficitStatus.label} />
    </Box>
  );
}

export default DashboardHeader;
