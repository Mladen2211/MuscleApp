import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './GoalOptionCard.module.scss';
import { GoalDefinition } from '@/types';

interface GoalOptionCardProps {
  goal: GoalDefinition;
  selected: boolean;
  onSelect: () => void;
}

export function GoalOptionCard({ goal, selected, onSelect }: GoalOptionCardProps) {
  const GoalIcon = goal.Icon;

  return (
    <label className={styles.wrapper} onClick={onSelect}>
      <Box className={`${styles.card} ${selected ? styles.selected : ''}`}>
        <div className={styles.left}>
                <div className={`${styles.iconBox} ${styles[goal.accent ?? 'primary']}`}>
            <GoalIcon />
          </div>
          <div>
            <Typography variant="subtitle2" className={styles.title}>
              {goal.name}
            </Typography>
            <Typography variant="caption" className={styles.description}>
              {goal.description}
            </Typography>
          </div>
        </div>
        <div className={`${styles.check} ${selected ? styles.checkActive : ''}`}>
          <CheckIcon fontSize="small" />
        </div>
      </Box>
    </label>
  );
}

export default GoalOptionCard;
