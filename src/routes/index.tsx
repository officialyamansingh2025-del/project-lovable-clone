import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Phone, MapPin, Clock, MessageCircle, ArrowRight, ArrowUp, Send,
  Award, Users, GraduationCap, Sparkles, ShieldCheck, Cpu, Keyboard,
  Calculator, Wifi, Printer, FileSpreadsheet, MonitorSmartphone,
  BookOpen, Presentation, Wrench, Globe2, Star, ChevronDown,
  Building2, Timer, Rocket, Menu, X, Sun, Moon, Mail, CheckCircle2,
} from "lucide-react";
import { useReveal, useCountUp } from "@/hooks/use-reveal";
import { useContent } from "@/lib/site-content";
import { Lightbox } from "@/components/lightbox";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "New Pitman Institute",
          description: "Government registered computer training institute in Najafgarh, Delhi.",
          telephone: ["+91-9911152004", "+91-9911152003"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "28 Feet Road, Near Shiv Shakti Properties, Main Gopal Nagar, Prem Nagar",
            addressLocality: "Najafgarh",
            addressRegion: "Delhi",
            postalCode: "110043",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
});

function Index() {
  const c = useContent();
  const LOGO_URL = c.brand.logo;
  const PHONE_1 = c.contact.phone1;
  const WHATSAPP = c.contact.whatsapp;
  useReveal();
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lb, setLb] = useState<{ items: { src: string; label?: string }[]; index: number } | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail as { group?: string; index?: number; src?: string; label?: string };
      if (d.group === "gallery") setLb({ items: c.gallery, index: d.index ?? 0 });
      else if (d.group === "teachers") setLb({ items: c.teachers.map((t) => ({ src: t.img, label: t.name })), index: d.index ?? 0 });
      else if (d.group === "facilities") setLb({ items: c.facilities.images.map((src, i) => ({ src, label: `Facility ${i + 1}` })), index: d.index ?? 0 });
      else if (d.src) setLb({ items: [{ src: d.src, label: d.label }], index: 0 });
    };
    window.addEventListener("npi:lightbox", handler);
    return () => window.removeEventListener("npi:lightbox", handler);
  }, [c.gallery, c.teachers, c.facilities.images]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 12);
        const h = document.documentElement;
        const p = y / (h.scrollHeight - h.clientHeight);
        setProgress(Math.min(1, Math.max(0, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Page loader */}
      <div
        className={`fixed inset-0 z-[100] grid place-items-center bg-gradient-hero transition-opacity duration-500 ${loading ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[var(--gold)] border-r-[var(--gold)]/40" />
            <img src={LOGO_URL} alt="New Pitman Institute" className="absolute inset-1.5 h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-full object-cover bg-white" />
          </div>
          <div className="font-display text-sm tracking-[0.3em]">{c.brand.name}</div>
        </div>
      </div>

      {/* Scroll progress */}
      <div className="fixed inset-x-0 top-0 z-[80] h-[3px] bg-transparent">
        <div className="h-full bg-gradient-brand" style={{ width: `${progress * 100}%` }} />
      </div>

      <Navbar dark={dark} setDark={setDark} scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Stats />
      <Marquee />
      <About />
      <WhyUs />
      <Courses />
      <Process />
      <Facilities />
      <Teachers />
      <Testimonials />
      <Gallery />
      <FAQ />
      <InquiryAndContact />
      <Footer />
      <Lightbox
        items={lb?.items || []}
        index={lb ? lb.index : null}
        onClose={() => setLb(null)}
        onIndexChange={(i) => setLb((prev) => (prev ? { ...prev, index: i } : prev))}
      />

      {/* Floating side buttons */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <a
          href={`https://wa.me/${WHATSAPP}?text=Hi%20New%20Pitman%20Institute%2C%20I%20want%20to%20know%20about%20your%20courses.`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="magnetic-btn grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-elegant"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute inset-0 rounded-full pulse-ring" />
        </a>
        <a
          href={`tel:${PHONE_1}`}
          aria-label="Call institute"
          className="magnetic-btn grid h-12 w-12 place-items-center rounded-full bg-gradient-brand text-white shadow-elegant"
        >
          <Phone className="h-5 w-5" />
        </a>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={`magnetic-btn grid h-11 w-11 place-items-center rounded-full glass text-foreground shadow-soft transition ${progress > 0.15 ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/* ---------- NAVBAR ---------- */
const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#courses", label: "Courses" },
  { href: "#why", label: "Why Us" },
  { href: "#faculty", label: "Faculty" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

function Navbar({ dark, setDark, scrolled, menuOpen, setMenuOpen }: {
  dark: boolean; setDark: (v: boolean) => void; scrolled: boolean; menuOpen: boolean; setMenuOpen: (v: boolean) => void;
}) {
  const c = useContent();
  const LOGO_URL = c.brand.logo;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${scrolled ? "translate-y-2" : "translate-y-0"}`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-6 ${scrolled ? "mx-3 glass shadow-soft md:mx-auto" : "bg-transparent"}`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-white shadow-elegant ring-1 ring-border">
            <img src={LOGO_URL} alt="New Pitman Institute logo" className="h-full w-full object-cover" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-[15px] font-extrabold tracking-tight text-foreground">{c.brand.name.split(" ").slice(0, 2).join(" ")}</div>
            <div className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">{c.brand.tagline}</div>
          </div>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded bg-gradient-brand transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={() => setDark(!dark)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground shadow-soft transition hover:scale-105"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#inquiry"
            className="magnetic-btn hidden rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-elegant md:inline-flex"
          >
            Apply Now
          </a>
          <button
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mx-3 mt-2 overflow-hidden rounded-2xl glass shadow-soft transition-all duration-300 lg:hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col p-3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-muted"
              >
                {l.label}
              </a>
            </li>
          ))}
          <a
            href="#inquiry"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-center text-sm font-semibold text-white"
          >
            Apply Now
          </a>
        </ul>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const c = useContent();
  const PHONE_1 = c.contact.phone1;
  const words = c.hero.rotatingWords.length ? c.hero.rotatingWords : ["Career"];
  const [wi, setWi] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[wi];
    let t: ReturnType<typeof setTimeout>;
    if (!del && txt !== current) {
      t = setTimeout(() => setTxt(current.slice(0, txt.length + 1)), 90);
    } else if (!del && txt === current) {
      t = setTimeout(() => setDel(true), 1400);
    } else if (del && txt !== "") {
      t = setTimeout(() => setTxt(current.slice(0, txt.length - 1)), 45);
    } else {
      setDel(false);
      setWi((wi + 1) % words.length);
    }
    return () => clearTimeout(t);
  });

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-hero pb-24 pt-32 text-white lg:pb-32 lg:pt-40">
      <div className="absolute inset-0 hero-grid-bg" />
      {/* Floating shapes */}
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 bg-[#2563eb]/40 blur-3xl blob-anim" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 bg-[#f59e0b]/30 blur-3xl blob-anim [animation-delay:-6s]" />
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-56 w-56 -translate-x-1/2 bg-white/10 blur-3xl blob-anim [animation-delay:-12s]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="reveal inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-semibold text-white/90">
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--gold)]" />
            {c.hero.badge}
          </div>
          <h1 className="reveal mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-[68px]">
            {c.hero.titleLine1}{" "}
            <span className="text-gradient-accent type-caret inline-block">{txt}</span>
            <br />
            {c.hero.titleLine2}
          </h1>
          <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            {c.hero.subtitle}
          </p>

          <div className="reveal mt-8 flex flex-wrap items-center gap-3">
            <a href="#inquiry" className="magnetic-btn ripple inline-flex items-center gap-2 rounded-xl bg-gradient-accent px-6 py-3.5 font-semibold text-black shadow-glow">
              {c.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#courses" className="magnetic-btn inline-flex items-center gap-2 rounded-xl glass-dark px-6 py-3.5 font-semibold text-white">
              {c.hero.ctaSecondary}
            </a>
            <a href={`tel:${PHONE_1}`} className="magnetic-btn inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white/90 hover:bg-white/10">
              <Phone className="h-4 w-4" /> {c.hero.ctaTertiary}
            </a>
          </div>

          <div className="reveal mt-10 flex flex-wrap items-center gap-6 text-sm text-white/70">
            {c.hero.checks.map((chk) => (
              <div key={chk} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--gold)]" /> {chk}</div>
            ))}
          </div>
        </div>

        <div className="reveal-zoom relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-accent opacity-20 blur-3xl" />
          <div className="animated-border relative overflow-hidden rounded-[1.75rem] shadow-elegant">
            <img
              src={c.hero.image}
              alt="Students learning at New Pitman Institute computer lab"
              width={1600}
              height={1104}
              className="h-[520px] w-full cursor-zoom-in object-cover"
              onClick={() => window.dispatchEvent(new CustomEvent("npi:lightbox", { detail: { src: c.hero.image, label: "Hero" } }))}
            />
            {/* floating info card */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl glass p-3 text-foreground shadow-soft">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{c.hero.floatingSubtitle}</div>
                  <div className="text-sm font-semibold">{c.hero.floatingTitle}</div>
                </div>
              </div>
              <a href="#inquiry" className="rounded-lg bg-gradient-brand px-3 py-2 text-xs font-semibold text-white">Enroll</a>
            </div>
          </div>

          {/* floating icons */}
          <div className="pointer-events-none absolute -left-6 top-8 grid h-14 w-14 place-items-center rounded-2xl glass shadow-soft float-y">
            <FileSpreadsheet className="h-7 w-7 text-[var(--brand)]" />
          </div>
          <div className="pointer-events-none absolute -right-4 top-1/3 grid h-14 w-14 place-items-center rounded-2xl glass shadow-soft float-y [animation-delay:-2s]">
            <Keyboard className="h-7 w-7 text-[var(--brand-2)]" />
          </div>
          <div className="pointer-events-none absolute -right-6 bottom-24 grid h-14 w-14 place-items-center rounded-2xl glass shadow-soft float-y [animation-delay:-4s]">
            <Calculator className="h-7 w-7 text-[var(--gold)]" />
          </div>
        </div>
      </div>

      {/* wave divider */}
      <svg className="absolute inset-x-0 bottom-0 h-16 w-full text-background" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L0,80Z" />
      </svg>
    </section>
  );
}

/* ---------- MARQUEE ---------- */
function Marquee() {
  const c = useContent();
  const items = c.marquee;
  const row = [...items, ...items];
  return (
    <div className="border-y border-border bg-card py-4 overflow-hidden">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((it, i) => (
          <div key={i} className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            <Sparkles className="h-4 w-4 text-[var(--gold)]" /> {it}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- STATS ---------- */
function Stats() {
  const c = useContent();
  const icons = [Users, BookOpen, Award, Star];
  const stats = c.stats.map((s, i) => ({ ...s, icon: icons[i % icons.length] }));
  return (
    <section className="mx-auto -mt-8 max-w-7xl px-4 md:px-6">
      <div className="reveal relative z-10 grid grid-cols-2 gap-4 rounded-3xl border border-border bg-card p-6 shadow-elegant md:grid-cols-4 md:p-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
function StatCard({ n, suffix, label, icon: Icon }: { n: number; suffix: string; label: string; icon: any }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, n);
  return (
    <div className="group flex items-center gap-4">
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-muted text-[var(--brand)] transition group-hover:bg-gradient-brand group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <div className="font-display text-3xl font-black text-foreground md:text-4xl">
          <span ref={ref}>0</span>
          <span className="text-gradient-accent">{suffix}</span>
        </div>
        <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  const c = useContent();
  const pointIcons = [Award, Presentation, Users, Rocket];
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="reveal-left">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-brand opacity-10 blur-2xl" />
            <img
              src={c.about.image}
              alt="Digital classroom at New Pitman Institute"
              width={1200} height={900}
              loading="lazy"
              className="relative cursor-zoom-in rounded-3xl shadow-elegant tilt"
              onClick={() => window.dispatchEvent(new CustomEvent("npi:lightbox", { detail: { src: c.about.image, label: "About" } }))}
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-card p-5 shadow-elegant md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-accent text-black"><Award className="h-6 w-6" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Since</div>
                  <div className="font-display text-2xl font-black">{c.about.sinceYear}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal-right">
          <SectionEyebrow>{c.about.eyebrow}</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black leading-tight md:text-5xl">
            {c.about.title}
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground">{c.about.body}</p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {c.about.points.map((p, i) => {
              const Icon = pointIcons[i % pointIcons.length];
              return (
                <div key={i} className="card-lift group flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted text-[var(--brand)] transition group-hover:bg-gradient-brand group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-semibold">{p.title}</div>
                    <div className="text-sm text-muted-foreground">{p.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-gradient-brand p-5 text-white shadow-elegant">
              <div className="text-xs uppercase tracking-widest text-white/80">{c.about.missionTitle}</div>
              <p className="mt-2 text-sm">{c.about.missionText}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.about.visionTitle}</div>
              <p className="mt-2 text-sm">{c.about.visionText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY US ---------- */
function WhyUs() {
  const c = useContent();
  const iconRing = [ShieldCheck, Users, Cpu, Timer, Clock, Award, MonitorSmartphone, Rocket, Building2, Users, Star, Sparkles];
  const items = c.whyUs.map((it, i) => ({ ...it, icon: iconRing[i % iconRing.length] }));
  return (
    <section id="why" className="relative overflow-hidden bg-muted/60 py-24">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-gradient-brand opacity-10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Why choose us</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            Everything you need to <span className="text-gradient-brand">succeed</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">Twelve reasons students and parents in Najafgarh keep choosing New Pitman Institute.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((it, i) => (
            <div key={it.title} className="reveal card-lift group rounded-2xl border border-border bg-card p-6" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white shadow-soft transition group-hover:scale-110">
                <it.icon className="h-6 w-6" />
              </div>
              <div className="mt-4 font-display text-lg font-bold">{it.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- COURSES ---------- */
const COURSE_ICONS = [Cpu, FileSpreadsheet, FileSpreadsheet, Calculator, Keyboard, Keyboard, Printer, Wrench, Wifi, Globe2, Calculator, BookOpen];

function Courses() {
  const c = useContent();
  const PHONE_1 = c.contact.phone1;
  const COURSES = c.courses.map((cr, i) => ({ ...cr, icon: COURSE_ICONS[i % COURSE_ICONS.length] }));
  return (
    <section id="courses" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="reveal max-w-2xl">
          <SectionEyebrow>Featured courses</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            Job-ready programs, <span className="text-gradient-brand">taught practically</span>.
          </h2>
        </div>
        <a href="#inquiry" className="magnetic-btn inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-elegant">
          Get Fees & Syllabus <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((cr, i) => (
          <div key={cr.name} className="reveal card-lift group relative overflow-hidden rounded-2xl border border-border bg-card p-6" style={{ animationDelay: `${i * 30}ms` }}>
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition group-hover:opacity-20" />
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white shadow-soft">
                <cr.icon className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">{cr.dur}</span>
            </div>
            <h3 className="mt-5 font-display text-xl font-bold">{cr.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{cr.desc}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cr.features.map((f) => (
                <li key={f} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground/80">{f}</li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between">
              <a href="#inquiry" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-2)]">
                Enroll <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href={`tel:${PHONE_1}`} className="text-xs font-semibold text-muted-foreground hover:text-foreground">Call for details</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
function Process() {
  const c = useContent();
  const steps = c.process;
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-24 text-white">
      <div className="absolute inset-0 hero-grid-bg" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="reveal max-w-2xl">
          <SectionEyebrow light>Learning process</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            A clear path from <span className="text-gradient-accent">enrollment</span> to your first job.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-5">
          {steps.map((s, i) => (
            <div key={s.n} className="reveal relative rounded-2xl glass-dark p-6" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="font-display text-4xl font-black text-gradient-accent">{s.n}</div>
              <div className="mt-3 font-display text-lg font-bold">{s.title}</div>
              <div className="mt-1 text-sm text-white/70">{s.desc}</div>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-[var(--gold)] md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FACILITIES ---------- */
function Facilities() {
  const c = useContent();
  const items = c.facilities.items;
  const imgs = c.facilities.images;
  const openLB = (idx: number) => window.dispatchEvent(new CustomEvent("npi:lightbox", { detail: { group: "facilities", index: idx } }));
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="reveal-left">
          <SectionEyebrow>Facilities</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">{c.facilities.title}</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">{c.facilities.body}</p>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--brand-2)]" />
                <span className="text-sm font-medium">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal-right grid grid-cols-2 gap-4">
          {imgs[0] && <img src={imgs[0]} alt="Facility 1" width={1200} height={900} loading="lazy" onClick={() => openLB(0)} className="col-span-2 h-64 cursor-zoom-in rounded-2xl object-cover shadow-elegant tilt" />}
          {imgs[1] && <img src={imgs[1]} alt="Facility 2" width={1000} height={1300} loading="lazy" onClick={() => openLB(1)} className="h-72 cursor-zoom-in rounded-2xl object-cover shadow-soft tilt" />}
          {imgs[2] && <img src={imgs[2]} alt="Facility 3" width={1000} height={1200} loading="lazy" onClick={() => openLB(2)} className="h-72 cursor-zoom-in rounded-2xl object-cover shadow-soft tilt" />}
        </div>
      </div>
    </section>
  );
}

/* ---------- TEACHERS ---------- */
function Teachers() {
  const c = useContent();
  const list = c.teachers;
  const openLB = (idx: number) => window.dispatchEvent(new CustomEvent("npi:lightbox", { detail: { group: "teachers", index: idx } }));
  return (
    <section id="faculty" className="bg-muted/60 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Our faculty</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            Mentors who care about your <span className="text-gradient-brand">progress</span>.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {list.map((t, idx) => (
            <div key={t.name} className="reveal card-lift group overflow-hidden rounded-3xl bg-card shadow-soft">
              <div className="relative h-80 cursor-zoom-in overflow-hidden" onClick={() => openLB(idx)}>
                <img src={t.img} alt={t.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <div className="font-display text-lg font-bold">{t.name}</div>
                    <div className="text-xs text-white/80">{t.role}</div>
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">{t.exp}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 p-5">
                {t.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const c = useContent();
  const reviews = c.testimonials;
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % reviews.length), 4500);
    return () => clearInterval(t);
  }, [reviews.length]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <div className="reveal mx-auto max-w-2xl text-center">
        <SectionEyebrow center>Student stories</SectionEyebrow>
        <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
          Real students. <span className="text-gradient-brand">Real results.</span>
        </h2>
      </div>

      <div className="reveal mt-14 grid gap-6 md:grid-cols-2">
        {reviews.map((r, idx) => (
          <div key={r.name} className={`card-lift rounded-3xl border border-border bg-card p-8 shadow-soft transition ${idx === i ? "ring-2 ring-[var(--brand-2)]/40" : ""}`}>
            <div className="flex items-center gap-1 text-[var(--gold)]">
              {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">"{r.text}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-brand font-display font-bold text-white">
                {r.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="font-display font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.course}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- GALLERY ---------- */
function Gallery() {
  const c = useContent();
  const heights = ["h-72", "h-96", "h-64", "h-96", "h-72", "h-64"];
  const imgs = c.gallery.map((im, i) => ({ ...im, h: heights[i % heights.length] }));
  const openLB = (idx: number) => window.dispatchEvent(new CustomEvent("npi:lightbox", { detail: { group: "gallery", index: idx } }));
  return (
    <section id="gallery" className="bg-muted/60 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Gallery</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            Life at <span className="text-gradient-brand">New Pitman Institute</span>.
          </h2>
        </div>
        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {imgs.map((im, i) => (
            <div key={i} onClick={() => openLB(i)} className="reveal-zoom group relative cursor-zoom-in overflow-hidden rounded-2xl shadow-soft">
              <img src={im.src} alt={im.label} loading="lazy" className={`${im.h} w-full object-cover transition duration-700 group-hover:scale-110`} />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <span className="font-display text-sm font-semibold text-white">{im.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const c = useContent();
  const items = c.faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 md:px-6">
      <div className="reveal text-center">
        <SectionEyebrow center>FAQ</SectionEyebrow>
        <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">Questions, answered.</h2>
      </div>
      <div className="reveal mt-12 space-y-3">
        {items.map((it, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
            <button
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-display font-semibold">{it.q}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 transition ${open === i ? "rotate-180 text-[var(--brand-2)]" : ""}`} />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm text-muted-foreground">{it.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- INQUIRY + CONTACT ---------- */
function InquiryAndContact() {
  const c = useContent();
  const PHONE_1 = c.contact.phone1;
  const PHONE_2 = c.contact.phone2;
  const WHATSAPP = c.contact.whatsapp;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(c.contact.mapQuery)}&output=embed`;
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(c.contact.mapQuery)}`;
  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-gradient-brand opacity-10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div id="inquiry" className="reveal-left">
          <SectionEyebrow>Inquiry</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            Book your <span className="text-gradient-brand">free counseling</span> session.
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">Fill this quick form. Our team will call you within business hours.</p>
          <InquiryForm />
        </div>

        <div className="reveal-right space-y-4">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
            <iframe
              title="New Pitman Institute location"
              src={mapSrc}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoCard icon={MapPin} title="Address" lines={c.contact.addressLines} />
            <InfoCard icon={Clock} title="Working Hours" lines={c.contact.hoursLines} />
            <a href={`tel:${PHONE_1}`} className="card-lift rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white"><Phone className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Call</div>
                  <div className="font-display font-semibold">{PHONE_1}</div>
                  <div className="font-display text-sm">{PHONE_2}</div>
                </div>
              </div>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank" rel="noreferrer"
              className="card-lift rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#25D366] text-white"><MessageCircle className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div>
                  <div className="font-display font-semibold">Chat with us</div>
                  <div className="text-xs text-muted-foreground">Quick replies · Mon–Sat</div>
                </div>
              </div>
            </a>
          </div>

          <a
            href={dirUrl}
            target="_blank" rel="noreferrer"
            className="magnetic-btn inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-5 py-4 font-semibold text-white shadow-elegant"
          >
            Get Directions <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: any; title: string; lines: string[] }) {
  return (
    <div className="card-lift rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted text-[var(--brand)]"><Icon className="h-5 w-5" /></div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
          {lines.map((l) => <div key={l} className="text-sm">{l}</div>)}
        </div>
      </div>
    </div>
  );
}

function InquiryForm() {
  const c = useContent();
  const PHONE_1 = c.contact.phone1;
  const WHATSAPP = c.contact.whatsapp;
  const [form, setForm] = useState({ name: "", phone: "", email: "", course: c.courses[0]?.name || "MS Office", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your full name";
    if (!/^\d{10}$/.test(form.phone.trim())) errs.phone = "Enter a valid 10-digit phone";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const text = encodeURIComponent(
      `Hi, I want to enroll.\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCourse: ${form.course}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  const input = "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-2)] focus:ring-4 focus:ring-[var(--brand-2)]/10";

  return (
    <form onSubmit={submit} className="mt-8 space-y-4 rounded-3xl border border-border bg-card p-6 shadow-elegant md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name}>
          <input className={input} value={form.name} maxLength={80} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input className={input} inputMode="numeric" value={form.phone} maxLength={10} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })} placeholder="10-digit mobile" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email (optional)" error={errors.email}>
          <input className={input} value={form.email} maxLength={120} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
        </Field>
        <Field label="Course">
          <select className={input} value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
            {c.courses.map((cr) => <option key={cr.name}>{cr.name}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Message">
        <textarea className={`${input} min-h-[110px]`} value={form.message} maxLength={500} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Anything you'd like us to know" />
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="magnetic-btn inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 font-semibold text-white shadow-elegant">
          Send Inquiry <Send className="h-4 w-4" />
        </button>
        <a href={`tel:${PHONE_1}`} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground hover:bg-muted">
          <Phone className="h-4 w-4" /> Or call {PHONE_1}
        </a>
      </div>

      {sent && (
        <div className="flex items-center gap-3 rounded-xl bg-[color-mix(in_oklab,#22c55e_15%,transparent)] px-4 py-3 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" /> Thanks! Opening WhatsApp with your details…
        </div>
      )}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      {children}
      {error && <div className="mt-1 text-xs font-medium text-destructive">{error}</div>}
    </label>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  const c = useContent();
  const PHONE_1 = c.contact.phone1;
  const WHATSAPP = c.contact.whatsapp;
  const LOGO_URL = c.brand.logo;
  return (
    <footer className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 hero-grid-bg" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-xl bg-white shadow-glow ring-1 ring-white/20">
              <img src={LOGO_URL} alt="New Pitman Institute" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="font-display text-lg font-extrabold">{c.brand.name}</div>
              <div className="text-xs tracking-widest text-white/70">{c.brand.tagline}</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-white/80">{c.footer.about}</p>
          <div className="mt-6 flex gap-3">
            <a href={`tel:${PHONE_1}`} aria-label="Call" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 hover:bg-white/20"><Phone className="h-4 w-4" /></a>
            <a href={`https://wa.me/${WHATSAPP}`} aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 hover:bg-white/20"><MessageCircle className="h-4 w-4" /></a>
            <a href={`mailto:${c.contact.email}`} aria-label="Email" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 hover:bg-white/20"><Mail className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <div className="font-display text-sm font-semibold tracking-widest text-white/70">QUICK LINKS</div>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href} className="text-white/85 transition hover:text-[var(--gold)]">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display text-sm font-semibold tracking-widest text-white/70">POPULAR COURSES</div>
          <ul className="mt-4 space-y-2 text-sm">
            {c.footer.popularCourses.map((pc) => (
              <li key={pc}><a href="#courses" className="text-white/85 transition hover:text-[var(--gold)]">{pc}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/70 md:flex-row md:px-6">
          <div>© {new Date().getFullYear()} {c.brand.name}. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <Link to="/admin" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- SHARED ---------- */
function SectionEyebrow({ children, center, light }: { children: React.ReactNode; center?: boolean; light?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${center ? "mx-auto" : ""} ${light ? "bg-white/10 text-white" : "bg-muted text-[var(--brand)]"}`}>
      <Sparkles className="h-3 w-3 text-[var(--gold)]" /> {children}
    </div>
  );
}
