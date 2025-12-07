import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FaBreadSlice, FaCheese, FaDrumstickBite } from 'react-icons/fa6';


import styles from './MacroSummaryCard.module.scss';
import { MacroProgress } from '@/components/molecules/MacroProgress';
import { formatNumber } from '@/lib/utils';
import { Profile, MacroTotals } from '@/types';

interface MacroSummaryCardProps {
  remainingCalories: number;
  profile: Profile | null;
  totals: MacroTotals;
}

export function MacroSummaryCard({ remainingCalories, profile, totals }: MacroSummaryCardProps) {
  return (
    <Paper className={styles.card} elevation={0}>
      <div className={styles.glow} />
      <div className={styles.headerRow}>
        <div>
          <span className={styles.label}>Calories Remaining</span>
          <Typography variant="h2" className={styles.remaining} id="display-remaining">
            {formatNumber(Math.max(remainingCalories, 0))}
          </Typography>
        </div>
        <div className={styles.targetBox}>
          <span className={styles.label}>Target</span>
          <Typography variant="h6" className={styles.target}>
            {formatNumber(profile?.dailyCalories)}
          </Typography>
        </div>
      </div>
      <div className={styles.progressList}>
        <MacroProgress label="Protein" icon={<FaDrumstickBite />} current={totals.protein} max={profile?.macros.protein} tone="protein" />
        <MacroProgress label="Fat" icon={<FaCheese />} current={totals.fat} max={profile?.macros.fat} tone="fat" />
        <MacroProgress label="Carbs" icon={<FaBreadSlice />} current={totals.carbs} max={profile?.macros.carbs} tone="carbs" />
      </div>
    </Paper>
  );
}

export default MacroSummaryCard;
