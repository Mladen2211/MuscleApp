import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.scss';

import { AppThemeProvider } from './providers';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'MuscleApp | Smart Tracker',
  description: 'Plan meals, log training, and tune goals inside the MuscleApp frontend shell.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
