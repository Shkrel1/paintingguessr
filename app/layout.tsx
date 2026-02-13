import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PaintingGuessr — Guess the Painting',
  description:
    'A browser-based guessing game where you identify where and when famous paintings were created. Test your art history knowledge!',
  openGraph: {
    title: 'PaintingGuessr',
    description: 'Guess where and when famous paintings were created!',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
