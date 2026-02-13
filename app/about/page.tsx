import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd, BreadcrumbNav } from '@/components/seo/Breadcrumbs';
import Footer from '@/components/seo/Footer';

export const metadata: Metadata = {
  title: 'About PaintingGuessr – Free Art History Game',
  description:
    'PaintingGuessr is a free browser game that tests your knowledge of art history. Learn about the game, the team, and how paintings are sourced from museum collections.',
  alternates: { canonical: '/about' },
};

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
];

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-[#0f0f1a] text-[#f5f0e8]/80 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <BreadcrumbJsonLd items={breadcrumbItems} />
          <BreadcrumbNav items={breadcrumbItems} />

          <article className="leading-relaxed text-sm">
            <h1 className="text-3xl font-serif font-bold text-[#f5f0e8] mb-6">
              About PaintingGuessr
            </h1>

            <p className="mb-6 text-base">
              PaintingGuessr is a completely free, browser-based art history guessing game
              designed for anyone who loves paintings, museums, or learning something new.
              Each round presents you with a real painting from a world-renowned collection.
              Your challenge is to guess where in the world it was created and when it was
              painted. The closer your guesses are to the truth, the higher your score. No
              downloads, no sign-ups, no paywalls — just you and centuries of art history.
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#c9a84c] mb-3">
                Why We Built PaintingGuessr
              </h2>
              <p className="mb-4">
                Art history is one of the richest and most fascinating subjects in the world,
                yet for many people it remains locked behind the doors of university lecture
                halls and museum galleries. We built PaintingGuessr with a simple educational
                mission: to make art history accessible, interactive, and genuinely fun for
                everyone. Whether you are a seasoned art historian or someone who has never
                set foot in a museum, PaintingGuessr is designed to meet you where you are
                and spark your curiosity.
              </p>
              <p className="mb-4">
                We believe that the best way to learn is through play. By turning art history
                into a guessing game, PaintingGuessr bridges the gap between passive museum
                visits and active, hands-on learning. Every round teaches you something new
                about geography, culture, artistic movements, and the stories behind the
                paintings. Over time, you will begin to recognize stylistic clues — the rich
                gold leaf of a medieval altarpiece, the dramatic lighting of a Baroque
                masterpiece, or the bold brushwork of an Impressionist landscape — that help
                you pinpoint a painting&apos;s origin and era.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#c9a84c] mb-3">
                Our Painting Collection
              </h2>
              <p className="mb-4">
                Paintings are sourced from the Metropolitan Museum of Art&apos;s Open Access
                collection under a CC0 public domain license, supplemented by a curated
                fallback dataset from Wikimedia Commons. This means every image you see in
                the game is freely and legally available for educational use. You can learn
                more about the Met&apos;s Open Access initiative on their{' '}
                <a
                  href="https://www.metmuseum.org/about-the-met/policies-and-documents/open-access"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c9a84c] hover:underline"
                >
                  official Open Access page
                </a>
                .
              </p>
              <p className="mb-4">
                The collection spans from the late medieval period (approximately 1300)
                through modern art (approximately 2000), covering an extraordinary breadth of
                artistic traditions. You will encounter European Renaissance paintings,
                delicate Asian ink scrolls, vibrant American folk art, expressive African
                masks and textiles, and much more. With thousands of paintings in the
                database, no two sessions are ever the same, and there is always something
                new to discover.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#c9a84c] mb-3">
                Technology Behind the Game
              </h2>
              <p className="mb-4">
                Built with Next.js and deployed on Vercel for fast, global performance,
                PaintingGuessr is designed to load quickly and run smoothly on any device.
                Whether you are playing on a desktop computer, a tablet, or your phone during
                a lunch break, the experience is optimized for speed and responsiveness. The
                interactive map and timeline components let you make your guesses with
                precision, and instant feedback after each round helps reinforce what you have
                learned.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#c9a84c] mb-3">
                How to Play
              </h2>
              <p className="mb-4">
                Getting started is easy. Head to{' '}
                <Link href="/how-to-play" className="text-[#c9a84c] hover:underline">
                  How to Play
                </Link>{' '}
                for a complete walkthrough of the rules and scoring system. In short, you
                view a painting, place a pin on the map to guess its geographic origin, and
                slide a timeline marker to guess the year it was created. Points are awarded
                based on how close your guesses are to the actual answers.
              </p>
              <p className="mb-4">
                Ready to jump right in? Try the{' '}
                <Link href="/daily" className="text-[#c9a84c] hover:underline">
                  Daily Challenge
                </Link>{' '}
                for a single curated painting that changes every day, or start an{' '}
                <Link href="/play" className="text-[#c9a84c] hover:underline">
                  Endless Mode
                </Link>{' '}
                session to play as many rounds as you like. If you have more questions, check
                out our{' '}
                <Link href="/faq" className="text-[#c9a84c] hover:underline">
                  FAQ
                </Link>{' '}
                page for answers to the most common inquiries.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#c9a84c] mb-3">
                Join the Community
              </h2>
              <p>
                PaintingGuessr is a passion project, and we love hearing from players. Whether
                you have feedback, a feature request, or just want to share a particularly
                impressive score, we welcome you to be part of the growing PaintingGuessr
                community. Art is better when it is shared, and every game you play is a step
                toward making art history a little more accessible for everyone.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
