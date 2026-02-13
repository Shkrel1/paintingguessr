import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Play PaintingGuessr – Choose Your Game Mode',
  description:
    'Start a 5-round art history challenge. Choose your timer and difficulty, then guess where and when famous paintings were created.',
  alternates: { canonical: '/play' },
};

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
