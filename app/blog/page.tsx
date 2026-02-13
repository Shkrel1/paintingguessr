import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd, BreadcrumbNav } from '@/components/seo/Breadcrumbs';
import Footer from '@/components/seo/Footer';

export const metadata: Metadata = {
  title: 'Art History Blog – PaintingGuessr',
  description: 'Learn about art movements, famous painters, and the history behind iconic paintings. Educational articles from PaintingGuessr.',
  alternates: { canonical: '/blog' },
};

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
];

const posts = [
  {
    slug: 'identifying-art-periods-by-visual-style',
    title: "A Beginner's Guide to Identifying Art Periods by Visual Style",
    description: 'Learn the visual characteristics of major art movements — from Renaissance symmetry to Impressionist light.',
    date: '2025-02-10',
  },
  {
    slug: 'improve-your-paintingguessr-score',
    title: '5 Tips to Improve Your PaintingGuessr Score',
    description: 'Practical strategies for guessing painting locations and dates more accurately.',
    date: '2025-02-08',
  },
  {
    slug: 'art-history-games-future-of-education',
    title: 'Why Art History Games Are the Future of Education',
    description: 'How gamification is transforming art history learning in classrooms and beyond.',
    date: '2025-02-05',
  },
];

export default function BlogPage() {
  return (
    <>
      <main className="min-h-screen bg-[#0f0f1a] text-[#f5f0e8]/80 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <BreadcrumbJsonLd items={breadcrumbItems} />
          <BreadcrumbNav items={breadcrumbItems} />

          <h1 className="text-3xl font-serif font-bold text-[#f5f0e8] mb-10">
            Art History Blog
          </h1>

          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-[#2a2a4e]/40 rounded-lg p-6 hover:border-[#c9a84c]/40 transition-colors"
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <time
                    dateTime={post.date}
                    className="text-xs text-[#f5f0e8]/40 mb-2 block"
                  >
                    {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h2 className="text-xl font-semibold text-[#f5f0e8] group-hover:text-[#c9a84c] transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#f5f0e8]/60 leading-relaxed">
                    {post.description}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
