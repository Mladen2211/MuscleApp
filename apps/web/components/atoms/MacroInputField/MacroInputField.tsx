import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';

import styles from './MacroInputField.module.scss';

interface MacroInputFieldProps extends Omit<TextFieldProps, 'type' | 'variant' | 'onChange'> {
  label: string;
  accent?: 'protein' | 'fat' | 'carbs' | 'calories';
  onChange: (value: string) => void;
}

export function MacroInputField({ label, accent = 'protein', onChange, className, ...props }: MacroInputFieldProps) {
  return (
    <div className={styles.wrapper}>
      <TextField
        type="number"
        variant="outlined"
        fullWidth
        onChange={(event) => onChange(event.target.value)}
        className={`${styles.field} ${styles[accent]} ${className ?? ''}`}
        inputProps={{ className: styles.input }}
        {...props}
      />
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default MacroInputField;

