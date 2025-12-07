import TextField from '@mui/material/TextField';
import type { FormEvent } from 'react';
import { FaCircleCheck, FaPlus } from 'react-icons/fa6';


import styles from './MealLogger.module.scss';
import { GlassPanel } from '@/components/atoms/GlassPanel';
import { MacroInputField } from '@/components/atoms/MacroInputField';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { MealFormState } from '@/types';

interface MealLoggerProps {
  mealForm: MealFormState;
  onChange: (field: keyof MealFormState, value: string) => void;
  onSubmit: (event: FormEvent) => void;
}

export function MealLogger({ mealForm, onChange, onSubmit }: MealLoggerProps) {
  return (
    <GlassPanel className={styles.card}>
      <h2 className={styles.heading}>
        <span className={styles.iconBox}>
          <FaPlus />
        </span>
        Log Food
      </h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <TextField
          type="text"
          value={mealForm.name}
          onChange={(event) => onChange('name', event.target.value)}
          placeholder="Meal Name (e.g. Oats & Whey)"
          fullWidth
          size="small"
        />
        <div className={styles.macroGrid}>
          <MacroInputField label="CAL" value={mealForm.calories} onChange={(value) => onChange('calories', value)} accent="calories" />
          <MacroInputField label="PRO" value={mealForm.protein} onChange={(value) => onChange('protein', value)} accent="protein" />
          <MacroInputField label="FAT" value={mealForm.fat} onChange={(value) => onChange('fat', value)} accent="fat" />
          <MacroInputField label="CARB" value={mealForm.carbs} onChange={(value) => onChange('carbs', value)} accent="carbs" />
        </div>
        <PrimaryButton type="submit" className={styles.submit}>
          Add Entry <FaCircleCheck className={styles.submitIcon} />
        </PrimaryButton>
      </form>
    </GlassPanel>
  );
}

export default MealLogger;
