import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';
import type { ReactNode } from 'react';

import styles from './SettingActionRow.module.scss';

interface SettingActionRowProps extends Omit<ButtonProps, 'startIcon' | 'endIcon' | 'color'> {
  label: string;
  icon: ReactNode;
  tone?: 'default' | 'danger';
  bordered?: boolean;
}

export function SettingActionRow({ label, icon, tone = 'default', bordered, className, ...props }: SettingActionRowProps) {
  return (
    <Button
      type="button"
      className={`${styles.row} ${tone === 'danger' ? styles.danger : ''} ${bordered ? styles.bordered : ''} ${className ?? ''}`}
      variant="text"
      fullWidth
      color={tone === 'danger' ? 'error' : 'primary'}
      {...props}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.icon}>{icon}</span>
    </Button>
  );
}

export default SettingActionRow;
