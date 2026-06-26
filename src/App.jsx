import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const WEB3FORMS_ACCESS_KEY = "c2764b13-d259-47f6-8b0a-4fdb5403204d";

function ContactEnquiryForm() {
  const [formState, setFormState] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
    consentUpdates: false,
    consentTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("name", formState.name.trim());
      formData.append("mobile", formState.mobile.trim());
      formData.append("email", formState.email.trim());
      formData.append("message", formState.message.trim());
      formData.append("consent_updates", formState.consentUpdates ? "Yes" : "No");
      formData.append("consent_terms", formState.consentTerms ? "Yes" : "No");
      formData.append("subject", "New enquiry from Jainam Motors website");
      formData.append("from_name", "Jainam Motors Website");

      const response = await fetch("https://" + "api.web3forms.com" + "/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "We couldn’t submit your enquiry right now. Please try again."
        );
      }

      setFeedback({
        type: "success",
        message:
          "Thanks! Your enquiry has been submitted successfully. Our team will get back to you soon.",
      });
      setFormState({
        name: "",
        mobile: "",
        email: "",
        message: "",
        consentUpdates: false,
        consentTerms: false,
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while submitting your enquiry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <div>
        <h3 className="section-heading text-xl font-black text-brand-gold mb-3">
          SEND AN ENQUIRY
        </h3>
        <p className="text-sm text-white/85">
          Share your details and our team will connect with you shortly.
        </p>
      </div>
      <div className="grid gap-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formState.name}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/55 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label htmlFor="mobile" className="mb-2 block text-sm font-semibold">
            Mobile Number <span aria-hidden="true">*</span>
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            required
            inputMode="tel"
            value={formState.mobile}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/55 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
            placeholder="Enter mobile number"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold">
            Email Address <span className="text-white/60">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/55 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
            placeholder="Enter email address"
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold">
            Message <span className="text-white/60">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formState.message}
            onChange={handleChange}
            className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/55 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
            placeholder="Tell us what you’re looking for"
          />
        </div>
      </div>
      <div className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm">
        <label className="flex items-start gap-3 leading-relaxed">
          <input
            type="checkbox"
            name="consentTerms"
            checked={formState.consentTerms}
            onChange={handleChange}
            required
            className="mt-1 h-4 w-4 rounded border-white/40 bg-transparent text-brand-gold focus:ring-brand-gold"
          />
          <span>
            I agree to the{" "}
            <Link to="/terms-and-conditions" className="font-semibold text-brand-gold underline-offset-4 hover:underline">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="font-semibold text-brand-gold underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <label className="flex items-start gap-3 leading-relaxed">
          <input
            type="checkbox"
            name="consentUpdates"
            checked={formState.consentUpdates}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-white/40 bg-transparent text-brand-gold focus:ring-brand-gold"
          />
          <span>
            I would like to receive communications from Jainam Motors via SMS, RCS,
            Email and WhatsApp regarding enquiries, updates and promotional offers.
          </span>
        </label>
      </div>
      {feedback.message ? (
        <div
          className={
            feedback.type === "success"
              ? "rounded-md border px-4 py-3 text-sm border-emerald-400/30 bg-emerald-400/10 text-emerald-50"
              : "rounded-md border px-4 py-3 text-sm border-rose-400/30 bg-rose-400/10 text-rose-50"
          }
          aria-live="polite"
        >
          {feedback.message}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="lift-button inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold px-5 py-3 font-bold text-brand-blue transition disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress: pageScrollProgress } = useScroll();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const galleryGlowY = useTransform(pageScrollProgress, [0, 1], ["0%", "-8%"]);
  const contactGlowY = useTransform(pageScrollProgress, [0, 1], ["0%", "10%"]);
  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  const staggerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <>
      <div id="home" className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
          <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-[auto_1fr_auto] items-center gap-4">
            <a href="#home" className="flex items-center gap-2 shrink-0">
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
            </a>
            <nav className="hidden lg:flex justify-center gap-7 text-xs font-semibold tracking-wider">
              <a href="#home" className="hover:text-primary transition-colors">
                HOME
              </a>
              <a href="#about" className="hover:text-primary transition-colors">
                ABOUT US
              </a>
              <a
                href="#vehicles"
                className="hover:text-primary transition-colors"
              >
                VEHICLES
              </a>

              <a
                href="#services"
                className="hover:text-primary transition-colors"
              >
                SERVICES
              </a>
              <a
                href="#gallery"
                className="hover:text-primary transition-colors"
              >
                GALLERY
              </a>
              <a
                href="#contact"
                className="hover:text-primary transition-colors"
              >
                CONTACT US
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <a
                href="tel:+919574005036"
                className="hidden sm:inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-phone h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>{" "}
                +91 95740 05036
              </a>
              <button
                className="lg:hidden p-2"
                aria-label="Menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMenuOpen((current) => !current)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu"
                  aria-hidden="true"
                >
                  {menuOpen ? (
                    <>
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </>
                  ) : (
                    <>
                      <path d="M4 5h16" />
                      <path d="M4 12h16" />
                      <path d="M4 19h16" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
          {menuOpen ? (
            <nav
              id="mobile-navigation"
              className="lg:hidden border-t bg-background px-4 py-4"
            >
              <div className="mx-auto max-w-7xl flex flex-col gap-4 text-sm font-semibold tracking-wider">
                <a
                  href="#home"
                  className="hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  HOME
                </a>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  ABOUT US
                </a>
                <a
                  href="#vehicles"
                  className="hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  VEHICLES
                </a>
                <a
                  href="#services"
                  className="hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  SERVICES
                </a>
                <a
                  href="#gallery"
                  className="hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  GALLERY
                </a>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  CONTACT US
                </a>
              </div>
            </nav>
          ) : null}
        </header>
        <motion.div
          className="fixed left-0 top-0 z-50 h-1 origin-left bg-primary/80"
          style={shouldReduceMotion ? { width: "100%" } : { scaleX: pageScrollProgress }}
        />
        <section ref={heroRef} className="hero-section relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={
              shouldReduceMotion ? { backgroundImage: "url('/assets/hero.jpg')" } : { backgroundImage: "url('/assets/hero.jpg')", y: heroImageY }
            }
          ></motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/20"
            style={shouldReduceMotion ? undefined : { y: heroImageY }}
          ></motion.div>
          <motion.div
            className="hero-content relative mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center"
            style={shouldReduceMotion ? undefined : { y: heroContentY }}
          >
            <div className="hero-copy">
              <p className="text-lg md:text-xl font-semibold mb-3">
                Your Trusted Partner for
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
                THREE-WHEELERS <br />
                <span className="text-primary">&amp; COMMERCIAL VEHICLES</span>
              </h1>
              <p className="mt-4 text-sm md:text-base font-medium text-muted-foreground">
                Sales • Finance Assistance • Service • Genuine Parts
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#vehicles"
                  className="lift-button inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow hover:opacity-90"
                >
                  VIEW VEHICLES{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="lift-button inline-flex items-center gap-2 rounded-md border-2 border-foreground px-5 py-3 text-sm font-bold hover:bg-foreground hover:text-background transition-colors"
                >
                  CONTACT US{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="hidden md:block"></div>
          </motion.div>
        </section>
        <section id="about" className="about-section py-14 md:py-20">
          <motion.div
            className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.img
              src="/assets/JM7.jpg"
              alt="Jainam Motors showroom"
              className="rounded-lg w-full h-auto object-cover shadow"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
            />
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
            >
              <h2 className="section-heading text-2xl md:text-3xl font-black mb-4">
                ABOUT <span className="text-primary">JAINAM MOTORS</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Jainam Motors is a trusted name in the three-wheeler industry.
                We are authorized dealers of ATUL Auto Ltd., offering a wide range
                of passenger and cargo vehicles.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our commitment is to provide reliable vehicles, competitive
                prices, finance assistance and excellent after-sales service.
              </p>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 about-stats"
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "show"}
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerVariants}
              >
                <motion.div
                  className="stat-card text-center"
                  variants={sectionVariants}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-calendar mx-auto h-8 w-8 text-brand-blue mb-2"
                    aria-hidden="true"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                  <div className="text-xl font-black">15+</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Years of Experience
                  </div>
                </motion.div>
                <motion.div
                  className="stat-card text-center"
                  variants={sectionVariants}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-users mx-auto h-8 w-8 text-brand-blue mb-2"
                    aria-hidden="true"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                  <div className="text-xl font-black">10K+</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Happy Customers
                  </div>
                </motion.div>
                <motion.div
                  className="stat-card text-center"
                  variants={sectionVariants}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-car mx-auto h-8 w-8 text-brand-blue mb-2"
                    aria-hidden="true"
                  >
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                  <div className="text-xl font-black">10K+</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Vehicles Sold
                  </div>
                </motion.div>
                <motion.div
                  className="stat-card text-center"
                  variants={sectionVariants}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-headphones mx-auto h-8 w-8 text-brand-blue mb-2"
                    aria-hidden="true"
                  >
                    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                  </svg>
                  <div className="text-xl font-black">24/7</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Support Assistance
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
        <section id="vehicles" className="vehicles-section py-14 md:py-20 bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="h-px flex-1 max-w-[120px] bg-border"></span>
              <h2 className="section-heading text-2xl md:text-3xl font-bold tracking-wide text-center">
                OUR <span className="text-primary">VEHICLES</span>
              </h2>
              <span className="h-px flex-1 max-w-[120px] bg-border"></span>
            </div>
            <motion.div
              className="vehicles-grid grid md:grid-cols-2 xl:grid-cols-4 gap-6"
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "show"}
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              <motion.div
                className="bg-card rounded-lg shadow-sm border overflow-hidden flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
                }}
              >
                <div className="aspect-[4/3] bg-muted">
                  <img
                    src="/assets/JM2.png"
                    alt="PASSENGER AUTO RICKSHAW"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-center font-bold tracking-wide mb-4">
                    PASSENGER AUTO RICKSHAW
                  </h3>
                  <ul className="space-y-2 mb-5 flex-1">
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Comfortable Seating</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>High Mileage</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Powerful Performance</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Low Maintenance</span>
                    </li>
                  </ul>
                  <a
                    href="#contact"
                    className="inline-flex justify-center items-center gap-2 rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90"
                  >
                    ENQUIRE NOW{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="bg-card rounded-lg shadow-sm border overflow-hidden flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
                }}
              >
                <div className="aspect-[4/3] bg-muted">
                  <img
                    src="/assets/JM 10.avif"
                    alt="LOADING RICKSHAW"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-center font-bold tracking-wide mb-4">
                    LOADING RICKSHAW
                  </h3>
                  <ul className="space-y-2 mb-5 flex-1">
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>High Load Capacity</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Strong &amp; Durable</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Efficient Cargo Movement</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Best for Business</span>
                    </li>
                  </ul>
                  <a
                    href="#contact"
                    className="inline-flex justify-center items-center gap-2 rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90"
                  >
                    ENQUIRE NOW{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="bg-card rounded-lg shadow-sm border overflow-hidden flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
                }}
              >
                <div className="aspect-[4/3] bg-muted">
                  <img
                    src="/assets/JM5.jpg"
                    alt="CARGO THREE WHEELER"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-center font-bold tracking-wide mb-4">
                    CARGO THREE WHEELER
                  </h3>
                  <ul className="space-y-2 mb-5 flex-1">
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>High Load Capacity</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Strong &amp; Durable</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Fuel Efficient</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Best for Business</span>
                    </li>
                  </ul>
                  <a
                    href="#contact"
                    className="inline-flex justify-center items-center gap-2 rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90"
                  >
                    ENQUIRE NOW{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
              <motion.div
                className="bg-card rounded-lg shadow-sm border overflow-hidden flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
                }}
              >
                <div className="aspect-[4/3] bg-muted">
                  <img
                    src="/assets/JM4.png"
                    alt="ELECTRIC RICKSHAW"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-center font-bold tracking-wide mb-4">
                    ELECTRIC RICKSHAW
                  </h3>
                  <ul className="space-y-2 mb-5 flex-1">
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Eco Friendly</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Zero Emission</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Low Running Cost</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4 text-primary shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>High Performance</span>
                    </li>
                  </ul>
                  <a
                    href="#contact"
                    className="inline-flex justify-center items-center gap-2 rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90"
                  >
                    ENQUIRE NOW{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="bg-card rounded-lg shadow-sm border overflow-hidden flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
                }}
              >
                <div className="aspect-[4/3] bg-muted">
                  <img
                    src={encodeURI("/assets/Atul Gem Paxx CNG 3 Wheeler.jpeg")}
                    alt="ATUL GEM PAXX CNG 3 WHEELER"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-center font-bold tracking-wide mb-4">
                    ATUL GEM PAXX CNG 3 WHEELER
                  </h3>
                  <ul className="space-y-2 mb-5 flex-1">
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>CNG Efficiency</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Comfortable Ride</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Low Maintenance</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>City Friendly</span>
                    </li>
                  </ul>
                  <a href="#contact" className="inline-flex justify-center items-center gap-2 rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90">
                    ENQUIRE NOW{" "}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-4 w-4" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="bg-card rounded-lg shadow-sm border overflow-hidden flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
                }}
              >
                <div className="aspect-[4/3] bg-muted">
                  <img
                    src={encodeURI("/assets/Atul Rik +.png")}
                    alt="ATUL RIK+"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-center font-bold tracking-wide mb-4">
                    ATUL RIK+
                  </h3>
                  <ul className="space-y-2 mb-5 flex-1">
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Spacious Cabin</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Reliable Performance</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Fuel Efficient</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>City Friendly</span>
                    </li>
                  </ul>
                  <a href="#contact" className="inline-flex justify-center items-center gap-2 rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90">
                    ENQUIRE NOW{" "}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-4 w-4" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="bg-card rounded-lg shadow-sm border overflow-hidden flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
                }}
              >
                <div className="aspect-[4/3] bg-muted">
                  <img
                    src={encodeURI("/assets/Atul Shakti Diesel Waferbody.png")}
                    alt="ATUL SHAKTI DIESEL WAFERBODY"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-center font-bold tracking-wide mb-4">
                    ATUL SHAKTI DIESEL WAFERBODY
                  </h3>
                  <ul className="space-y-2 mb-5 flex-1">
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Strong Load Body</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Diesel Power</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Durable Build</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Business Ready</span>
                    </li>
                  </ul>
                  <a href="#contact" className="inline-flex justify-center items-center gap-2 rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90">
                    ENQUIRE NOW{" "}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-4 w-4" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="bg-card rounded-lg shadow-sm border overflow-hidden flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
                }}
              >
                <div className="aspect-[4/3] bg-muted">
                  <img
                    src={encodeURI("/assets/Auto Gem Cargo Aqua CNG Specification.png")}
                    alt="AUTO GEM CARGO AQUA CNG"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-center font-bold tracking-wide mb-4">
                    AUTO GEM CARGO AQUA CNG
                  </h3>
                  <ul className="space-y-2 mb-5 flex-1">
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Cargo-Friendly Bed</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>CNG Efficiency</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Smooth Handling</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-primary shrink-0" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>Low Running Cost</span>
                    </li>
                  </ul>
                  <a href="#contact" className="inline-flex justify-center items-center gap-2 rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90">
                    ENQUIRE NOW{" "}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-4 w-4" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section className="py-14 md:py-20 bg-brand-blue text-white">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="section-heading text-center text-2xl md:text-3xl font-black mb-12">
              WHY <span className="text-brand-gold">CHOOSE US?</span>
            </h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 justify-items-center gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12"
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "show"}
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerVariants}
            >
              <motion.div
                className="flex flex-col items-center text-center gap-3 md:col-span-2 lg:col-span-1"
                variants={sectionVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-award h-12 w-12"
                  aria-hidden="true"
                >
                  <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
                  <circle cx="12" cy="8" r="6" />
                </svg>
                <div className="text-sm font-semibold">Genuine Vehicles</div>
              </motion.div>

              <motion.div
                className="flex flex-col items-center text-center gap-3 md:col-span-2 lg:col-span-1"
                variants={sectionVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-wrench h-12 w-12"
                  aria-hidden="true"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" />
                </svg>
                <div className="text-sm font-semibold">Service Support</div>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center gap-3 md:col-span-2 lg:col-span-1"
                variants={sectionVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-settings h-12 w-12"
                  aria-hidden="true"
                >
                  <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <div className="text-sm font-semibold">Genuine Spare Parts</div>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center gap-3 md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-auto"
                variants={sectionVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shield-check h-12 w-12"
                  aria-hidden="true"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <div className="text-sm font-semibold">Trusted Dealer</div>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center gap-3 md:col-span-2 md:col-start-4 lg:col-span-1 lg:col-start-auto"
                variants={sectionVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-headphones h-12 w-12"
                  aria-hidden="true"
                >
                  <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                </svg>
                <div className="text-sm font-semibold">
                  Quick Customer Support
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section id="services" className="service-section py-8 md:py-12">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              className="bg-secondary/60 rounded-lg p-6 md:p-8 grid grid-cols-[1fr_auto] gap-4 items-center"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="text-center">
                <h3 className="section-heading text-2xl md:text-4xl font-black text-primary mb-4">
                  SERVICE &amp; SPARE{" "}
                  <span className="text-foreground">PARTS</span>
                </h3>
                <ul className="space-y-2 mb-5">
                  <li className="flex items-center justify-center gap-2 text-base md:text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check h-5 w-5 text-primary"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>{" "}
                    Regular Servicing
                  </li>
                  <li className="flex items-center justify-center gap-2 text-base md:text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check h-5 w-5 text-primary"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>{" "}
                    Skilled Technicians
                  </li>
                  <li className="flex items-center justify-center gap-2 text-base md:text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check h-5 w-5 text-primary"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>{" "}
                    Genuine Spare Parts
                  </li>
                  <li className="flex items-center justify-center gap-2 text-base md:text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check h-5 w-5 text-primary"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>{" "}
                    Quick Turnaround Time
                  </li>
                </ul>

              </div>
              <motion.img
                src="/assets/JM5.jpg"
                alt=""
                className="w-56 sm:w-72 md:w-96 h-auto rounded object-cover"
                initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              />
            </motion.div>
          </div>
        </section>
        <section className="py-8 md:py-12 bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="h-px flex-1 max-w-[120px] bg-border"></span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-center">
                WHAT OUR <span className="text-primary">CUSTOMERS</span> SAY
              </h2>
              <span className="h-px flex-1 max-w-[120px] bg-border"></span>
            </div>
            <motion.div
              className="testimonial-grid grid md:grid-cols-3 gap-6"
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "show"}
              viewport={{ once: true, amount: 0.25 }}
              variants={staggerVariants}
            >
              <motion.div
                className="testimonial-card bg-card border rounded-lg p-6 shadow-sm"
                variants={sectionVariants}
              >
                <div className="flex gap-0.5 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground italic mb-5">
                  "Excellent service and genuine vehicles. Jainam Motors helped
                  me get the best vehicle for my business with easy finance."
                </p>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold text-sm">– Rahul S.</div>
                    <div className="text-xs text-muted-foreground">
                      Business Owner
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="testimonial-card bg-card border rounded-lg p-6 shadow-sm"
                variants={sectionVariants}
              >
                <div className="flex gap-0.5 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground italic mb-5">
                  "Very supportive staff and good after sales service. I highly
                  recommend Jainam Motors."
                </p>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold text-sm">– Meena B.</div>
                    <div className="text-xs text-muted-foreground">
                      Rickshaw Owner
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="testimonial-card bg-card border rounded-lg p-6 shadow-sm"
                variants={sectionVariants}
              >
                <div className="flex gap-0.5 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 fill-brand-gold text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground italic mb-5">
                  "Smooth finance process and on-time delivery. Totally
                  satisfied!"
                </p>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold text-sm">– Amit P.</div>
                    <div className="text-xs text-muted-foreground">
                      Transport Contractor
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section id="gallery" className="relative overflow-hidden py-14 md:py-20">
          <motion.div
            className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
            style={shouldReduceMotion ? undefined : { y: galleryGlowY }}
          />
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="h-px flex-1 max-w-[120px] bg-border"></span>
              <h2 className="section-heading text-2xl md:text-3xl font-bold tracking-wide text-center">
                <span className="text-primary">GALLERY</span>
              </h2>
              <span className="h-px flex-1 max-w-[120px] bg-border"></span>
            </div>
            <motion.div
              className="gallery-grid grid grid-cols-2 md:grid-cols-5 gap-4"
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "show"}
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerVariants}
            >
              <motion.div className="gallery-tile group" variants={sectionVariants}>
                <div className="aspect-[4/3] overflow-hidden rounded bg-muted">
                  <img
                    src="/assets/JM7.jpg"
                    alt="Our Showroom"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="text-center text-xs mt-2 font-medium">
                  Anand Showroom
                </div>
              </motion.div>
              <motion.div className="gallery-tile group" variants={sectionVariants}>
                <div className="aspect-[4/3] overflow-hidden rounded bg-muted">
                  <img
                    src="/assets/JM13.jpg"
                    alt="Vehicle Delivery"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="text-center text-xs mt-2 font-medium">
                  Vehicle Delivery
                </div>
              </motion.div>
              <motion.div className="gallery-tile group" variants={sectionVariants}>
                <div className="aspect-[4/3] overflow-hidden rounded bg-muted">
                  <img
                    src="/assets/JM9.png"
                    alt="Happy Customer"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="text-center text-xs mt-2 font-medium">
                  Happy Customer
                </div>
              </motion.div>
              <motion.div className="gallery-tile group" variants={sectionVariants}>
                <div className="aspect-[4/3] overflow-hidden rounded bg-muted">
                  <img
                    src="/assets/JM12.jpg"
                    alt="Service Center"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="text-center text-xs mt-2 font-medium">
                  Kheda Showroom
                </div>
              </motion.div>
              <motion.div className="gallery-tile group" variants={sectionVariants}>
                <div className="aspect-[4/3] overflow-hidden rounded bg-muted">
                  <img
                    src="/assets/JM11.jpg"
                    alt="Team Jainam Motors"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="text-center text-xs mt-2 font-medium">
                  Atul Dealership
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section
          id="contact"
          className="relative overflow-hidden bg-brand-blue text-white py-14 md:py-20"
        >
          <motion.div
            className="pointer-events-none absolute left-0 bottom-0 h-80 w-80 rounded-full bg-brand-gold/10 blur-3xl"
            style={shouldReduceMotion ? undefined : { y: contactGlowY }}
          />
          <motion.div
            className="mx-auto max-w-7xl px-4 grid md:grid-cols-3 gap-8"
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerVariants}
          >
            <motion.div className="contact-panel" variants={sectionVariants}>
              <h3 className="section-heading text-xl font-black text-brand-gold mb-5">
                CONTACT US
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="font-bold text-lg">
                  Anand Dealership
                </li>
                <li className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin h-5 w-5 shrink-0 text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>{" "}
                  NH 8, Opposite MS Complex, Nearby Tata Motors Cars Showroom, Gamdi, Anand, Gujarat 388001
                </li>
                <li className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-phone h-5 w-5 shrink-0 text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                  </svg>{" "}
                  +91 95740 05036
                </li>
                <li className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail h-5 w-5 shrink-0 text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>{" "}
                  jainammotors@gmail.com
                </li>
                <li className="font-bold text-lg">
                  Kheda Dealership
                </li>
                <li className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin h-5 w-5 shrink-0 text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>{" "}
                  Survey No. 230/1, N.H.-08, Kaival Auto Link, Kanjari, Kheda, Gujarat 387325
                </li>
                <li className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-phone h-5 w-5 shrink-0 text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                  </svg>{" "}
                  +91 95740 02490
                </li>
                <li className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail h-5 w-5 shrink-0 text-brand-gold"
                    aria-hidden="true"
                  >
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>{" "}
                  jainammotorsnadiad@gmail.com
                </li>
                <li className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clock h-5 w-5 shrink-0 text-brand-gold"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>{" "}
                  Mon - Sat: 10:00 AM - 7:00 PM
                </li>
              </ul>
            </motion.div>
            <motion.div className="contact-panel rounded overflow-hidden bg-white min-h-[280px]" variants={sectionVariants}>
              <iframe
                title="map"
                src="https://www.google.com/maps?q=22.5620972,72.9849277&z=17&output=embed"
                className="w-full h-full min-h-[280px]"
              ></iframe>
            </motion.div>
            <motion.div className="contact-panel" variants={sectionVariants}>
              <ContactEnquiryForm />
            </motion.div>
          </motion.div>
        </section>
        <footer className="bg-brand-dark text-white/80">
          <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-4 gap-8">
            <a href="#home" className="flex items-center gap-2 shrink-0">
              <img
                src="/assets/JM Logo.png"
                alt="Jainam Motors logo"
                className="h-24 w-24 rounded-md object-contain"
              />
              <div className="leading-tight">
                <div className="text-xl font-black text-primary">JAINAM</div>
                <div className="text-[10px] font-bold tracking-[0.25em] text-foreground text-white/80">
                  MOTORS
                </div>
              </div>
            </a>
            <div>
              <h4 className="text-brand-gold text-xs font-black tracking-wider mb-3">
                QUICK LINKS
              </h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Vehicles
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
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
                OUR PRODUCTS
              </h4>
              <ul className="space-y-1 text-sm">
                <li>Passenger Auto Rickshaw</li>
                <li>Cargo Three Wheeler</li>
                <li>Electric Rickshaw</li>
              </ul>
            </div>
            <div>
              <h4 className="text-brand-gold text-xs font-black tracking-wider mb-3">
                FOLLOW US
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/share/1D8966nHSG/"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/919574005036"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-message-circle h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-4 py-4 text-xs flex flex-wrap justify-between gap-2">
              <span>© 2024 Jainam Motors. All Rights Reserved.</span>
              <span>Designed with ♥</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
