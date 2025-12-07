import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState, type FormEvent } from 'react';

import styles from './ProfileView.module.scss';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { BodyMetricsCard } from '@/components/organisms/BodyMetricsCard';
import { GoalSelectorList } from '@/components/organisms/GoalSelectorList';
import { ProfileIdentityCard } from '@/components/organisms/ProfileIdentityCard';
import { ProfileFormState, GoalKey } from '@/types';

interface ProfileViewProps {
  form: ProfileFormState;
  onChange: (field: keyof ProfileFormState, value: string) => void;
  selectedGoal: GoalKey;
  onGoalChange: (goal: GoalKey) => void;
  onSubmit: (event: FormEvent) => void;
}

export function ProfileView({ form, onChange, selectedGoal, onGoalChange, onSubmit }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: FormEvent) => {
    onSubmit(e);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Ideally we should reset the form here, but for now we just exit edit mode
  };

  return (
    <Grid container spacing={3} className={styles.section}>
      <Grid xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h4" className={styles.title} component="h1">
              Profile
            </Typography>
            <Typography variant="body2" className={styles.subtitle}>
              Manage your identity &amp; goals.
            </Typography>
          </Box>
          <Box>
            {!isEditing ? (
              <Button 
                variant="outlined" 
                startIcon={<EditIcon />} 
                onClick={() => setIsEditing(true)}
                sx={{ borderRadius: '12px' }}
              >
                Edit Profile
              </Button>
            ) : (
              <Button 
                variant="outlined" 
                color="error"
                startIcon={<CancelIcon />} 
                onClick={handleCancel}
                sx={{ borderRadius: '12px' }}
              >
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </Grid>

      <Grid xs={12} md={4}>
        <ProfileIdentityCard form={form} onChange={onChange} isEditing={isEditing} />
      </Grid>
      
      <Grid xs={12} md={8}>
        <BodyMetricsCard form={form} onChange={onChange} isEditing={isEditing} />
      </Grid>

      <Grid xs={12}>
        <GoalSelectorList selectedGoal={selectedGoal} onSelect={onGoalChange} isEditing={isEditing} />
      </Grid>

      {isEditing && (
        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <PrimaryButton onClick={handleSave} startIcon={<SaveIcon />}>
            Calculate &amp; Save Changes
          </PrimaryButton>
        </Grid>
      )}
    </Grid>
  );
}

export default ProfileView;
