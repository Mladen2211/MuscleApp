import { FaArrowTrendUp, FaDumbbell, FaFire, FaGear, FaHeartPulse, FaScaleBalanced, FaScissors, FaUser, FaUtensils } from 'react-icons/fa6';

import type {
  DailyLog,
  GoalDefinition,
  GoalKey,
  NavItem,
  ProfileFormState,
  ThemeOption,
  ThemeSetting
} from '../types';

export const STORAGE_KEYS = {
  profile: 'MuscleApp_profile',
  logs: 'MuscleApp_logs',
  theme: 'MuscleApp_theme'
};

export const DATE_KEY = new Date().toISOString().split('T')[0];

export const defaultProfileForm: ProfileFormState = {
  firstName: '',
  lastName: '',
  email: '',
  gender: 'male',
  weight: '',
  height: '',
  age: '',
  activity: '1.55'
};

export const defaultLog = (dateKey: string): DailyLog => ({ dateKey, steps: 0, trained: false, meals: [] });

export const GOALS: Record<GoalKey, GoalDefinition> = {
  heavy_cut: {
    factor: 0.25,
    type: 'deficit',
    name: 'Heavy Cut',
    description: 'Aggressive loss (-25% TDEE)',
    accent: 'rose',
    Icon: FaFire
  },
  cut: {
    factor: 0.15,
    type: 'deficit',
    name: 'Cut',
    description: 'Sustainable loss (-15% TDEE)',
    accent: 'orange',
    Icon: FaScissors
  },
  main: {
    factor: 0,
    type: 'main',
    name: 'Maintenance',
    description: 'Recomp / Maintain weight',
    accent: 'blue',
    Icon: FaScaleBalanced
  },
  bulk: {
    factor: 0.1,
    type: 'surplus',
    name: 'Lean Bulk',
    description: 'Minimize fat gain (+10% TDEE)',
    accent: 'emerald',
    Icon: FaArrowTrendUp
  },
  heavy_bulk: {
    factor: 0.2,
    type: 'surplus',
    name: 'Heavy Bulk',
    description: 'Max muscle (+20% TDEE)',
    accent: 'purple',
    Icon: FaDumbbell
  }
};

export const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Fuel', icon: FaUtensils },
  { key: 'activity', label: 'Train', icon: FaHeartPulse },
  { key: 'profile', label: 'Profile', icon: FaUser },
  { key: 'settings', label: 'Settings', icon: FaGear }
];

export const THEME_OPTIONS: ThemeOption[] = [
  { key: 'light', label: 'Light', preview: 'bg-slate-200', previewKey: 'light' },
  { key: 'dark', label: 'Dark', preview: 'bg-slate-800', previewKey: 'dark' },
  { key: 'system', label: 'System', preview: 'bg-slate-400', previewKey: 'default' }
];

export const THEME_VALUES: ThemeSetting[] = ['light', 'dark', 'system'];
