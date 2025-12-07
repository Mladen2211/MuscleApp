'use client';

import type { FormEvent } from 'react';
import { useMemo } from 'react';

import { DashboardView } from '@/components/templates/DashboardView';
import { getDeficitStatus } from '@/lib/calculations';
import { useAppStore } from '@/store/useAppStore';

export default function DashboardPage() {
  const {
    profile,
    remainingCalories,
    totals,
    log,
    mealForm,
    setMealField,
    addMeal,
    removeMeal,
    pushToast
  } = useAppStore();

  const deficitStatus = useMemo(() => getDeficitStatus(profile, remainingCalories), [profile, remainingCalories]);

  const handleMealSubmit = (event: FormEvent) => {
    event.preventDefault();
    const meal = addMeal();
    if (!meal) {
      pushToast('Enter at least one macro', 'error');
      return;
    }
    pushToast(`Added ${meal.name}`);
  };

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      <DashboardView
        profile={profile}
        deficitStatus={deficitStatus}
        remainingCalories={remainingCalories}
        totals={totals}
        log={log}
        mealForm={mealForm}
        onMealChange={setMealField}
        onMealSubmit={handleMealSubmit}
        onRemoveMeal={removeMeal}
      />
    </div>
  );
}
