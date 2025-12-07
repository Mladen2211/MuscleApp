'use client';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { GlassPanel } from '@/components/atoms/GlassPanel';
import { SectionLabel } from '@/components/atoms/SectionLabel';

const USERS = [
  { id: 1, email: 'alice@example.com', role: 'Athlete', status: 'Active', joined: '2023-10-01' },
  { id: 2, email: 'coach.bob@example.com', role: 'Coach', status: 'Active', joined: '2023-09-15' },
  { id: 3, email: 'admin@muscleup.com', role: 'Admin', status: 'Active', joined: '2023-01-01' },
  { id: 4, email: 'spammer@bad.com', role: 'Athlete', status: 'Banned', joined: '2023-12-05' },
];

export default function AdminPage() {
  return (
    <div className="max-w-6xl w-full mx-auto space-y-6">
      <header className="space-y-1">
        <Typography variant="h4" className="font-extrabold" component="h1">
          Admin Console
        </Typography>
        <Typography variant="body2" className="text-slate-500 dark:text-slate-400">
          System overview and user management.
        </Typography>
      </header>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <GlassPanel className="p-4 text-center">
            <Typography variant="h3" fontWeight={800} color="primary">1,240</Typography>
            <Typography variant="caption" className="text-slate-500">Total Users</Typography>
          </GlassPanel>
        </Grid>
        <Grid item xs={12} md={3}>
          <GlassPanel className="p-4 text-center">
            <Typography variant="h3" fontWeight={800} color="secondary">45</Typography>
            <Typography variant="caption" className="text-slate-500">Active Coaches</Typography>
          </GlassPanel>
        </Grid>
        <Grid item xs={12} md={3}>
          <GlassPanel className="p-4 text-center">
            <Typography variant="h3" fontWeight={800} className="text-emerald-500">850</Typography>
            <Typography variant="caption" className="text-slate-500">Daily Active</Typography>
          </GlassPanel>
        </Grid>
        <Grid item xs={12} md={3}>
          <GlassPanel className="p-4 text-center">
            <Typography variant="h3" fontWeight={800} className="text-rose-500">12</Typography>
            <Typography variant="caption" className="text-slate-500">Banned Users</Typography>
          </GlassPanel>
        </Grid>

        <Grid item xs={12}>
          <GlassPanel className="p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <SectionLabel>User Directory</SectionLabel>
              <input 
                type="text" 
                placeholder="Search users..." 
                className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Joined</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {USERS.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{user.email}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{user.role}</td>
                      <td className="px-4 py-3">
                        <Chip 
                          label={user.status} 
                          size="small" 
                          color={user.status === 'Active' ? 'success' : 'error'} 
                          variant="outlined"
                        />
                      </td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{user.joined}</td>
                      <td className="px-4 py-3 text-right">
                        <IconButton size="small" title="Impersonate">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" title="Ban User" color="error">
                          <PersonOffIcon fontSize="small" />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
        </Grid>
      </Grid>
    </div>
  );
}
