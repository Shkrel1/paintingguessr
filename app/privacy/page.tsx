import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BreadcrumbJsonLd,
  BreadcrumbNav,
} from '@/components/seo/Breadcrumbs';
import Footer from '@/components/seo/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for PaintingGuessr. Learn how we handle data, cookies, and third-party services like Google AdSense.',
  alternates: { canonical: '/privacy' },
};

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Privacy Policy', url: '/privacy' },
];

export default function PrivacyPolicy() {
  return (
    <>
      <main>
        <article className="min-h-screen bg-[#0f0f1a] text-[#f5f0e8]/80 px-6 py-16 max-w-3xl mx-auto leading-relaxed text-sm">
          <BreadcrumbJsonLd items={breadcrumbs} />
          <BreadcrumbNav items={breadcrumbs} />

          <h1 className="text-3xl font-serif font-bold text-[#f5f0e8] mb-2">
            Privacy Policy
          </h1>
          <p className="text-[#f5f0e8]/40 mb-10">
            Last updated: February 12, 2025
          </p>

          <section className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                1. Introduction
              </h2>
              <p>
                PaintingGuessr (&quot;we,&quot; &quot;our,&quot; or &quot;the
                Service&quot;) respects your privacy. This Privacy Policy
                explains what information is collected, how it is used, and your
                rights regarding that information when you use our website.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                2. Information We Collect
              </h2>
              <h3 className="font-medium text-[#f5f0e8] mt-3 mb-1">
                a) Information collected automatically
              </h3>
              <p>
                When you visit PaintingGuessr, certain information may be
                collected automatically through cookies and similar technologies,
                including:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#f5f0e8]/70">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring URL</li>
                <li>General geographic location (country/region level)</li>
              </ul>
              <h3 className="font-medium text-[#f5f0e8] mt-3 mb-1">
                b) Information we do NOT collect
              </h3>
              <p>
                We do not require account creation. We do not collect your name,
                email address, phone number, or any other personally identifiable
                information directly.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                3. Cookies and Tracking Technologies
              </h2>
              <p>
                We use the following third-party services that may set cookies:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 text-[#f5f0e8]/70">
                <li>
                  <strong className="text-[#f5f0e8]">
                    Google AdSense:
                  </strong>{' '}
                  Google uses cookies to serve ads based on your prior visits to
                  this website and other websites. Google&apos;s use of
                  advertising cookies enables it and its partners to serve ads
                  based on your visit to PaintingGuessr and/or other sites on the
                  Internet. You may opt out of personalized advertising by
                  visiting{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    className="text-[#c9a84c] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Ads Settings
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-[#f5f0e8]">
                    Vercel Analytics:
                  </strong>{' '}
                  We use Vercel Analytics to understand how visitors interact with
                  the Service. Vercel Analytics collects anonymized usage data and
                  does not use cookies for tracking individual users.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                4. How We Use Information
              </h2>
              <p>The information collected is used to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#f5f0e8]/70">
                <li>Operate, maintain, and improve the Service.</li>
                <li>Display relevant advertisements via Google AdSense.</li>
                <li>Analyze usage trends and optimize user experience.</li>
                <li>Ensure the security and integrity of the Service.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                5. Third-Party Advertising
              </h2>
              <p>
                We use Google AdSense to display advertisements. Google and its
                partners may use cookies and web beacons to collect information
                (not including your name, address, email address, or telephone
                number) about your visits to this and other websites in order to
                provide advertisements about goods and services of interest to
                you. For more information about how Google manages data in its ad
                products, visit the{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  className="text-[#c9a84c] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Privacy &amp; Terms page
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                6. Data Sharing
              </h2>
              <p>
                We do not sell, trade, or rent your personal information to third
                parties. Information may be shared only in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#f5f0e8]/70">
                <li>
                  With third-party service providers (Google AdSense, Vercel) as
                  described in this policy, solely for the purposes outlined
                  above.
                </li>
                <li>When required by law, regulation, or legal process.</li>
                <li>
                  To protect the rights, property, or safety of PaintingGuessr,
                  its users, or the public.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                7. Your Rights and Choices
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#f5f0e8]/70">
                <li>
                  <strong className="text-[#f5f0e8]">
                    Opt out of personalized ads:
                  </strong>{' '}
                  Visit{' '}
                  <a
                    href="https://www.google.com/settings/ads"
                    className="text-[#c9a84c] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Ads Settings
                  </a>{' '}
                  or{' '}
                  <a
                    href="https://optout.aboutads.info"
                    className="text-[#c9a84c] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    aboutads.info
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-[#f5f0e8]">Manage cookies:</strong>{' '}
                  You can control cookies through your browser settings. Disabling
                  cookies may affect the functionality of the Service.
                </li>
                <li>
                  <strong className="text-[#f5f0e8]">
                    European users (GDPR):
                  </strong>{' '}
                  If you are in the European Economic Area, you have the right to
                  access, rectify, or delete your personal data, restrict
                  processing, and data portability. Contact us to exercise these
                  rights.
                </li>
                <li>
                  <strong className="text-[#f5f0e8]">
                    California users (CCPA):
                  </strong>{' '}
                  California residents have the right to know what personal
                  information is collected, request deletion, and opt out of the
                  sale of personal information. We do not sell personal
                  information.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                8. Children&apos;s Privacy
              </h2>
              <p>
                The Service is not directed to children under the age of 13. We
                do not knowingly collect personal information from children under
                13. If we become aware that we have inadvertently collected
                personal information from a child under 13, we will take steps to
                delete it promptly.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                9. Data Security
              </h2>
              <p>
                We take reasonable measures to protect the information collected
                through the Service. However, no method of transmission over the
                Internet or electronic storage is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will
                be posted on this page with an updated revision date. Your
                continued use of the Service after changes are posted constitutes
                acceptance of the revised policy.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#f5f0e8] mb-2">
                11. Contact
              </h2>
              <p>
                If you have questions about this Privacy Policy, please contact
                us via the project&apos;s{' '}
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
