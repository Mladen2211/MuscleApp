import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { FaGlobe } from 'react-icons/fa6';

import styles from './LocalizationCard.module.scss';
import { GlassPanel } from '@/components/atoms/GlassPanel';
import { SectionLabel } from '@/components/atoms/SectionLabel';

interface LocalizationCardProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

export function LocalizationCard({ language, onLanguageChange }: LocalizationCardProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onLanguageChange(event.target.value);
  };

  return (
    <Stack component="section" spacing={1.5} className={styles.section}>
      <SectionLabel className={styles.label}>Localization</SectionLabel>
      <GlassPanel className={styles.panel}>
        <div className={styles.row}>
          <div className={styles.iconBox}>
            <FaGlobe />
          </div>
          <FormControl fullWidth size="small">
            <InputLabel id="language-select">Language</InputLabel>
            <Select
              labelId="language-select"
              value={language}
              label="Language"
              onChange={handleChange}
            >
              <MenuItem value="en">English (US)</MenuItem>
              <MenuItem value="es" disabled>Spanish (Coming Soon)</MenuItem>
              <MenuItem value="fr" disabled>French (Coming Soon)</MenuItem>
              <MenuItem value="de" disabled>German (Coming Soon)</MenuItem>
            </Select>
          </FormControl>
        </div>
      </GlassPanel>
    </Stack>
  );
}

export default LocalizationCard;
