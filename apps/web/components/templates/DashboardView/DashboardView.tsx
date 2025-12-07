import Grid from '@mui/material/Unstable_Grid2';
import type { FormEvent } from 'react';

import styles from './DashboardView.module.scss';
import { DashboardHeader } from '@/components/organisms/DashboardHeader';
import { MacroSummaryCard } from '@/components/organisms/MacroSummaryCard';
import { MealHistoryList } from '@/components/organisms/MealHistoryList';
import { MealLogger } from '@/components/organisms/MealLogger';
import { Profile, DeficitStatus, MacroTotals, DailyLog, MealFormState } from '@/types';

interface DashboardViewProps {
  profile: Profile | null;
  deficitStatus: DeficitStatus;
  remainingCalories: number;
  totals: MacroTotals;
  log: DailyLog;
  mealForm: MealFormState;
  onMealChange: (field: keyof MealFormState, value: string) => void;
  onMealSubmit: (event: FormEvent) => void;
  onRemoveMeal: (id: string) => void;
}

export function DashboardView({
  profile,
  deficitStatus,
  remainingCalories,
  totals,
  log,
  mealForm,
  onMealChange,
  onMealSubmit,
  onRemoveMeal
}: DashboardViewProps) {
  return (
    <Grid container spacing={3} className={styles.section}>
      <Grid xs={12}>
        <DashboardHeader profile={profile} deficitStatus={deficitStatus} />
      </Grid>
      <Grid xs={12} md={8}>
        <MacroSummaryCard profile={profile} remainingCalories={remainingCalories} totals={totals} />
      </Grid>
      <Grid xs={12} md={4}>
        <MealLogger mealForm={mealForm} onChange={onMealChange} onSubmit={onMealSubmit} />
      </Grid>
      <Grid xs={12}>
        <MealHistoryList meals={log.meals} onRemove={onRemoveMeal} />
      </Grid>
    </Grid>
  );
}

export default DashboardView;
