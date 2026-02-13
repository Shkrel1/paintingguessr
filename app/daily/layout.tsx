import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Art Challenge – PaintingGuessr',
  description:
    "Today's 5-painting challenge. Same paintings for everyone — compare your art history knowledge with friends. New challenge every day at midnight UTC.",
  alternates: { canonical: '/daily' },
};

export default function DailyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
