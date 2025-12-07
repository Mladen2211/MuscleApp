import Box from '@mui/material/Box';
import type { HTMLAttributes } from 'react';

import styles from './GlassPanel.module.scss';
import { cn } from '@/lib/utils';

export function GlassPanel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <Box className={cn(styles.root, className)} {...props} />;
}

export default GlassPanel;
