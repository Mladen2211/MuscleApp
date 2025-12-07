import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Unstable_Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import styles from './BodyMetricsCard.module.scss';
import { GlassPanel } from '@/components/atoms/GlassPanel';
import { NumericInput } from '@/components/atoms/NumericInput';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import { ProfileFormState } from '@/types';

interface BodyMetricsCardProps {
  form: ProfileFormState;
  onChange: (field: keyof ProfileFormState, value: string) => void;
  isEditing?: boolean;
}

const activityLevels = [
  { value: '1.2', label: 'Sedentary' },
  { value: '1.375', label: 'Light Activity' },
  { value: '1.55', label: 'Moderate Activity' },
  { value: '1.725', label: 'Very Active (Heavy Training)' },
  { value: '1.9', label: 'Athlete' }
];

export function BodyMetricsCard({ form, onChange, isEditing = false }: BodyMetricsCardProps) {
  const currentActivityLabel = activityLevels.find(l => l.value === form.activity)?.label || 'Unknown';

  return (
    <GlassPanel className={styles.card}>
      <SectionLabel className={styles.label}>Body Metrics</SectionLabel>
      {isEditing ? (
        <>
          <Grid container spacing={2.5} className={styles.grid}>
            <Grid xs={12} sm={4}>
              <NumericInput label="Weight" value={form.weight} onChange={(value) => onChange('weight', value)} />
            </Grid>
            <Grid xs={12} sm={4}>
              <NumericInput label="Height" value={form.height} onChange={(value) => onChange('height', value)} />
            </Grid>
            <Grid xs={12} sm={4}>
              <NumericInput label="Age" value={form.age} onChange={(value) => onChange('age', value)} />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="gender-select">Gender</InputLabel>
              <Select
                labelId="gender-select"
                value={form.gender}
                label="Gender"
                onChange={(event) => onChange('gender', event.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel id="activity-level">Activity</InputLabel>
              <Select
                labelId="activity-level"
                value={form.activity}
                label="Activity"
                onChange={(event) => onChange('activity', event.target.value)}
              >
                {activityLevels.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box>
          <Grid container spacing={2}>
            <Grid xs={4}>
              <Typography variant="caption" color="text.secondary">Weight</Typography>
              <Typography variant="h6">{form.weight} kg</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography variant="caption" color="text.secondary">Height</Typography>
              <Typography variant="h6">{form.height} cm</Typography>
            </Grid>
            <Grid xs={4}>
              <Typography variant="caption" color="text.secondary">Age</Typography>
              <Typography variant="h6">{form.age} yrs</Typography>
            </Grid>
            <Grid xs={6}>
              <Typography variant="caption" color="text.secondary">Gender</Typography>
              <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>{form.gender || 'Not set'}</Typography>
            </Grid>
            <Grid xs={6}>
              <Typography variant="caption" color="text.secondary">Activity Level</Typography>
              <Typography variant="body1">{currentActivityLabel}</Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </GlassPanel>
  );
}

export default BodyMetricsCard;
