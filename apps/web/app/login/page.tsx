'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { FaDumbbell } from 'react-icons/fa6';

import { GlassPanel } from '@/components/atoms/GlassPanel';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    if (email && password) {
      router.push('/pages/dashboard');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        '.dark &': {
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        },
      }}
    >
      <Container maxWidth="sm">
        <GlassPanel className="p-8">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem',
                mb: 2,
              }}
            >
              <FaDumbbell />
            </Box>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to continue your fitness journey
            </Typography>
          </Box>

          <form onSubmit={handleLogin} className="space-y-4">
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: '12px',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1.1rem',
              }}
            >
              Sign In
            </Button>
          </form>
        </GlassPanel>
      </Container>
    </Box>
  );
}
