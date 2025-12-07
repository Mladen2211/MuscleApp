'use client';

import { ActivityView } from '@/components/templates/ActivityView';
import { useAppStore } from '@/store/useAppStore';

export default function ActivityPage() {
  const { stepsInput, setStepsInput, log, toggleTraining } = useAppStore();

  return (
    <ActivityView steps={stepsInput} onStepsChange={setStepsInput} trained={log.trained} onToggleTraining={toggleTraining} />
  );
}
