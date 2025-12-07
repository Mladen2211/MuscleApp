import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import styles from './MacroProgress.module.scss';

interface MacroProgressProps {
  label: string;
  icon: JSX.Element;
  current: number;
  max?: number;
  tone?: 'protein' | 'fat' | 'carbs';
}

export function MacroProgress({ label, icon, current, max, tone = 'protein' }: MacroProgressProps) {
  const value = !max || max <= 0 ? 0 : Math.min((current / max) * 100, 100);

  return (
    <Box className={styles.root}>
      <Box className={styles.header}>
        <Typography className={styles.label} variant="body2">
          <span className={styles.icon}>{icon}</span>
          {label}
        </Typography>
        <Typography className={styles.value} variant="body2">
          <span className={styles.current}>{Math.round(current)}</span> / {max ?? 0}g
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        classes={{ root: styles.track, bar: styles[tone] }}
      />
    </Box>
  );
}

export default MacroProgress;

