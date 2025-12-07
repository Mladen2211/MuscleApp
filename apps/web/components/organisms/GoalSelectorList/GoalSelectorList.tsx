import Stack from '@mui/material/Stack';

import styles from './GoalSelectorList.module.scss';
import { GlassPanel } from '@/components/atoms/GlassPanel';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import { GoalOptionCard } from '@/components/molecules/GoalOptionCard';
import { GOALS } from '@/lib/constants';
import { GoalKey } from '@/types';

interface GoalSelectorListProps {
  selectedGoal: GoalKey;
  onSelect: (goal: GoalKey) => void;
  isEditing?: boolean;
}

export function GoalSelectorList({ selectedGoal, onSelect, isEditing = false }: GoalSelectorListProps) {
  return (
    <GlassPanel className={styles.card}>
      <SectionLabel className={styles.label}>Nutrition Strategy</SectionLabel>
      <Stack spacing={1.5}>
        {isEditing ? (
          Object.entries(GOALS).map(([key, goal]) => (
            <GoalOptionCard key={key} goal={goal} selected={selectedGoal === key} onSelect={() => onSelect(key as GoalKey)} />
          ))
        ) : (
          <GoalOptionCard goal={GOALS[selectedGoal]} selected={true} onSelect={() => {}} />
        )}
      </Stack>
    </GlassPanel>
  );
}

export default GoalSelectorList;
