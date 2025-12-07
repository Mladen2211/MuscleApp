import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FaCheck, FaDumbbell } from 'react-icons/fa6';

import styles from './TrainingCard.module.scss';
import { GlassPanel } from '@/components/atoms/GlassPanel';

interface TrainingCardProps {
  trained: boolean;
  onToggle: () => void;
  isEditing?: boolean;
}

export function TrainingCard({ trained, onToggle, isEditing = false }: TrainingCardProps) {
  return (
    <GlassPanel className={styles.card}>
      <div className={styles.iconShell}>
        <div className={`${styles.iconCircle} ${trained ? styles.iconCircleDone : ''}`}>
          {trained ? <FaCheck /> : <FaDumbbell />}
        </div>
        <div className={`${styles.statePill} ${trained ? styles.stateDone : ''}`}>{trained ? 'DONE' : 'PENDING'}</div>
      </div>
      <div className={styles.copy}>
        <Typography variant="h6" className={styles.title}>
          Heavy Training
        </Typography>
        <Typography variant="body2" className={`${styles.subtitle} ${trained ? styles.success : ''}`}>
          {trained ? 'Excellent work today!' : 'Log your session for today.'}
        </Typography>
      </div>
      {isEditing && (
        <Button
          type="button"
          onClick={onToggle}
          variant={trained ? 'contained' : 'outlined'}
          color={trained ? 'success' : 'inherit'}
          fullWidth
          className={styles.action}
        >
          {trained ? 'Completed ✅' : 'Mark as Completed'}
        </Button>
      )}
    </GlassPanel>
  );
}

export default TrainingCard;
