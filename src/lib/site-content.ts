import { useSyncExternalStore } from "react";
import heroImg from "@/assets/hero-students.jpg";
import galleryLab from "@/assets/gallery-lab.jpg";
import galleryTyping from "@/assets/gallery-typing.jpg";
import galleryClass from "@/assets/gallery-class.jpg";
import galleryCert from "@/assets/gallery-cert.jpg";
import teacher1 from "@/assets/teacher-1.jpg";
import teacher2 from "@/assets/teacher-2.jpg";
import teacher3 from "@/assets/teacher-3.jpg";
// Logo served from /public so it works on any host (Lovable, Vercel, etc.)
const logoAsset = { url: "/pitman-logo.jpg" };

export type SiteContent = {
  brand: { name: string; tagline: string; logo: string };
  hero: {
    badge: string;
    titleLine1: string;
    rotatingWords: string[];
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaTertiary: string;
    checks: string[];
    image: string;
    floatingTitle: string;
    floatingSubtitle: string;
  };
  stats: { n: number; suffix: string; label: string }[];
  marquee: string[];
  about: {
    eyebrow: string;
    title: string;
    body: string;
    sinceYear: string;
    image: string;
    points: { title: string; desc: string }[];
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
  };
  whyUs: { title: string; desc: string }[];
  courses: { name: string; dur: string; desc: string; features: string[] }[];
  process: { n: string; title: string; desc: string }[];
  facilities: {
    title: string;
    body: string;
    items: string[];
    images: string[];
  };
  teachers: { img: string; name: string; role: string; exp: string; tags: string[] }[];
  testimonials: { name: string; course: string; text: string }[];
  gallery: { src: string; label: string }[];
  faq: { q: string; a: string }[];
  contact: {
    addressLines: string[];
    hoursLines: string[];
    phone1: string;
    phone2: string;
    whatsapp: string;
    email: string;
    mapQuery: string;
  };
  footer: {
    about: string;
    popularCourses: string[];
  };
};

export const DEFAULT_CONTENT: SiteContent = {
  brand: {
    name: "NEW PITMAN INSTITUTE",
    tagline: "GOVT. REGISTERED · NAJAFGARH, DELHI",
    logo: logoAsset.url,
  },
  hero: {
    badge: "Government Registered · Since 2014",
    titleLine1: "Build Your",
    rotatingWords: ["Career", "Skills", "Future", "Confidence"],
    titleLine2: "with Professional Computer Education",
    subtitle:
      "Practical training in MS Office, Tally Prime with GST, Advanced Excel, Typing, DTP, Hardware and career skills — taught in English & Hindi at our Najafgarh campus.",
    ctaPrimary: "Apply Now",
    ctaSecondary: "Explore Courses",
    ctaTertiary: "Call Now",
    checks: ["Small batch size", "Certificate on completion", "Flexible timings"],
    image: heroImg,
    floatingTitle: "Admissions Open",
    floatingSubtitle: "Live batches",
  },
  stats: [
    { n: 1000, suffix: "+", label: "Students Trained" },
    { n: 25, suffix: "+", label: "Professional Courses" },
    { n: 10, suffix: "+", label: "Years of Experience" },
    { n: 95, suffix: "%", label: "Student Satisfaction" },
  ],
  marquee: [
    "MS Office", "Tally Prime + GST", "Advanced Excel", "Typing English",
    "Typing Hindi", "DTP", "Hardware", "CCC", "Digital Skills", "Accounting",
  ],
  about: {
    eyebrow: "About the institute",
    title: "A trusted name in computer education across Najafgarh.",
    body:
      "New Pitman Institute is a Government registered training centre delivering practical, career-oriented computer education. Our mission is simple — every student should walk out job-ready with skills that matter.",
    sinceYear: "2014",
    image: galleryClass,
    points: [
      { title: "Govt. Registered", desc: "Officially recognised institute." },
      { title: "Practical Learning", desc: "Hands-on training on every module." },
      { title: "Experienced Trainers", desc: "Friendly mentors with industry background." },
      { title: "Career Guidance", desc: "Placement assistance & job-ready portfolio." },
    ],
    missionTitle: "Our Mission",
    missionText: "Empower every learner with practical digital skills that unlock real careers.",
    visionTitle: "Our Vision",
    visionText: "To be Najafgarh's most trusted computer institute for career-driven students.",
  },
  whyUs: [
    { title: "Expert Faculty", desc: "Learn from industry-experienced trainers." },
    { title: "Practical Training", desc: "Real projects, not just theory." },
    { title: "Affordable Fees", desc: "Best value in Najafgarh with easy installments." },
    { title: "Flexible Timing", desc: "Morning, afternoon & evening batches." },
    { title: "Certification", desc: "Industry-recognised course completion certificate." },
    { title: "Latest Computers", desc: "Modern hardware and current software versions." },
    { title: "Career Guidance", desc: "Resume building and interview preparation." },
    { title: "Placement Assistance", desc: "Referrals to hiring partners in Delhi NCR." },
    { title: "Small Batches", desc: "Personal attention for every learner." },
    { title: "Personal Attention", desc: "1:1 doubt clearing sessions on demand." },
    { title: "Friendly Environment", desc: "Welcoming space where students thrive." },
    { title: "Bilingual Teaching", desc: "Every course in Hindi and English medium." },
  ],
  courses: [
    { name: "Basic Computer", dur: "2 Months", desc: "Windows, files, internet & digital fundamentals.", features: ["Fundamentals", "Windows", "Internet"] },
    { name: "MS Office", dur: "3 Months", desc: "Word, Excel, PowerPoint & Outlook for office work.", features: ["Word", "Excel", "PowerPoint"] },
    { name: "Advanced Excel", dur: "2 Months", desc: "Formulas, pivots, dashboards, VBA basics.", features: ["Formulas", "Pivot", "Dashboards"] },
    { name: "Tally Prime with GST", dur: "3 Months", desc: "Complete accounting, inventory, GST returns.", features: ["Accounting", "GST", "Payroll"] },
    { name: "Typing English", dur: "1–3 Months", desc: "Speed & accuracy on standard keyboard.", features: ["30–60 WPM", "Accuracy", "Tests"] },
    { name: "Typing Hindi", dur: "1–3 Months", desc: "Krutidev / Mangal typing with speed tests.", features: ["Krutidev", "Mangal", "Practice"] },
    { name: "DTP", dur: "3 Months", desc: "Photoshop, CorelDraw, InDesign for print design.", features: ["Photoshop", "Corel", "InDesign"] },
    { name: "Computer Hardware", dur: "3 Months", desc: "Assembly, troubleshooting, OS installation.", features: ["Assembly", "Repair", "OS Install"] },
    { name: "Internet Skills", dur: "1 Month", desc: "Email, cloud, safe browsing, productivity.", features: ["Email", "Cloud", "Safety"] },
    { name: "Digital Skills", dur: "2 Months", desc: "Digital India certifications & everyday apps.", features: ["UPI", "e-Gov", "DigiLocker"] },
    { name: "Accounting Software", dur: "2 Months", desc: "BUSY / Marg / QuickBooks fundamentals.", features: ["BUSY", "Marg", "QB"] },
    { name: "CCC Preparation", dur: "1 Month", desc: "Focused prep for NIELIT CCC examination.", features: ["Syllabus", "Practice", "Mock"] },
  ],
  process: [
    { n: "01", title: "Admission", desc: "Choose your course, complete quick registration." },
    { n: "02", title: "Training", desc: "Structured classes with theory + demonstration." },
    { n: "03", title: "Practice", desc: "Daily lab practice with mentor support." },
    { n: "04", title: "Certification", desc: "Assessment and official certificate." },
    { n: "05", title: "Career Growth", desc: "Resume, interview prep and placement help." },
  ],
  facilities: {
    title: "A campus built for focused learning.",
    body: "Everything a modern computer learner needs — right in the heart of Najafgarh.",
    items: [
      "Modern Computer Lab", "AC Classroom", "Projector", "High-Speed Internet",
      "Latest Software", "Practical Sessions", "Digital Classroom", "Individual Attention",
      "Library", "Career Counseling",
    ],
    images: [galleryLab, galleryTyping, galleryCert],
  },
  teachers: [
    { img: teacher1, name: "Rajesh Kumar", role: "Head — Computer Applications", exp: "12+ yrs", tags: ["MS Office", "Excel", "CCC"] },
    { img: teacher2, name: "Priya Sharma", role: "Sr. Accounting Trainer", exp: "9+ yrs", tags: ["Tally Prime", "GST", "BUSY"] },
    { img: teacher3, name: "Aman Verma", role: "Typing & DTP Expert", exp: "7+ yrs", tags: ["Typing", "Photoshop", "Corel"] },
  ],
  testimonials: [
    { name: "Neha Kumari", course: "Tally Prime + GST", text: "The teachers explain everything patiently. I cleared my Tally basics in just 2 months and got a job at a local firm." },
    { name: "Rohit Singh", course: "Advanced Excel", text: "Pivot tables and dashboards felt scary before. Now I use them daily at work. Best decision I made." },
    { name: "Aarti Devi", course: "Typing Hindi", text: "Speed jumped from 15 to 40 WPM in Krutidev. Staff is very supportive and batches are small." },
    { name: "Mohammad Salman", course: "DTP", text: "Learned Photoshop and CorelDraw hands-on. Started freelancing during the course itself." },
  ],
  gallery: [
    { src: galleryLab, label: "Computer Lab" },
    { src: galleryTyping, label: "Typing Practice" },
    { src: galleryClass, label: "Classroom" },
    { src: galleryCert, label: "Certificates" },
    { src: heroImg, label: "Students" },
    { src: galleryClass, label: "Events" },
  ],
  faq: [
    { q: "Is New Pitman Institute government registered?", a: "Yes, we are a Government registered training institute. All certificates issued are authentic." },
    { q: "Do you offer classes in Hindi and English?", a: "Yes. Every course is available in both Hindi and English medium as per student comfort." },
    { q: "Are the batches small?", a: "Yes. We keep batches small so every student gets personal attention from the trainer." },
    { q: "Do you help with placement?", a: "We provide career guidance, resume building, interview prep, and referrals to hiring partners in Delhi NCR." },
    { q: "What are the timings and how do I enroll?", a: "Morning, afternoon and evening batches available. Fill the inquiry form or call us — admission takes a few minutes." },
    { q: "Where is the institute located?", a: "28 Feet Road, Near Shiv Shakti Properties, Main Gopal Nagar, Prem Nagar, Najafgarh, Delhi 110043." },
  ],
  contact: {
    addressLines: [
      "28 Feet Road, Near Shiv Shakti Properties,",
      "Main Gopal Nagar, Prem Nagar,",
      "Najafgarh, Delhi — 110043",
    ],
    hoursLines: ["Mon – Sat: 9:00 AM – 8:00 PM", "Sunday: Closed"],
    phone1: "9911152004",
    phone2: "9911152003",
    whatsapp: "919911152004",
    email: "info@newpitmaninstitute.in",
    mapQuery: "Main Gopal Nagar Prem Nagar Najafgarh Delhi 110043",
  },
  footer: {
    about:
      "Practical computer education for real careers. English & Hindi medium. Small batches. Trusted by families across Najafgarh since 2014.",
    popularCourses: ["Tally Prime + GST", "Advanced Excel", "MS Office", "DTP", "Typing English", "CCC Preparation"],
  },
};

const STORAGE_KEY = "npi_site_content_v1";

function deepMerge<T>(base: T, patch: any): T {
  if (Array.isArray(base)) return (Array.isArray(patch) ? patch : base) as T;
  if (base && typeof base === "object") {
    const out: any = { ...(base as any) };
    if (patch && typeof patch === "object") {
      for (const k of Object.keys(patch)) {
        out[k] = deepMerge((base as any)[k], patch[k]);
      }
    }
    return out;
  }
  return (patch === undefined ? base : patch) as T;
}

let currentContent: SiteContent = DEFAULT_CONTENT;
let hydrated = false;
const listeners = new Set<() => void>();

function loadCache(): SiteContent {
  if (typeof window === "undefined") return DEFAULT_CONTENT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    return deepMerge(DEFAULT_CONTENT, JSON.parse(raw));
  } catch {
    return DEFAULT_CONTENT;
  }
}

function saveCache(next: SiteContent) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* quota */ }
}

function applyRemote(remote: unknown) {
  const merged = deepMerge(DEFAULT_CONTENT, remote);
  currentContent = merged;
  saveCache(merged);
  listeners.forEach((l) => l());
}

async function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  // Warm from cache immediately so UI doesn't flash defaults.
  currentContent = loadCache();
  listeners.forEach((l) => l());

  const { supabase } = await import("@/integrations/supabase/client");
  // Initial fetch
  supabase
    .from("site_content")
    .select("data")
    .eq("id", "main")
    .maybeSingle()
    .then(({ data }) => {
      if (data && data.data && typeof data.data === "object") applyRemote(data.data);
    });
  // Realtime subscription — updates every open browser instantly
  const channel = supabase
    .channel("site_content_main")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "site_content", filter: "id=eq.main" },
      (payload) => {
        const row = (payload.new ?? payload.old) as { data?: unknown } | null;
        if (row?.data && typeof row.data === "object") applyRemote(row.data);
      },
    )
    .subscribe();
  // Keep channel alive for the app lifetime.
  void channel;
}

function subscribe(cb: () => void) {
  ensureHydrated();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  ensureHydrated();
  return currentContent;
}

function getServerSnapshot() {
  return DEFAULT_CONTENT;
}

export function useContent(): SiteContent {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Optimistic local update — the realtime channel will confirm shortly after.
export function setContentLocal(next: SiteContent) {
  currentContent = next;
  saveCache(next);
  listeners.forEach((l) => l());
}

// Persist to Lovable Cloud. Requires the admin password.
export async function saveContent(next: SiteContent, password: string): Promise<void> {
  setContentLocal(next);
  const { saveSiteContent } = await import("./site-content.functions");
  await saveSiteContent({ data: { data: next, password } });
}

export async function resetContentToDefaults(password: string): Promise<void> {
  await saveContent(DEFAULT_CONTENT, password);
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

/* auth (client-side gate only — for admin panel access) */
const AUTH_KEY = "npi_admin_auth_v1";
export const ADMIN_EMAIL = "pitman2026@gmail.com";
export const ADMIN_PASSWORD = "pitman2026@gmail.com";

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "1";
}
export function adminLogin(email: string, password: string): boolean {
  if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    window.localStorage.setItem(AUTH_KEY, "1");
    window.localStorage.setItem("npi_admin_pw_v1", password);
    return true;
  }
  return false;
}
export function adminLogout() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_KEY);
    window.localStorage.removeItem("npi_admin_pw_v1");
  }
}

export function getAdminPassword(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("npi_admin_pw_v1");
}