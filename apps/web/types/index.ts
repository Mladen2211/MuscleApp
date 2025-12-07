import type { IconType } from 'react-icons';

export type ThemeSetting = 'light' | 'dark' | 'system';
export type ViewKey = 'dashboard' | 'activity' | 'profile' | 'settings';
export type GoalKey = 'heavy_cut' | 'cut' | 'main' | 'bulk' | 'heavy_bulk';

export interface Profile {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender: 'male' | 'female' | 'other';
  weightKg: number;
  heightCm: number;
  age: number;
  activityMultiplier: number;
  goalKey: GoalKey;
  goalType: 'deficit' | 'surplus' | 'main';
  tdee: number;
  dailyCalories: number;
  macros: {
    protein: number;
    fat: number;
    carbs: number;
  };
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  p: number;
  f: number;
  c: number;
  k: number;
}

export interface DailyLog {
  dateKey: string;
  steps: number;
  trained: boolean;
  meals: Meal[];
}

export interface ProfileFormState {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  weight: string;
  height: string;
  age: string;
  activity: string;
}

export interface MealFormState {
  name: string;
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
}

export type ToastTone = 'success' | 'error';

export interface ToastMessage {
  id: string;
  message: string;
  tone: ToastTone;
}

export interface GoalDefinition {
  factor: number;
  type: 'deficit' | 'surplus' | 'main';
  name: string;
  description: string;
  accent: string;
  Icon: IconType;
}

export interface ThemeOption {
  key: ThemeSetting;
  label: string;
  preview: string;
  previewKey?: 'light' | 'dark' | 'system' | 'default';
}

export interface NavItem {
  key: ViewKey;
  label: string;
  icon: IconType;
}

export interface MacroTotals {
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

export type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface DeficitStatus {
  label: string;
  tone: StatusTone;
}
