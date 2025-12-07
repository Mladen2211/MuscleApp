import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FaPersonRunning } from 'react-icons/fa6';

import styles from './ActivityStepsCard.module.scss';
import { GlassPanel } from '@/components/atoms/GlassPanel';

interface ActivityStepsCardProps {
  steps: string;
  onChange: (value: string) => void;
  isEditing?: boolean;
}

export function ActivityStepsCard({ steps, onChange, isEditing = false }: ActivityStepsCardProps) {
  return (
    <GlassPanel className={styles.card}>
      <div className={styles.info}>
        <div className={styles.iconWrap}>
          <FaPersonRunning />
        </div>
        <div>
          <Typography variant="subtitle1" className={styles.title}>
            Daily Steps
          </Typography>
          <Typography variant="caption" className={styles.caption}>
            Target: 10,000+
          </Typography>
        </div>
      </div>
      {isEditing ? (
        <TextField
          type="number"
          value={steps}
          onChange={(event) => onChange(event.target.value)}
          inputProps={{ inputMode: 'numeric', className: styles.input }}
          className={styles.field}
          placeholder="0"
        />
      ) : (
        <Typography variant="h4" sx={{ mt: 2, textAlign: 'center', fontWeight: 'bold' }}>
          {steps || '0'}
        </Typography>
      )}
    </GlassPanel>
  );
}

export default ActivityStepsCard;
