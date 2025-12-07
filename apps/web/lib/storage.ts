import { STORAGE_KEYS } from './constants';
import type { DailyLog, Profile, ThemeSetting } from '../types';

const hasWindow = typeof window !== 'undefined';

const safeLocalStorage = () => {
  if (!hasWindow) return null;
  try {
    return window.localStorage;
  } catch (error) {
    console.warn('LocalStorage unavailable', error);
    return null;
  }
};

export const saveProfile = (profile: Profile) => {
  const storage = safeLocalStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
};

export const loadProfile = (): Profile | null => {
  const storage = safeLocalStorage();
  if (!storage) return null;
  const raw = storage.getItem(STORAGE_KEYS.profile);
  if (!raw) return null;
  return JSON.parse(raw) as Profile;
};

export const saveLogs = (logs: Record<string, DailyLog>) => {
  const storage = safeLocalStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.logs, JSON.stringify(logs));
};

export const loadLogs = (): Record<string, DailyLog> => {
  const storage = safeLocalStorage();
  if (!storage) return {};
  const raw = storage.getItem(STORAGE_KEYS.logs);
  if (!raw) return {};
  return JSON.parse(raw) as Record<string, DailyLog>;
};

export const saveTheme = (theme: ThemeSetting) => {
  const storage = safeLocalStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.theme, theme);
};

export const loadTheme = (): ThemeSetting | null => {
  const storage = safeLocalStorage();
  if (!storage) return null;
  const raw = storage.getItem(STORAGE_KEYS.theme) as ThemeSetting | null;
  return raw;
};

export const clearAll = () => {
  const storage = safeLocalStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEYS.profile);
  storage.removeItem(STORAGE_KEYS.logs);
};
