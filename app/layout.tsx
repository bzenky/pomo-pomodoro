import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css'

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
      <body className="antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
