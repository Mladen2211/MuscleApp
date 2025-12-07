import Stack from '@mui/material/Stack';
import { FaDownload, FaTrashCan } from 'react-icons/fa6';

import styles from './DataStorageCard.module.scss';
import { GlassPanel } from '@/components/atoms/GlassPanel';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import { SettingActionRow } from '@/components/molecules/SettingActionRow';

interface DataStorageCardProps {
  onExport: () => void;
  onReset: () => void;
}

export function DataStorageCard({ onExport, onReset }: DataStorageCardProps) {
  return (
    <Stack component="section" spacing={1.5} className={styles.section}>
      <SectionLabel className={styles.label}>Data &amp; Storage</SectionLabel>
      <GlassPanel className={styles.panel}>
        <SettingActionRow label="Export All Data (JSON)" icon={<FaDownload />} bordered onClick={onExport} />
        <SettingActionRow label="Reset App Data" icon={<FaTrashCan />} tone="danger" onClick={onReset} />
      </GlassPanel>
    </Stack>
  );
}

export default DataStorageCard;
