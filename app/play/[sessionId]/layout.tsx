import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playing PaintingGuessr',
  description:
    'Guess the location and year of famous paintings. Can you score 50,000?',
  robots: { index: false },
};

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="sr-only">PaintingGuessr Game</h1>
      <p className="sr-only">
        Guess where in the world and when each painting was created. Place a pin
        on the map for location and use the timeline slider for the year. Score
        up to 10,000 points per round across 5 rounds.
      </p>
      {children}
    </>
  );
}
