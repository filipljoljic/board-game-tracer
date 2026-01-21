import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Player Statistics | Board Game Tracker',
  description: 'View detailed statistics, win rates, and performance analytics for players'
}

export default function StatisticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
