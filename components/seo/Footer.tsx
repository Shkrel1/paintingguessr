import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a14] border-t border-[#2a2a4e]/40 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <nav aria-label="Footer navigation">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xs font-semibold text-[#f5f0e8]/50 uppercase tracking-wider mb-3">
                Play
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/daily"
                    className="text-sm text-[#f5f0e8]/35 hover:text-[#c9a84c] transition-colors"
                  >
                    Daily Challenge
                  </Link>
                </li>
                <li>
                  <Link
                    href="/play"
                    className="text-sm text-[#f5f0e8]/35 hover:text-[#c9a84c] transition-colors"
                  >
                    Endless Mode
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#f5f0e8]/50 uppercase tracking-wider mb-3">
                Learn
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/how-to-play"
                    className="text-sm text-[#f5f0e8]/35 hover:text-[#c9a84c] transition-colors"
                  >
                    How to Play
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-[#f5f0e8]/35 hover:text-[#c9a84c] transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#f5f0e8]/50 uppercase tracking-wider mb-3">
                About
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-[#f5f0e8]/35 hover:text-[#c9a84c] transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-[#f5f0e8]/35 hover:text-[#c9a84c] transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#f5f0e8]/50 uppercase tracking-wider mb-3">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-[#f5f0e8]/35 hover:text-[#c9a84c] transition-colors"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-[#f5f0e8]/35 hover:text-[#c9a84c] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="border-t border-[#2a2a4e]/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="font-serif text-sm font-bold text-[#f5f0e8]/50 hover:text-[#c9a84c] transition-colors">
            <span className="text-[#f5f0e8]/50">Painting</span>
            <span className="text-[#c9a84c]/50">Guessr</span>
          </Link>
          <p className="text-[10px] text-[#f5f0e8]/20">
            &copy; {new Date().getFullYear()} PaintingGuessr. Paintings sourced
            from public domain collections.
          </p>
        </div>
      </div>
    </footer>
  );
}
