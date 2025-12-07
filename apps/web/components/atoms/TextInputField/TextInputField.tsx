import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import type { ReactNode } from 'react';

import styles from './TextInputField.module.scss';
import { SectionLabel } from '../SectionLabel';

interface TextInputFieldProps extends Omit<TextFieldProps, 'variant' | 'onChange'> {
  label: string;
  icon?: ReactNode;
  onChange: (value: string) => void;
}

export function TextInputField({ label, icon, onChange, className, type = 'text', ...props }: TextInputFieldProps) {
  return (
    <label className={styles.wrapper}>
      <SectionLabel className={styles.label}>{label}</SectionLabel>
      <TextField
        type={type}
        onChange={(event) => onChange(event.target.value)}
        variant="outlined"
        fullWidth
        className={`${styles.field} ${className ?? ''}`}
        InputProps={{ startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : undefined }}
        inputProps={{ className: styles.input }}
        {...props}
      />
    </label>
  );
}

export default TextInputField;

