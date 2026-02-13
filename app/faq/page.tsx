import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd, BreadcrumbNav } from '@/components/seo/Breadcrumbs';
import Footer from '@/components/seo/Footer';

export const metadata: Metadata = {
  title: 'FAQ – PaintingGuessr',
  description:
    'Frequently asked questions about PaintingGuessr. How scoring works, where paintings come from, daily challenges, and classroom use.',
  alternates: { canonical: '/faq' },
};

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'FAQ', url: '/faq' },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does PaintingGuessr work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each round shows a famous painting. Place a pin on a world map to guess the location and use a timeline slider to guess the year. Earn up to 5,000 points for location and 5,000 for year accuracy, max 10,000 per round across 5 rounds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is PaintingGuessr free to play?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. No account or download required. Just open paintingguessr.com in any browser and start playing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use PaintingGuessr in my classroom?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. The Daily Challenge gives every student the same 5 paintings, ideal for competitions, bellringer activities, or art history warmups. Works on phones, tablets, and computers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where do the paintings come from?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Paintings are sourced from the Metropolitan Museum of Art's Open Access collection (CC0 license) and a curated fallback dataset from Wikimedia Commons. The collection spans late medieval through modern art.",
      },
    },
    {
      '@type': 'Question',
      name: 'How is the daily challenge different from a regular game?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Same 5 paintings for every player worldwide, resetting at midnight UTC. Regular mode gives random paintings. Daily scores are shareable for comparing with friends.',
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <main className="min-h-screen bg-[#0f0f1a] text-[#f5f0e8]/80 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <BreadcrumbJsonLd items={breadcrumbItems} />
          <BreadcrumbNav items={breadcrumbItems} />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqStructuredData).replace(/</g, '\\u003c'),
            }}
          />

          <h1 className="text-3xl font-serif font-bold text-[#f5f0e8] mb-10">
            Frequently Asked Questions
          </h1>

          <div className="space-y-10">
            {/* Q1 */}
            <section>
              <h2 className="text-lg font-semibold text-[#c9a84c] mb-2">
                How does PaintingGuessr work?
              </h2>
              <p className="leading-relaxed text-sm">
                Each round shows a famous painting. Place a pin on a world map to
                guess the location and use a timeline slider to guess the year.
                Earn up to 5,000 points for location and 5,000 for year accuracy,
                max 10,000 per round across 5 rounds. Learn more on the{' '}
                <Link
                  href="/how-to-play"
                  className="text-[#c9a84c] hover:underline"
                >
                  How to Play
                </Link>{' '}
                page.
              </p>
            </section>

            {/* Q2 */}
            <section>
              <h2 className="text-lg font-semibold text-[#c9a84c] mb-2">
                Is PaintingGuessr free to play?
              </h2>
              <p className="leading-relaxed text-sm">
                Yes, completely free. No account or download required. Just open
                paintingguessr.com in any browser and start playing. There are no
                paywalls, subscriptions, or hidden fees.
              </p>
            </section>

            {/* Q3 */}
            <section>
              <h2 className="text-lg font-semibold text-[#c9a84c] mb-2">
                Can I use PaintingGuessr in my classroom?
              </h2>
              <p className="leading-relaxed text-sm">
                Absolutely. The{' '}
                <Link
                  href="/daily"
                  className="text-[#c9a84c] hover:underline"
                >
                  Daily Challenge
                </Link>{' '}
                gives every student the same 5 paintings, ideal for competitions,
                bellringer activities, or art history warmups. Works on phones,
                tablets, and computers with no login required.
              </p>
            </section>

            {/* Q4 */}
            <section>
              <h2 className="text-lg font-semibold text-[#c9a84c] mb-2">
                Where do the paintings come from?
              </h2>
              <p className="leading-relaxed text-sm">
                Paintings are sourced from the Metropolitan Museum of Art&apos;s
                Open Access collection (CC0 license) and a curated fallback
                dataset from Wikimedia Commons. The collection spans late medieval
                through modern art, covering hundreds of years of artistic
                tradition.
              </p>
            </section>

            {/* Q5 */}
            <section>
              <h2 className="text-lg font-semibold text-[#c9a84c] mb-2">
                How is the daily challenge different from a regular game?
              </h2>
              <p className="leading-relaxed text-sm">
                Same 5 paintings for every player worldwide, resetting at midnight
                UTC. Regular mode gives random paintings each time. Daily scores
                are shareable for comparing with friends. Try today&apos;s{' '}
                <Link
                  href="/daily"
                  className="text-[#c9a84c] hover:underline"
                >
                  Daily Challenge
                </Link>
                .
              </p>
            </section>

            {/* Q6 */}
            <section>
              <h2 className="text-lg font-semibold text-[#c9a84c] mb-2">
                What art periods does PaintingGuessr cover?
              </h2>
              <p className="leading-relaxed text-sm">
                The game features paintings from approximately 1300 to 2000,
                covering Renaissance, Baroque, Rococo, Romanticism, Impressionism,
                Post-Impressionism, Modern Art, and more. European, Asian,
                American, and African traditions are all represented.
              </p>
            </section>

            {/* Q7 */}
            <section>
              <h2 className="text-lg font-semibold text-[#c9a84c] mb-2">
                Can I play on my phone?
              </h2>
              <p className="leading-relaxed text-sm">
                Yes, PaintingGuessr is fully responsive. On mobile, a
                picture-in-picture layout lets you swap between the painting and
                the map. The year slider and submit button are always accessible at
                the bottom of the screen.
              </p>
            </section>

            {/* Q8 */}
            <section>
              <h2 className="text-lg font-semibold text-[#c9a84c] mb-2">
                How are daily challenge paintings selected?
              </h2>
              <p className="leading-relaxed text-sm">
                A deterministic algorithm uses the current date as a seed, ensuring
                every player gets the same 5 paintings. The selection rotates
                through the full collection over time so you rarely see repeats.
              </p>
            </section>

            {/* Q9 */}
            <section>
              <h2 className="text-lg font-semibold text-[#c9a84c] mb-2">
                Is there a multiplayer mode?
              </h2>
              <p className="leading-relaxed text-sm">
                Not yet, but the Daily Challenge effectively serves as an
                asynchronous multiplayer experience. Share your score and emoji
                grid with friends to compare results and see who knows art history
                best.
              </p>
            </section>

            {/* Q10 */}
            <section>
              <h2 className="text-lg font-semibold text-[#c9a84c] mb-2">
                What browsers are supported?
              </h2>
              <p className="leading-relaxed text-sm">
                Any modern browser with JavaScript enabled &mdash; Chrome, Firefox,
                Safari, Edge, and their mobile equivalents. No plugins or
                extensions required.
              </p>
            </section>

            {/* Q11 */}
            <section>
              <h2 className="text-lg font-semibold text-[#c9a84c] mb-2">
                Do I need to create an account?
              </h2>
              <p className="leading-relaxed text-sm">
                No. PaintingGuessr requires no account, login, or personal
                information. Daily challenge progress is saved locally in your
                browser so you can pick up where you left off.
              </p>
            </section>

            {/* Q12 */}
            <section>
              <h2 className="text-lg font-semibold text-[#c9a84c] mb-2">
                How can I use PaintingGuessr as a teacher?
              </h2>
              <p className="leading-relaxed text-sm">
                Project the Daily Challenge on a classroom screen. Have students
                write their guesses on paper or use individual devices. Discuss
                each painting after revealing answers. Great for art history,
                geography, and world cultures classes.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
