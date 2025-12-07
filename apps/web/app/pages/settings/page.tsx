'use client';

import { SettingsView } from '@/components/templates/SettingsView';
import { useAppStore } from '@/store/useAppStore';

export default function SettingsPage() {
  const { theme, setTheme, profile, logs, resetApp, pushToast } = useAppStore();

  const handleExport = () => {
    if (typeof window === 'undefined') return;
    const payload = JSON.stringify({ profile, logs }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MuscleApp-backup.json';
    link.click();
    URL.revokeObjectURL(url);
    pushToast('Export ready');
  };

  const handleReset = () => {
    if (typeof window === 'undefined') return;
    if (!window.confirm('Reset all app data?')) return;
    resetApp();
    pushToast('App data cleared', 'error');
  };

  return (
    <SettingsView theme={theme} onThemeChange={setTheme} onExport={handleExport} onReset={handleReset} />
  );
}
