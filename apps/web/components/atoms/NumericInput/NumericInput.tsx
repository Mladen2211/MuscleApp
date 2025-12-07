import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';

import styles from './NumericInput.module.scss';
import { SectionLabel } from '../SectionLabel';

interface NumericInputProps extends Omit<TextFieldProps, 'variant' | 'type' | 'onChange'> {
  label: string;
  onChange: (value: string) => void;
}

export function NumericInput({ label, onChange, className, ...props }: NumericInputProps) {
  return (
    <label className={styles.wrapper}>
      <SectionLabel className={styles.label}>{label}</SectionLabel>
      <TextField
        type="number"
        variant="outlined"
        fullWidth
        onChange={(event) => onChange(event.target.value)}
        className={className}
        inputProps={{ className: styles.input }}
        {...props}
      />
    </label>
  );
}

export default NumericInput;

