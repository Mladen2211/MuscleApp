import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FaXmark } from 'react-icons/fa6';

import styles from './MealHistoryItem.module.scss';
import { Meal } from '@/types';

interface MealHistoryItemProps {
  meal: Meal;
  onRemove: (id: string) => void;
}

export function MealHistoryItem({ meal, onRemove }: MealHistoryItemProps) {
  return (
    <Paper className={styles.card} elevation={0}>
      <div className={styles.left}> 
        <div className={styles.avatar}>{meal.name.charAt(0).toUpperCase()}</div>
        <div>
          <Typography variant="subtitle2" className={styles.title}>
            {meal.name}
          </Typography>
          <div className={styles.macros}>
            <span className={`${styles.tag} ${styles.protein}`}>{meal.p}P</span>
            <span className={`${styles.tag} ${styles.fat}`}>{meal.f}F</span>
            <span className={`${styles.tag} ${styles.carbs}`}>{meal.c}C</span>
            <span className={styles.calories}>({meal.k} kcal)</span>
          </div>
        </div>
      </div>
      <IconButton aria-label={`Remove ${meal.name}`} onClick={() => onRemove(meal.id)} className={styles.remove}>
        <FaXmark />
      </IconButton>
    </Paper>
  );
}

export default MealHistoryItem;
