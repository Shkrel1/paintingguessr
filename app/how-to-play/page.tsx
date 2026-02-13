import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd, BreadcrumbNav } from '@/components/seo/Breadcrumbs';
import Footer from '@/components/seo/Footer';

export const metadata: Metadata = {
  title: 'How to Play PaintingGuessr – Rules & Scoring',
  description:
    'Learn how PaintingGuessr works: guess the location on a map, pick the year on a timeline, and earn up to 10,000 points per round. Full scoring breakdown inside.',
  alternates: { canonical: '/how-to-play' },
};

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'How to Play', url: '/how-to-play' },
];

export default function HowToPlayPage() {
  return (
    <>
      <main className="min-h-screen bg-[#0f0f1a] text-[#f5f0e8]/80 px-6 py-16">
        <BreadcrumbJsonLd items={breadcrumbItems} />

        <article className="max-w-3xl mx-auto leading-relaxed text-sm">
          <BreadcrumbNav items={breadcrumbItems} />

          {/* ---------- Intro ---------- */}
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#f5f0e8] mb-4">
            How to Play PaintingGuessr
          </h1>
          <p className="text-base text-[#f5f0e8]/60 mb-12 max-w-xl">
            PaintingGuessr is a free browser-based art history game that tests your
            knowledge of famous paintings. Each round shows you a real painting from a
            public-domain collection, and your job is to figure out where and when it
            was created. Below you will find a complete guide to the rules, the scoring
            system, and practical tips that will help you climb the leaderboard.
          </p>

          {/* ---------- Game Rules ---------- */}
          <section className="mb-14">
            <h2 className="text-xl font-serif font-semibold text-[#c9a84c] mb-4">
              Game Rules
            </h2>
            <p className="mb-4">
              Every game session in PaintingGuessr consists of <strong>five rounds</strong>.
              In each round, a painting is displayed on screen along with its title and
              artist name. Your task is to make two guesses before time runs out:
            </p>
            <ol className="list-decimal list-inside space-y-3 mb-4 text-[#f5f0e8]/70">
              <li>
                <strong className="text-[#f5f0e8]/90">Place a pin on the map</strong> —
                Click or tap the interactive world map to indicate where you believe the
                painting was created. You can zoom in and pan around to place your marker
                as precisely as possible. The map covers the entire globe, from Japanese
                ukiyo-e studios to Parisian ateliers.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">Pick a year on the timeline</strong> —
                Use the year slider to select the date you think the painting was
                completed. The slider covers a range from <strong>1300</strong> to{' '}
                <strong>2000</strong>, spanning the late medieval period all the way
                through modern art.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">Submit your answer</strong> —
                Once you are satisfied with both your location pin and your year
                selection, hit the submit button. The correct answer is revealed
                immediately: you will see the actual location highlighted on the map, a
                line showing the distance between your guess and the truth, and the
                correct year compared to yours.
              </li>
            </ol>
            <p className="text-[#f5f0e8]/60">
              After all five rounds are complete, your total score is tallied and you
              receive a rating based on your performance. You can then share your results
              or jump straight into another game.
            </p>
          </section>

          {/* ---------- How Scoring Works ---------- */}
          <section className="mb-14">
            <h2 className="text-xl font-serif font-semibold text-[#c9a84c] mb-4">
              How Scoring Works
            </h2>
            <p className="mb-4">
              Each round awards up to <strong>10,000 points</strong> — 5,000 for
              location accuracy and 5,000 for year accuracy. Your five-round total can
              therefore reach a maximum of <strong>50,000 points</strong> in Normal and
              Hard modes, or <strong>25,000 points</strong> in Easy mode (which scores
              year only).
            </p>

            <h3 className="text-base font-semibold text-[#f5f0e8] mt-6 mb-2">
              Location Scoring (0 – 5,000 points)
            </h3>
            <p className="mb-3">
              Location points are calculated using a <strong>cubic decay</strong> formula
              based on the great-circle distance between your pin and the actual location.
              The maximum scoring radius is <strong>20,000 km</strong> — roughly half the
              circumference of the Earth. If your pin lands within that radius you earn
              some points; beyond it you receive zero. Additionally, if your guess falls
              within <strong>1,500 km</strong> of the correct location you earn a{' '}
              <strong>+500 point proximity bonus</strong>, rewarding close guesses even
              when they are not perfect.
            </p>

            <h3 className="text-base font-semibold text-[#f5f0e8] mt-6 mb-2">
              Year Scoring (0 – 5,000 points)
            </h3>
            <p className="mb-3">
              Year scoring uses a two-phase decay curve. Many paintings have an accepted
              date range (for example, 1503–1519 for the Mona Lisa). If your guess falls{' '}
              <strong>within that date range</strong>, you receive a perfect 5,000 points.
              Outside the range, a <strong>quadratic decay</strong> applies for the first
              100 years of error, dropping more gently at first and accelerating as you
              drift further. Beyond 100 years off, a steeper <strong>quartic decay</strong>{' '}
              kicks in, making scores fall rapidly toward zero.
            </p>

            <h3 className="text-base font-semibold text-[#f5f0e8] mt-6 mb-3">
              Example Scores
            </h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#2a2a4e]/60">
                    <th className="py-2 pr-4 text-[#f5f0e8]/50 font-medium">
                      Location Distance
                    </th>
                    <th className="py-2 pr-4 text-[#f5f0e8]/50 font-medium">
                      Approx. Points
                    </th>
                    <th className="py-2 pr-4 text-[#f5f0e8]/50 font-medium">
                      Year Error
                    </th>
                    <th className="py-2 text-[#f5f0e8]/50 font-medium">
                      Approx. Points
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[#f5f0e8]/70">
                  <tr className="border-b border-[#2a2a4e]/30">
                    <td className="py-2 pr-4">50 km</td>
                    <td className="py-2 pr-4 text-[#c9a84c]">~4,900</td>
                    <td className="py-2 pr-4">Exact year</td>
                    <td className="py-2 text-[#c9a84c]">5,000</td>
                  </tr>
                  <tr className="border-b border-[#2a2a4e]/30">
                    <td className="py-2 pr-4">500 km</td>
                    <td className="py-2 pr-4 text-[#c9a84c]">~4,500</td>
                    <td className="py-2 pr-4">10 years off</td>
                    <td className="py-2 text-[#c9a84c]">~4,600</td>
                  </tr>
                  <tr className="border-b border-[#2a2a4e]/30">
                    <td className="py-2 pr-4">5,000 km</td>
                    <td className="py-2 pr-4 text-[#c9a84c]">~1,500</td>
                    <td className="py-2 pr-4">50 years off</td>
                    <td className="py-2 text-[#c9a84c]">~3,200</td>
                  </tr>
                  <tr className="border-b border-[#2a2a4e]/30">
                    <td className="py-2 pr-4">10,000 km</td>
                    <td className="py-2 pr-4 text-[#c9a84c]">~300</td>
                    <td className="py-2 pr-4">100 years off</td>
                    <td className="py-2 text-[#c9a84c]">~1,800</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">20,000 km</td>
                    <td className="py-2 pr-4 text-[#f5f0e8]/40">0</td>
                    <td className="py-2 pr-4">200+ years off</td>
                    <td className="py-2 text-[#f5f0e8]/40">Near 0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[#f5f0e8]/60">
              The cubic location decay means that even a moderately close guess earns
              a respectable score, but pinpoint accuracy is handsomely rewarded. For
              years, the quadratic-to-quartic transition at the 100-year mark means you
              still earn meaningful points for getting within the right century, but
              wildly off guesses score almost nothing.
            </p>
          </section>

          {/* ---------- Daily Challenge ---------- */}
          <section className="mb-14">
            <h2 className="text-xl font-serif font-semibold text-[#c9a84c] mb-4">
              Daily Challenge
            </h2>
            <p className="mb-4">
              Every day, PaintingGuessr features a <strong>Daily Challenge</strong> — a
              curated set of five paintings that is identical for every player around the
              world. The challenge resets at <strong>midnight UTC</strong>, giving
              everyone the same 24-hour window to submit their guesses.
            </p>
            <p className="mb-4">
              Once you complete the Daily Challenge, your results are{' '}
              <strong>shareable</strong>. You can copy a spoiler-free results card to
              your clipboard and paste it into group chats, social media, or messaging
              apps. The card shows your score and rating without revealing the specific
              paintings, so your friends can still play unspoiled.
            </p>
            <p className="text-[#f5f0e8]/60">
              Comparing daily scores with friends is one of the most popular ways to
              enjoy PaintingGuessr. Because everyone sees the same paintings, you get
              a genuine apples-to-apples comparison of art history knowledge — no
              luck of the draw involved.
            </p>
          </section>

          {/* ---------- Tips for Beginners ---------- */}
          <section className="mb-14">
            <h2 className="text-xl font-serif font-semibold text-[#c9a84c] mb-4">
              Tips for Beginners
            </h2>
            <p className="mb-4">
              You do not need to be an art history professor to score well in
              PaintingGuessr. A handful of visual cues can dramatically improve your
              guesses. Here are some strategies that experienced players rely on:
            </p>
            <ul className="space-y-4 text-[#f5f0e8]/70">
              <li>
                <strong className="text-[#f5f0e8]/90">Study the color palette.</strong>{' '}
                Warm, earthy tones with rich golds and deep reds are hallmarks of the
                Italian Renaissance. Cooler palettes with silvery grays, muted greens,
                and overcast skies tend to point toward Northern European painters —
                think the Dutch Golden Age or Flemish masters. Bright, saturated colors
                with visible brushstrokes usually indicate Impressionism or
                Post-Impressionism, placing the work firmly in the late 19th century.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">
                  Look for architectural clues in the background.
                </strong>{' '}
                Classical columns and arches suggest Italy or Greece. Half-timbered
                buildings point toward Germany or the Low Countries. Onion domes hint at
                Russia or Eastern Europe. Even a window frame or doorway can reveal a
                region if you look closely.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">
                  Pay attention to clothing styles.
                </strong>{' '}
                Fashion changed dramatically across centuries. Ruffs and elaborate collars
                place a painting squarely in the 16th or 17th century. Powdered wigs and
                pastel silks scream 18th-century France. Simple tunics and biblical
                drapery often indicate an earlier medieval or early Renaissance period.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">
                  Examine the brushwork.
                </strong>{' '}
                Smooth, almost invisible brushstrokes are characteristic of earlier
                paintings where artists sought a polished, photographic finish. Visible,
                textured brushwork is a strong signal of Impressionist or later
                movements, narrowing the date to roughly 1860 onward. Thick impasto —
                paint applied so heavily it stands out from the canvas — usually points
                to Post-Impressionism or Expressionism.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">
                  Consider the subject matter.
                </strong>{' '}
                Religious scenes depicting saints, the Madonna, or biblical narratives
                are overwhelmingly Italian or Spanish in origin, particularly from the
                Renaissance and Baroque periods. Landscapes and seascapes are a strong
                indicator of Dutch or English artists. Still-life paintings with flowers,
                fruit, and table settings flourished in the 17th-century Netherlands.
                Portraits of wealthy merchants and burghers also suggest the Low
                Countries.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">
                  Check the medium.
                </strong>{' '}
                Oil on canvas became the dominant medium after roughly 1500, replacing
                tempera on wood panels. If a painting looks like it is on a wooden panel
                with a slightly different texture, it is likely from the 14th or 15th
                century. Watercolor paintings were especially popular in 18th- and
                19th-century England, so a delicate watercolor landscape almost certainly
                has British origins.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">
                  When in doubt, guess central Europe.
                </strong>{' '}
                If nothing about the painting gives you a clear geographic signal,
                placing your pin somewhere in central Western Europe (France, Germany,
                the Netherlands) gives you the best statistical chance of a reasonable
                score, simply because a large proportion of the database comes from that
                region. For the year, the mid-1600s is a solid default — it sits near
                the median of most public-domain painting collections.
              </li>
            </ul>
          </section>

          {/* ---------- Difficulty Modes ---------- */}
          <section className="mb-14">
            <h2 className="text-xl font-serif font-semibold text-[#c9a84c] mb-4">
              Difficulty Modes
            </h2>
            <p className="mb-4">
              PaintingGuessr offers three difficulty modes so players of all skill levels
              can enjoy the game:
            </p>
            <ul className="space-y-4 text-[#f5f0e8]/70">
              <li>
                <strong className="text-[#f5f0e8]/90">Easy</strong> — You only need to
                guess the year. The location component is removed entirely, so each
                round awards up to 5,000 points for a maximum possible score of{' '}
                <strong>25,000</strong>. This mode is perfect for beginners who want to
                focus on learning art history timelines without the added pressure of
                geography.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">Normal</strong> — The standard
                experience. You guess both the location and the year for each painting,
                earning up to 10,000 points per round and a maximum of{' '}
                <strong>50,000</strong>. The painting is displayed clearly along with its
                title and artist name.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">Hard</strong> — For true art
                history enthusiasts. The painting is <strong>blurred</strong> and only the
                title is shown — the artist name is hidden. You must rely on the title
                alone, any vague shapes you can make out through the blur, and your deep
                knowledge of art history to determine the location and year. Scoring
                works the same as Normal mode with a maximum of <strong>50,000</strong>,
                but achieving a high score here is a genuine accomplishment.
              </li>
            </ul>
          </section>

          {/* ---------- Ratings ---------- */}
          <section className="mb-14">
            <h2 className="text-xl font-serif font-semibold text-[#c9a84c] mb-4">
              Ratings
            </h2>
            <p className="mb-4">
              After completing a game, you are assigned a rating title based on your
              total score. These tiers give you a quick sense of how well you performed
              and a goal to aim for in your next session. The five rating tiers are:
            </p>
            <ul className="space-y-3 text-[#f5f0e8]/70">
              <li>
                <strong className="text-[#f5f0e8]/90">Finger Painter</strong>{' '}
                <span className="text-[#f5f0e8]/40">(below 15,000 points)</span> — You
                are just getting started. Do not worry — even the greatest curators
                began as finger painters. Focus on learning the visual cues described
                above and your score will climb quickly.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">Museum Tourist</strong>{' '}
                <span className="text-[#f5f0e8]/40">(15,000+ points)</span> — You have a
                solid grasp of the basics. You can generally place paintings in the
                correct region and century. Keep refining your eye for detail and you
                will level up soon.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">Art Student</strong>{' '}
                <span className="text-[#f5f0e8]/40">(25,000+ points)</span> — Your
                knowledge of art history is genuinely impressive. You can distinguish
                between artistic movements, identify regional styles, and narrow down
                dates with reasonable accuracy.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">Gallery Curator</strong>{' '}
                <span className="text-[#f5f0e8]/40">(35,000+ points)</span> — You
                could run a gallery. Your ability to pinpoint locations and dates
                suggests a deep familiarity with the major artists, movements, and
                historical contexts of Western and world art.
              </li>
              <li>
                <strong className="text-[#f5f0e8]/90">Art Historian</strong>{' '}
                <span className="text-[#f5f0e8]/40">(45,000+ points)</span> — The
                highest honor. Scoring above 45,000 means you placed nearly every pin
                within a few hundred kilometers and nailed the dates within a decade or
                two. You have an encyclopedic knowledge of art history that few can
                match.
              </li>
            </ul>
          </section>

          {/* ---------- CTAs ---------- */}
          <section className="flex flex-col sm:flex-row items-center gap-4 pt-4 pb-8 border-t border-[#2a2a4e]/40">
            <Link
              href="/play"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#c9a84c] text-[#0f0f1a] font-semibold text-sm hover:bg-[#d4b65e] transition-colors"
            >
              Start Playing
            </Link>
            <Link
              href="/daily"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#c9a84c]/50 text-[#c9a84c] font-semibold text-sm hover:bg-[#c9a84c]/10 transition-colors"
            >
              Try Today&apos;s Challenge
            </Link>
            <Link
              href="/faq"
              className="text-sm text-[#f5f0e8]/40 hover:text-[#c9a84c] transition-colors underline underline-offset-4"
            >
              Read the FAQ
            </Link>
          </section>
        </article>
      </main>

      <Footer />
    </>
  );
}
