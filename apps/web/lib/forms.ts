import { defaultProfileForm } from './constants';
import type { DailyLog, MealFormState, ProfileFormState } from '../types';

export const createMealFormState = (): MealFormState => ({
  name: '',
  calories: '',
  protein: '',
  fat: '',
  carbs: ''
});

export const createDailyLog = (dateKey: string): DailyLog => ({
  dateKey,
  steps: 0,
  trained: false,
  meals: []
});

export const cloneProfileForm = (form?: Partial<ProfileFormState>): ProfileFormState => ({
  ...defaultProfileForm,
  ...form
});
