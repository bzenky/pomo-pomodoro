import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleTagManager } from '@next/third-parties/google'
import './globals.css'
import { ThemeProvider } from '../components/theme/theme-provider';

const nunito = Nunito({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Pomo-Pomodoro',
  description: 'Pomo-Pomodoro is a great partner for everyone achieve your goals. It´s simple, accessible and flexible. Give a boost in your focus and results using the Pomodoro technique.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body className="antialiased scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey='@pomo-pomodoro'
        >
          {children}
        </ThemeProvider>

        <SpeedInsights />
      </body>

      <GoogleTagManager gtmId='G-0EQRT3GR5Z' />
    </html>
  )
}
