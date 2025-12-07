'use client';

import type { FormEvent } from 'react';

import { ProfileView } from '@/components/templates/ProfileView';
import { useAppStore } from '@/store/useAppStore';

export default function ProfilePage() {
  const { profileForm, setProfileField, selectedGoal, setSelectedGoal, recalcProfile, pushToast } = useAppStore();

  const handleProfileSubmit = (event: FormEvent) => {
    event.preventDefault();
    const calculated = recalcProfile();
    if (!calculated) {
      pushToast('Please fill out weight, height, and age.', 'error');
      return;
    }
    pushToast('Profile recalculated!');
  };

  return (
    <ProfileView
      form={profileForm}
      onChange={setProfileField}
      selectedGoal={selectedGoal}
      onGoalChange={setSelectedGoal}
      onSubmit={handleProfileSubmit}
    />
  );
}
