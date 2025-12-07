import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';

import styles from './PrimaryButton.module.scss';
import { cn } from '@/lib/utils';

export function PrimaryButton({ className, color = 'primary', ...props }: ButtonProps) {
  return (
    <Button
      className={cn(styles.button, className)}
      variant="contained"
      fullWidth
      disableElevation
      color={color}
      {...props}
    />
  );
}

export default PrimaryButton;

