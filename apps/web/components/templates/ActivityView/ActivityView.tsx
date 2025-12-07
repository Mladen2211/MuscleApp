import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';

import styles from './ActivityView.module.scss';
import { ActivityStepsCard } from '@/components/organisms/ActivityStepsCard';
import { TrainingCard } from '@/components/organisms/TrainingCard';

interface ActivityViewProps {
  steps: string;
  onStepsChange: (value: string) => void;
  trained: boolean;
  onToggleTraining: () => void;
}

export function ActivityView({ steps, onStepsChange, trained, onToggleTraining }: ActivityViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Grid container spacing={3} className={styles.section}>
      <Grid xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <header className={styles.header}>
              <Typography variant="h4" className={styles.title} component="h1">
                Activity
              </Typography>
              <Typography variant="body2" className={styles.subtitle}>
                Track your daily output.
              </Typography>
            </header>
          </Box>
          <Box>
            {!isEditing ? (
              <Button 
                variant="outlined" 
                startIcon={<EditIcon />} 
                onClick={() => setIsEditing(true)}
                sx={{ borderRadius: '12px' }}
              >
                Log Activity
              </Button>
            ) : (
              <Button 
                variant="outlined" 
                color="inherit"
                startIcon={<CancelIcon />} 
                onClick={() => setIsEditing(false)}
                sx={{ borderRadius: '12px' }}
              >
                Done
              </Button>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid xs={12} md={6}>
        <ActivityStepsCard steps={steps} onChange={onStepsChange} isEditing={isEditing} />
      </Grid>
      <Grid xs={12} md={6}>
        <TrainingCard trained={trained} onToggle={onToggleTraining} isEditing={isEditing} />
      </Grid>
    </Grid>
  );
}

export default ActivityView;
