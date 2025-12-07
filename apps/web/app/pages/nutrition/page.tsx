'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import AddIcon from '@mui/icons-material/Add';

import { GlassPanel } from '@/components/atoms/GlassPanel';
import { SectionLabel } from '@/components/atoms/SectionLabel';

const TEMPLATES = [
  { id: 1, name: 'High Protein / Low Carb', calories: 2400, p: 200, c: 150, f: 80 },
  { id: 2, name: 'Maintenance Balanced', calories: 2800, p: 180, c: 300, f: 90 },
  { id: 3, name: 'Keto Strict', calories: 2200, p: 160, c: 30, f: 160 },
];

export default function NutritionPage() {
  return (
    <div className="max-w-6xl w-full mx-auto space-y-6">
      <header className="space-y-1">
        <Typography variant="h4" className="font-extrabold" component="h1">
          Nutrition Manager
        </Typography>
        <Typography variant="body2" className="text-slate-500 dark:text-slate-400">
          Manage meal templates and client macro targets.
        </Typography>
      </header>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <GlassPanel className="p-4">
            <div className="flex justify-between items-center mb-4">
              <SectionLabel>Meal Plan Templates</SectionLabel>
              <button className="text-sm font-medium text-primary-500 hover:underline flex items-center gap-1">
                <AddIcon fontSize="small" /> New Template
              </button>
            </div>
            <div className="grid gap-3">
              {TEMPLATES.map((template) => (
                <div key={template.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors cursor-pointer group bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <Typography variant="subtitle2" fontWeight={600} className="text-slate-900 dark:text-slate-100 group-hover:text-primary-500 transition-colors">
                        {template.name}
                      </Typography>
                      <Typography variant="caption" className="text-slate-500 dark:text-slate-400">
                        {template.calories} kcal • {template.p}g P • {template.c}g C • {template.f}g F
                      </Typography>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" title="Protein" />
                      <div className="w-2 h-2 rounded-full bg-amber-400" title="Carbs" />
                      <div className="w-2 h-2 rounded-full bg-rose-400" title="Fats" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </Grid>

        <Grid item xs={12} md={4}>
          <GlassPanel className="p-4 h-full">
            <SectionLabel className="mb-3">Quick Actions</SectionLabel>
            <Stack spacing={2}>
              <CardActionArea className="p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <Typography variant="subtitle2" color="primary">Assign Plan to Client</Typography>
              </CardActionArea>
              <CardActionArea className="p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <Typography variant="subtitle2" color="primary">Create Recipe</Typography>
              </CardActionArea>
            </Stack>
          </GlassPanel>
        </Grid>
      </Grid>
    </div>
  );
}
