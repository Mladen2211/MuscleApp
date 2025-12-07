import Chip from '@mui/material/Chip';
import type { HTMLAttributes } from 'react';

import styles from './StatusBadge.module.scss';
import { cn } from '@/lib/utils';
import { StatusTone } from '@/types';

interface StatusBadgeProps extends HTMLAttributes<HTMLDivElement> {
  tone: StatusTone;
  label: string;
}

export function StatusBadge({ tone, label, className, ...props }: StatusBadgeProps) {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <span className={cn(styles.dot, styles[tone])} />
      <Chip label={label} className={cn(styles.badge, styles[tone])} size="small" />
    </div>
  );
}

export default StatusBadge;
