import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BreadcrumbJsonLd,
  BreadcrumbNav,
} from '@/components/seo/Breadcrumbs';
import Footer from '@/components/seo/Footer';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for PaintingGuessr, the free art history guessing game.',
  alternates: { canonical: '/terms' },
};

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Terms of Use', url: '/terms' },
];

export default function TermsOfUse() {
  return (
    <>
      <main>
        <article className="min-h-screen bg-[#0f0f1a] text-[#f5f0e8]/80 px-6 py-16 max-w-3xl mx-auto leading-relaxed text-sm">
          <BreadcrumbJsonLd items={breadcrumbs} />
          <BreadcrumbNav items={breadcrumbs} />

          <h1 className="text-3xl font-serif font-bold text-[#f5f0e8] mb-2">
            Terms of Use
          </h1>
          <p className="text-[#f5f0e8]/40 mb-10">
            Last updated: February 12, 2025
          </p>

          <section className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using PaintingGuessr (&quot;the Service&quot;),
                you agree to be bound by these Terms of Use. If you do not agree
                to these terms, please do not use the Service.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                2. Description of Service
              </h2>
              <p>
                PaintingGuessr is a free, browser-based guessing game where
                users identify the origin and date of famous paintings. The
                Service is provided &quot;as is&quot; and &quot;as
                available.&quot;
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                3. User Conduct
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#f5f0e8]/70">
                <li>
                  Use the Service for any unlawful purpose or in violation of
                  any applicable laws or regulations.
                </li>
                <li>
                  Attempt to interfere with, compromise the integrity of, or
                  disrupt the Service or its underlying infrastructure.
                </li>
                <li>
                  Use automated scripts, bots, or other means to access the
                  Service in a manner that could damage or overburden it.
                </li>
                <li>
                  Reverse-engineer, decompile, or disassemble any part of the
                  Service.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                4. Intellectual Property
              </h2>
              <p>
                The PaintingGuessr name, logo, and original code are the
                property of PaintingGuessr. Painting images displayed within the
                game are sourced from public-domain collections and are used for
                educational and entertainment purposes. All trademarks, service
                marks, and trade names are the property of their respective
                owners.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                5. Third-Party Services
              </h2>
              <p>
                The Service uses third-party services including Google AdSense
                for advertising, Vercel Analytics for usage analytics, and
                mapping providers. Your use of these third-party services is
                subject to their respective terms and privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                6. Disclaimer of Warranties
              </h2>
              <p>
                The Service is provided on an &quot;as is&quot; and &quot;as
                available&quot; basis without warranties of any kind, either
                express or implied, including but not limited to implied
                warranties of merchantability, fitness for a particular purpose,
                and non-infringement. We do not warrant that the Service will be
                uninterrupted, error-free, or free of harmful components.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                7. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by applicable law, PaintingGuessr
                and its operators shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages, or any
                loss of profits or revenues, whether incurred directly or
                indirectly, or any loss of data, use, goodwill, or other
                intangible losses resulting from your use of the Service.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                8. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms of Use at any time.
                Changes will be posted on this page with an updated revision
                date. Your continued use of the Service after changes are posted
                constitutes acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                9. Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with
                the laws of the United States, without regard to conflict of law
                provisions.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                10. Contact
              </h2>
              <p>
                If you have questions about these Terms of Use, please contact us
                via the project&apos;s{' '}
                <Link
                  href="https://github.com/Shkrel1/paintingguessr"
                  className="text-[#c9a84c] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub repository
                </Link>
                .
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
