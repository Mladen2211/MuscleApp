'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WarningIcon from '@mui/icons-material/Warning';

import { GlassPanel } from '@/components/atoms/GlassPanel';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';

const CLIENTS = [
  { id: 1, name: 'Alice Johnson', plan: 'Hypertrophy', status: 'Active', compliance: 92, lastActive: '2h ago' },
  { id: 2, name: 'Bob Smith', plan: 'Fat Loss', status: 'Pending', compliance: 0, lastActive: 'Never' },
  { id: 3, name: 'Charlie Brown', plan: 'Strength', status: 'Active', compliance: 78, lastActive: '1d ago' },
  { id: 4, name: 'Diana Prince', plan: 'Endurance', status: 'Active', compliance: 95, lastActive: '5h ago' },
];

export default function CoachPage() {
  return (
    <div className="max-w-6xl w-full mx-auto space-y-6">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <header className="space-y-1">
          <Typography variant="h4" className="font-extrabold" component="h1">
            Coach Workspace
          </Typography>
          <Typography variant="body2" className="text-slate-500 dark:text-slate-400">
            Manage your athletes and training programs.
          </Typography>
        </header>
        <PrimaryButton>Invite Client</PrimaryButton>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <GlassPanel className="p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <SectionLabel>Active Clients</SectionLabel>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Athlete</th>
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Compliance</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {CLIENTS.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>{client.name[0]}</Avatar>
                          <Typography variant="body2" fontWeight={500} className="text-slate-900 dark:text-slate-100">
                            {client.name}
                          </Typography>
                        </Stack>
                      </td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{client.plan}</td>
                      <td className="px-4 py-3">
                        <Chip 
                          label={client.status} 
                          size="small" 
                          color={client.status === 'Active' ? 'success' : 'default'} 
                          variant="outlined"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${client.compliance > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                              style={{ width: `${client.compliance}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{client.compliance}%</span>
                        </Stack>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <GlassPanel className="p-4">
              <SectionLabel className="mb-3">Pending Approvals</SectionLabel>
              <Stack spacing={2}>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
                  <WarningIcon color="warning" fontSize="small" className="mt-0.5" />
                  <div>
                    <Typography variant="subtitle2" fontWeight={600}>New Program Request</Typography>
                    <Typography variant="caption" className="text-slate-600 dark:text-slate-400 block mt-1">
                      Bob Smith requested a switch to &quot;Strength 5x5&quot;.
                    </Typography>
                    <div className="mt-2 flex gap-2">
                      <button className="text-xs font-medium text-emerald-600 hover:underline">Approve</button>
                      <button className="text-xs font-medium text-slate-500 hover:underline">Review</button>
                    </div>
                  </div>
                </div>
              </Stack>
            </GlassPanel>

            <GlassPanel className="p-4">
              <SectionLabel className="mb-3">Quick Stats</SectionLabel>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center">
                  <Typography variant="h4" fontWeight={700} color="primary">12</Typography>
                  <Typography variant="caption" className="text-slate-500">Active Athletes</Typography>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center">
                  <Typography variant="h4" fontWeight={700} color="success.main">94%</Typography>
                  <Typography variant="caption" className="text-slate-500">Avg Compliance</Typography>
                </div>
              </div>
            </GlassPanel>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
