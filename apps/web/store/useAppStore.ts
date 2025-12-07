import { create } from 'zustand';

import { calculateMealCalories, calculateProfile, calculateRemainingCalories, calculateTotals } from '../lib/calculations';
import { DATE_KEY, defaultProfileForm } from '../lib/constants';
import { createDailyLog, createMealFormState } from '../lib/forms';
import { clearAll, loadLogs, loadProfile, loadTheme, saveLogs, saveProfile, saveTheme } from '../lib/storage';
import type {
  DailyLog,
  GoalKey,
  MacroTotals,
  Meal,
  MealFormState,
  Profile,
  ProfileFormState,
  ThemeSetting,
  ToastMessage,
  ViewKey
} from '../types';

export interface AppState {
  view: ViewKey;
  profile: Profile | null;
  profileForm: ProfileFormState;
  selectedGoal: GoalKey;
  logs: Record<string, DailyLog>;
  log: DailyLog;
  mealForm: MealFormState;
  stepsInput: string;
  theme: ThemeSetting;
  toasts: ToastMessage[];
  totals: MacroTotals;
  remainingCalories: number;
}

export interface AppActions {
  hydrate: () => void;
  setView: (view: ViewKey) => void;
  setProfileField: (field: keyof ProfileFormState, value: string) => void;
  setSelectedGoal: (goal: GoalKey) => void;
  recalcProfile: () => Profile | null;
  setMealField: (field: keyof MealFormState, value: string) => void;
  addMeal: () => Meal | null;
  removeMeal: (id: string) => void;
  setStepsInput: (value: string) => void;
  toggleTraining: () => void;
  setTheme: (theme: ThemeSetting) => void;
  pushToast: (message: string, tone?: ToastMessage['tone']) => void;
  resetApp: () => void;
}

const createId = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`);

const initialLog = createDailyLog(DATE_KEY);

export const useAppStore = create<AppState & AppActions>((set, get) => ({
  view: 'dashboard',
  profile: null,
  profileForm: defaultProfileForm,
  selectedGoal: 'cut',
  logs: {},
  log: initialLog,
  mealForm: createMealFormState(),
  stepsInput: '',
  theme: 'system',
  toasts: [],
  totals: { protein: 0, fat: 0, carbs: 0, calories: 0 },
  remainingCalories: 0,

  hydrate: () => {
    const storedProfile = loadProfile();
    const storedLogs = loadLogs();
    const storedTheme = loadTheme();

    const activeLog = storedLogs[DATE_KEY] ?? createDailyLog(DATE_KEY);
    const totals = calculateTotals(activeLog);
    const remainingCalories = calculateRemainingCalories(storedProfile, totals);

    set({
      profile: storedProfile,
      profileForm: storedProfile
        ? {
            firstName: storedProfile.firstName || '',
            lastName: storedProfile.lastName || '',
            email: storedProfile.email || '',
            gender: storedProfile.gender || 'male',
            weight: storedProfile.weightKg ? String(storedProfile.weightKg) : '',
            height: storedProfile.heightCm ? String(storedProfile.heightCm) : '',
            age: storedProfile.age ? String(storedProfile.age) : '',
            activity: storedProfile.activityMultiplier ? String(storedProfile.activityMultiplier) : '1.55'
          }
        : defaultProfileForm,
      logs: storedLogs,
      log: activeLog,
      stepsInput: activeLog.steps ? String(activeLog.steps) : '',
      theme: storedTheme || 'system',
      totals,
      remainingCalories,
      view: storedProfile ? 'dashboard' : 'profile'
    });
  },

  setView: (view) => set({ view }),

  setProfileField: (field, value) => set((state) => ({ profileForm: { ...state.profileForm, [field]: value } })),

  setSelectedGoal: (goal) => set({ selectedGoal: goal }),

  recalcProfile: () => {
    const state = get();
    const calculated = calculateProfile(state.profileForm, state.selectedGoal);
    if (!calculated) return null;

    saveProfile(calculated);
    const totals = calculateTotals(state.log);
    const remainingCalories = calculateRemainingCalories(calculated, totals);
    set({ profile: calculated, remainingCalories });
    return calculated;
  },

  setMealField: (field, value) => set((state) => ({ mealForm: { ...state.mealForm, [field]: value } })),

  addMeal: () => {
    const state = get();
    const protein = Number(state.mealForm.protein) || 0;
    const fat = Number(state.mealForm.fat) || 0;
    const carbs = Number(state.mealForm.carbs) || 0;
    const manualCalories = Number(state.mealForm.calories) || 0;
    
    if (protein === 0 && fat === 0 && carbs === 0 && manualCalories === 0) return null;

    const calories = manualCalories > 0 ? manualCalories : calculateMealCalories(protein, fat, carbs);
    const meal: Meal = {
      id: createId(),
      name: state.mealForm.name.trim() || 'Quick Meal',
      p: protein,
      f: fat,
      c: carbs,
      k: calories,
      calories: calories // Ensure compatibility if interface uses 'calories' or 'k'
    };

    const nextLog: DailyLog = { ...state.log, meals: [...state.log.meals, meal] };
    const nextTotals = calculateTotals(nextLog);
    const remainingCalories = calculateRemainingCalories(state.profile, nextTotals);

    const nextLogs = { ...state.logs, [nextLog.dateKey]: nextLog };
    saveLogs(nextLogs);

    set({ log: nextLog, logs: nextLogs, mealForm: createMealFormState(), totals: nextTotals, remainingCalories });
    return meal;
  },

  removeMeal: (id) => {
    const state = get();
    const nextLog: DailyLog = { ...state.log, meals: state.log.meals.filter((meal) => meal.id !== id) };
    const nextTotals = calculateTotals(nextLog);
    const remainingCalories = calculateRemainingCalories(state.profile, nextTotals);
    const nextLogs = { ...state.logs, [nextLog.dateKey]: nextLog };
    saveLogs(nextLogs);
    set({ log: nextLog, logs: nextLogs, totals: nextTotals, remainingCalories });
  },

  setStepsInput: (value) => {
    const numeric = parseInt(value, 10);
    set((state) => {
      const nextLog: DailyLog = { ...state.log, steps: Number.isNaN(numeric) ? 0 : numeric };
      const nextLogs = { ...state.logs, [nextLog.dateKey]: nextLog };
      saveLogs(nextLogs);
      return { stepsInput: value, log: nextLog, logs: nextLogs };
    });
  },

  toggleTraining: () => {
    const state = get();
    const nextLog: DailyLog = { ...state.log, trained: !state.log.trained };
    const nextLogs = { ...state.logs, [nextLog.dateKey]: nextLog };
    saveLogs(nextLogs);
    set({ log: nextLog, logs: nextLogs });
  },

  setTheme: (theme) => {
    saveTheme(theme);
    set({ theme });
  },

  pushToast: (message, tone = 'success') => {
    const id = createId();
    set((state) => ({ toasts: [...state.toasts, { id, message, tone }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
    }, 2600);
  },

  resetApp: () => {
    clearAll();
    const freshLog = createDailyLog(DATE_KEY);
    set({
      profile: null,
      profileForm: defaultProfileForm,
      selectedGoal: 'cut',
      logs: {},
      log: freshLog,
      mealForm: createMealFormState(),
      stepsInput: '',
      totals: { protein: 0, fat: 0, carbs: 0, calories: 0 },
      remainingCalories: 0,
      view: 'profile'
    });
  }
}));
