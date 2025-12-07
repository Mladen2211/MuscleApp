import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


import styles from './MealHistoryList.module.scss';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import { MealHistoryItem } from '@/components/molecules/MealHistoryItem';
import { Meal } from '@/types';

interface MealHistoryListProps {
  meals: Meal[];
  onRemove: (id: string) => void;
}

export function MealHistoryList({ meals, onRemove }: MealHistoryListProps) {
  return (
    <section className={styles.section}>
      <SectionLabel className={styles.label}>Today&apos;s History</SectionLabel>
      <Stack spacing={1.5} className={styles.list}>
        {meals.length === 0 && (
          <Paper className={styles.empty} variant="outlined">
            <Typography variant="body2">No meals logged yet today.</Typography>
          </Paper>
        )}
        {meals
          .slice()
          .reverse()
          .map((meal) => (
            <MealHistoryItem key={meal.id} meal={meal} onRemove={onRemove} />
          ))}
      </Stack>
    </section>
  );
}

export default MealHistoryList;
