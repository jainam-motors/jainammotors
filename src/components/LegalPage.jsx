import { Link } from "react-router-dom";

function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-4 gap-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/assets/JM Logo.png"
            alt="Jainam Motors logo"
            className="h-24 w-24 rounded-md object-contain"
          />
          <div className="leading-tight">
            <div className="text-xl font-black text-primary">JAINAM</div>
            <div className="text-[10px] font-bold tracking-[0.25em] text-white/80">
              MOTORS
            </div>
          </div>
        </Link>
        <div>
          <h4 className="text-brand-gold text-xs font-black tracking-wider mb-3">
            QUICK LINKS
          </h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <a href="/#about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/#vehicles" className="hover:text-white">
                Vehicles
              </a>
            </li>
            <li>
              <a href="/#services" className="hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="/#gallery" className="hover:text-white">
                Gallery
              </a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-brand-gold text-xs font-black tracking-wider mb-3">
            LEGAL
          </h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-brand-gold text-xs font-black tracking-wider mb-3">
            CONTACT
          </h4>
          <ul className="space-y-1 text-sm">
            <li>+91 95740 05036</li>
            <li>jainammotors@gmail.com</li>
            <li>Mon - Sat: 10:00 AM - 7:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs flex flex-wrap justify-between gap-2">
          <span>© 2024 Jainam Motors. All Rights Reserved.</span>
          <span>Designed with ♥</span>
        </div>
      </div>
    </footer>
  );
}

export function LegalPage({ title, intro, sections }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/JM Logo.png"
              alt="Jainam Motors logo"
              className="h-24 w-24 rounded-md object-contain"
            />
            <div className="leading-tight">
              <div className="text-xl font-black text-primary">JAINAM</div>
              <div className="text-[10px] font-bold tracking-[0.25em] text-foreground">
                MOTORS
              </div>
            </div>
          </Link>
          <Link
            to="/"
            className="lift-button inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <main>
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-4">
            <div className="rounded-2xl border bg-card/80 p-6 md:p-10 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                Jainam Motors
              </p>
              <h1 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
                {title}
              </h1>
              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                {intro}
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-2xl border bg-card/90 p-6 md:p-8 shadow-sm"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-primary">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.items?.length ? (
                      <ul className="space-y-2 pl-5">
                        {section.items.map((item) => (
                          <li key={item} className="list-disc">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
