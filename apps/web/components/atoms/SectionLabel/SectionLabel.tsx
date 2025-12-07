import Typography from '@mui/material/Typography';
import type { HTMLAttributes } from 'react';

import styles from './SectionLabel.module.scss';
import { cn } from '@/lib/utils';

export function SectionLabel({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <Typography component="p" className={cn(styles.label, className)} {...props} />;
}

export default SectionLabel;
