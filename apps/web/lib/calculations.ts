import { GOALS } from './constants';
import type {
  DailyLog,
  DeficitStatus,
  GoalKey,
  MacroTotals,
  Meal,
  Profile,
  ProfileFormState
} from '../types';

export const numberOrNull = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const calculateMealCalories = (protein: number, fat: number, carbs: number) => {
  return Math.round(protein * 4 + fat * 9 + carbs * 4);
};

export const calculateProfile = (form: ProfileFormState, goalKey: GoalKey): Profile | null => {
  const weight = numberOrNull(form.weight);
  const height = numberOrNull(form.height);
  const age = numberOrNull(form.age);
  const activity = Number(form.activity || '1.55');

  if (weight === null || height === null || age === null) {
    return null;
  }

  // Mifflin-St Jeor equation for BMR (standard and evidence-based)
  const bmrGenderAdjustment = form.gender === 'female' ? -161 : 5;
  const bmr = 10 * weight + 6.25 * height - 5 * age + bmrGenderAdjustment;
  const tdee = Math.round(bmr * activity);

  const rule = GOALS[goalKey];

  // Safe caps based on research: max 25% deficit, max 20% surplus of TDEE
  // Sources: NIH, ISSN, Precision Nutrition guidelines (500-750 kcal deficit ~10-25% for most; 250-500 surplus ~5-20%)
  const maxDeficitFactor = 0.25; // Caps at ~500-750 kcal deficit for typical TDEE
  const maxSurplusFactor = 0.20; // Caps at ~300-500 kcal surplus
  const cappedFactor = Math.min(rule.factor, rule.type === 'deficit' ? maxDeficitFactor : maxSurplusFactor);
  const adjustment = Math.round(tdee * cappedFactor);

  let dailyCalories =
    rule.type === 'deficit' ? tdee - adjustment :
    rule.type === 'surplus' ? tdee + adjustment : tdee;

  // Enforce minimum safe calorie floors to prevent unsafe restriction
  // Based on Harvard Health, Mayo Clinic: >=1200 kcal women, >=1500 kcal men (unsupervised)
  const minCalories = form.gender === 'female' ? 1200 : 1500;
  dailyCalories = Math.max(dailyCalories, minCalories);

  // Protein: 2.2 g/kg is high-end for muscle preservation/gain (ISSN: 1.6-2.2 g/kg)
  const protein = Math.round(2.2 * weight);

  // Fat: 25% of calories ensures essential fats (DGAs: 20-35% total fat)
  const fat = Math.round((dailyCalories * 0.25) / 9);

  // Carbs: Remainder, floored at 0
  const carbs = Math.max(0, Math.round((dailyCalories - protein * 4 - fat * 9) / 4));

  return {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    gender: (form.gender as 'male' | 'female' | 'other') || 'male',
    weightKg: weight,
    heightCm: height,
    age,
    activityMultiplier: activity,
    goalKey,
    goalType: rule.type,
    tdee,
    dailyCalories,
    macros: { protein, fat, carbs }
  };
};

export const calculateTotals = (log: DailyLog): MacroTotals => {
  return log.meals.reduce(
    (acc, meal) => {
      acc.protein += meal.p;
      acc.fat += meal.f;
      acc.carbs += meal.c;
      acc.calories += meal.k;
      return acc;
    },
    { protein: 0, fat: 0, carbs: 0, calories: 0 }
  );
};

export const calculateRemainingCalories = (profile: Profile | null, totals: MacroTotals) => {
  if (!profile) return 0;
  return profile.dailyCalories - totals.calories;
};

export const getDeficitStatus = (profile: Profile | null, remainingCalories: number): DeficitStatus => {
  if (!profile) return { label: 'Set Profile', tone: 'neutral' };
  if (profile.goalType === 'deficit') {
    const positive = remainingCalories >= 0;
    return { label: positive ? 'Deficit Active' : 'Surplus Warning', tone: positive ? 'success' : 'warning' };
  }
  if (profile.goalType === 'surplus') {
    return { label: 'Bulking Phase', tone: 'info' };
  }
  return { label: 'Maintenance', tone: 'neutral' };
};

export const buildMeal = (mealForm: Meal, calories: number): Meal => ({
  ...mealForm,
  k: calories
});