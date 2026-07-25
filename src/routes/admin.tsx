import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { LogOut, Save, RotateCcw, ImagePlus, Plus, Trash2, ExternalLink } from "lucide-react";
import {
  useContent, saveContent, resetContentToDefaults, fileToDataUrl,
  isAdminAuthed, adminLogin, adminLogout, getAdminPassword,
  DEFAULT_CONTENT, type SiteContent,
} from "@/lib/site-content";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin — New Pitman Institute" }, { name: "robots", content: "noindex" }] }),
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => { setAuthed(isAdminAuthed()); }, []);
  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;
  return <AdminEditor onLogout={() => { adminLogout(); setAuthed(false); }} />;
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-hero p-4">
      <form
        onSubmit={(e) => { e.preventDefault(); if (adminLogin(email, pw)) onSuccess(); else setErr("Invalid credentials"); }}
        className="w-full max-w-md rounded-3xl bg-card p-8 shadow-elegant"
      >
        <h1 className="font-display text-2xl font-black">Admin Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to manage website content.</p>
        <div className="mt-6 space-y-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--brand-2)]" />
          <input value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" type="password" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[var(--brand-2)]" />
        </div>
        {err && <div className="mt-3 text-sm text-destructive">{err}</div>}
        <button className="mt-5 w-full rounded-xl bg-gradient-brand px-5 py-3 font-semibold text-white shadow-elegant">Sign In</button>
        <Link to="/" className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground">← Back to site</Link>
      </form>
    </div>
  );
}

/* ---------- Editor ---------- */
const SECTIONS = [
  "brand", "hero", "stats", "marquee", "about", "whyUs", "courses",
  "process", "facilities", "teachers", "testimonials", "gallery", "faq",
  "contact", "footer",
] as const;
type SectionKey = typeof SECTIONS[number];

function AdminEditor({ onLogout }: { onLogout: () => void }) {
  const live = useContent();
  const [draft, setDraft] = useState<SiteContent>(live);
  const [tab, setTab] = useState<SectionKey>("hero");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(live), [draft, live]);

  const save = async () => {
    const pw = getAdminPassword();
    if (!pw) { setErr("Session expired — please log in again."); return; }
    setSaving(true); setErr(null);
    try {
      await saveContent(draft, pw);
      setSaved(true); setTimeout(() => setSaved(false), 1600);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };
  const reset = async () => {
    if (!confirm("Reset ALL content back to defaults?")) return;
    const pw = getAdminPassword();
    if (!pw) { setErr("Session expired — please log in again."); return; }
    setSaving(true); setErr(null);
    try { await resetContentToDefaults(pw); setDraft(DEFAULT_CONTENT); }
    catch (e) { setErr(e instanceof Error ? e.message : "Reset failed"); }
    finally { setSaving(false); }
  };

  const update = (patch: Partial<SiteContent>) => setDraft({ ...draft, ...patch });

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card px-4 py-3 shadow-soft md:px-6">
        <div className="flex items-center gap-3">
          <div className="font-display text-lg font-black">Admin Panel</div>
          <span className="hidden text-xs text-muted-foreground md:inline">New Pitman Institute</span>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs font-semibold text-emerald-600">✓ Saved</span>}
          {saving && <span className="text-xs font-semibold text-sky-600">Saving…</span>}
          {err && <span className="max-w-[220px] truncate text-xs font-semibold text-destructive" title={err}>⚠ {err}</span>}
          {dirty && <span className="text-xs font-semibold text-amber-600">● Unsaved</span>}
          <Link to="/" target="_blank" className="hidden items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold hover:bg-muted md:inline-flex">
            <ExternalLink className="h-3.5 w-3.5" /> View Site
          </Link>
          <button onClick={reset} disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold hover:bg-muted disabled:opacity-50"><RotateCcw className="h-3.5 w-3.5" /> Reset</button>
          <button onClick={save} disabled={!dirty || saving} className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-brand px-4 py-2 text-xs font-semibold text-white shadow-soft disabled:opacity-50"><Save className="h-3.5 w-3.5" /> {saving ? "Saving…" : "Save"}</button>
          <button onClick={onLogout} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold hover:bg-muted"><LogOut className="h-3.5 w-3.5" /> Logout</button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-[220px_1fr] md:p-6">
        <aside className="h-fit rounded-2xl border border-border bg-card p-2 shadow-soft md:sticky md:top-20">
          <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col">
            {SECTIONS.map((k) => (
              <button key={k} onClick={() => setTab(k)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition ${tab === k ? "bg-gradient-brand text-white" : "hover:bg-muted"}`}>
                {label(k)}
              </button>
            ))}
          </nav>
        </aside>

        <main className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-8">
          {tab === "brand" && <BrandEditor v={draft.brand} onChange={(brand) => update({ brand })} />}
          {tab === "hero" && <HeroEditor v={draft.hero} onChange={(hero) => update({ hero })} />}
          {tab === "stats" && <ArrayEditor items={draft.stats} onChange={(stats) => update({ stats })} fields={[{ k: "n", label: "Number", type: "number" }, { k: "suffix", label: "Suffix" }, { k: "label", label: "Label" }]} newItem={{ n: 0, suffix: "+", label: "New" }} title="Stats" />}
          {tab === "marquee" && <StringListEditor items={draft.marquee} onChange={(marquee) => update({ marquee })} title="Marquee Items" />}
          {tab === "about" && <AboutEditor v={draft.about} onChange={(about) => update({ about })} />}
          {tab === "whyUs" && <ArrayEditor items={draft.whyUs} onChange={(whyUs) => update({ whyUs })} fields={[{ k: "title", label: "Title" }, { k: "desc", label: "Description", type: "textarea" }]} newItem={{ title: "New", desc: "" }} title='"Why Us" Cards' />}
          {tab === "courses" && <ArrayEditor items={draft.courses} onChange={(courses) => update({ courses })} fields={[{ k: "name", label: "Course Name" }, { k: "dur", label: "Duration" }, { k: "desc", label: "Description", type: "textarea" }, { k: "features", label: "Features (comma-sep)", type: "csv" }]} newItem={{ name: "New Course", dur: "1 Month", desc: "", features: [] }} title="Courses" />}
          {tab === "process" && <ArrayEditor items={draft.process} onChange={(process) => update({ process })} fields={[{ k: "n", label: "Number" }, { k: "title", label: "Title" }, { k: "desc", label: "Description", type: "textarea" }]} newItem={{ n: "06", title: "New", desc: "" }} title="Process Steps" />}
          {tab === "facilities" && <FacilitiesEditor v={draft.facilities} onChange={(facilities) => update({ facilities })} />}
          {tab === "teachers" && <ArrayEditor items={draft.teachers} onChange={(teachers) => update({ teachers })} fields={[{ k: "img", label: "Photo", type: "image" }, { k: "name", label: "Name" }, { k: "role", label: "Role" }, { k: "exp", label: "Experience" }, { k: "tags", label: "Tags (comma-sep)", type: "csv" }]} newItem={{ img: "", name: "New Trainer", role: "", exp: "", tags: [] }} title="Teachers / Faculty" />}
          {tab === "testimonials" && <ArrayEditor items={draft.testimonials} onChange={(testimonials) => update({ testimonials })} fields={[{ k: "name", label: "Student Name" }, { k: "course", label: "Course" }, { k: "text", label: "Review", type: "textarea" }]} newItem={{ name: "New", course: "", text: "" }} title="Testimonials" />}
          {tab === "gallery" && <ArrayEditor items={draft.gallery} onChange={(gallery) => update({ gallery })} fields={[{ k: "src", label: "Image", type: "image" }, { k: "label", label: "Caption" }]} newItem={{ src: "", label: "New" }} title="Gallery Images" />}
          {tab === "faq" && <ArrayEditor items={draft.faq} onChange={(faq) => update({ faq })} fields={[{ k: "q", label: "Question" }, { k: "a", label: "Answer", type: "textarea" }]} newItem={{ q: "New question?", a: "" }} title="FAQ" />}
          {tab === "contact" && <ContactEditor v={draft.contact} onChange={(contact) => update({ contact })} />}
          {tab === "footer" && <FooterEditor v={draft.footer} onChange={(footer) => update({ footer })} />}
        </main>
      </div>

      {dirty && (
        <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background shadow-elegant">
          You have unsaved changes — click Save to publish
        </div>
      )}
    </div>
  );
}

function label(k: SectionKey): string {
  return ({
    brand: "Brand / Logo", hero: "Hero", stats: "Stats", marquee: "Marquee",
    about: "About", whyUs: "Why Us", courses: "Courses", process: "Process",
    facilities: "Facilities", teachers: "Teachers", testimonials: "Testimonials",
    gallery: "Gallery", faq: "FAQ", contact: "Contact", footer: "Footer",
  } as const)[k];
}

/* ---------- Field primitives ---------- */
const INPUT = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[var(--brand-2)]";

function Text({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      {textarea
        ? <textarea className={`${INPUT} min-h-[80px]`} value={value} onChange={(e) => onChange(e.target.value)} />
        : <input className={INPUT} value={value} onChange={(e) => onChange(e.target.value)} />}
    </label>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt="preview" className="h-20 w-20 rounded-lg border border-border object-cover" />
        ) : (
          <div className="grid h-20 w-20 place-items-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">No image</div>
        )}
        <div className="flex flex-col gap-2">
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold hover:bg-muted">
            <ImagePlus className="h-3.5 w-3.5" /> Upload
            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
              const f = e.target.files?.[0]; if (f) onChange(await fileToDataUrl(f));
              e.target.value = "";
            }} />
          </label>
          <input placeholder="or paste image URL" className={INPUT + " text-xs"} value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

function StringListEditor({ items, onChange, title }: { items: string[]; onChange: (v: string[]) => void; title: string }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold">{title}</h2>
      <div className="mt-4 space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-2">
            <input className={INPUT} value={it} onChange={(e) => { const n = [...items]; n[i] = e.target.value; onChange(n); }} />
            <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
      <button onClick={() => onChange([...items, "New item"])} className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-muted"><Plus className="h-3.5 w-3.5" /> Add</button>
    </div>
  );
}

type FieldDef = { k: string; label: string; type?: "text" | "textarea" | "number" | "csv" | "image" };

function ArrayEditor({ items, onChange, fields, newItem, title }: { items: any[]; onChange: (v: any[]) => void; fields: FieldDef[]; newItem: any; title: string }) {
  const setItem = (idx: number, patch: any) => onChange(items.map((it, i) => i === idx ? { ...it, ...patch } : it));
  const remove = (idx: number) => { if (confirm("Delete this item?")) onChange(items.filter((_, i) => i !== idx)); };
  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir; if (j < 0 || j >= items.length) return;
    const n = [...items]; [n[idx], n[j]] = [n[j], n[idx]]; onChange(n);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold">{title}</h2>
        <button onClick={() => onChange([...items, { ...newItem }])} className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-brand px-3 py-2 text-xs font-semibold text-white"><Plus className="h-3.5 w-3.5" /> Add</button>
      </div>
      <div className="mt-4 space-y-4">
        {items.map((it, idx) => (
          <div key={idx} className="rounded-xl border border-border bg-background/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs font-semibold text-muted-foreground">#{idx + 1}</div>
              <div className="flex items-center gap-1">
                <button onClick={() => move(idx, -1)} className="rounded border border-border px-2 py-1 text-xs hover:bg-muted">↑</button>
                <button onClick={() => move(idx, 1)} className="rounded border border-border px-2 py-1 text-xs hover:bg-muted">↓</button>
                <button onClick={() => remove(idx)} className="rounded border border-border px-2 py-1 text-xs text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {fields.map((f) => {
                const val = it[f.k];
                if (f.type === "image") return <div key={f.k} className="sm:col-span-2"><ImageField label={f.label} value={val || ""} onChange={(v) => setItem(idx, { [f.k]: v })} /></div>;
                if (f.type === "textarea") return <div key={f.k} className="sm:col-span-2"><Text label={f.label} value={val || ""} onChange={(v) => setItem(idx, { [f.k]: v })} textarea /></div>;
                if (f.type === "number") return <Text key={f.k} label={f.label} value={String(val ?? 0)} onChange={(v) => setItem(idx, { [f.k]: Number(v) || 0 })} />;
                if (f.type === "csv") return <div key={f.k} className="sm:col-span-2"><Text label={f.label} value={(val || []).join(", ")} onChange={(v) => setItem(idx, { [f.k]: v.split(",").map((s) => s.trim()).filter(Boolean) })} /></div>;
                return <Text key={f.k} label={f.label} value={val || ""} onChange={(v) => setItem(idx, { [f.k]: v })} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Section editors ---------- */
function BrandEditor({ v, onChange }: { v: SiteContent["brand"]; onChange: (v: SiteContent["brand"]) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-bold">Brand & Logo</h2>
      <ImageField label="Logo" value={v.logo} onChange={(logo) => onChange({ ...v, logo })} />
      <Text label="Institute Name" value={v.name} onChange={(name) => onChange({ ...v, name })} />
      <Text label="Tagline" value={v.tagline} onChange={(tagline) => onChange({ ...v, tagline })} />
    </div>
  );
}

function HeroEditor({ v, onChange }: { v: SiteContent["hero"]; onChange: (v: SiteContent["hero"]) => void }) {
  const set = (p: Partial<SiteContent["hero"]>) => onChange({ ...v, ...p });
  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-bold">Hero Section</h2>
      <ImageField label="Hero Image" value={v.image} onChange={(image) => set({ image })} />
      <Text label="Badge Text" value={v.badge} onChange={(badge) => set({ badge })} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Text label="Title Line 1" value={v.titleLine1} onChange={(titleLine1) => set({ titleLine1 })} />
        <Text label="Title Line 2" value={v.titleLine2} onChange={(titleLine2) => set({ titleLine2 })} />
      </div>
      <Text label="Rotating Words (comma-sep)" value={v.rotatingWords.join(", ")} onChange={(s) => set({ rotatingWords: s.split(",").map((w) => w.trim()).filter(Boolean) })} />
      <Text label="Subtitle" value={v.subtitle} onChange={(subtitle) => set({ subtitle })} textarea />
      <div className="grid gap-3 sm:grid-cols-3">
        <Text label="CTA Primary" value={v.ctaPrimary} onChange={(ctaPrimary) => set({ ctaPrimary })} />
        <Text label="CTA Secondary" value={v.ctaSecondary} onChange={(ctaSecondary) => set({ ctaSecondary })} />
        <Text label="CTA Tertiary" value={v.ctaTertiary} onChange={(ctaTertiary) => set({ ctaTertiary })} />
      </div>
      <Text label="Check Items (comma-sep)" value={v.checks.join(", ")} onChange={(s) => set({ checks: s.split(",").map((w) => w.trim()).filter(Boolean) })} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Text label="Floating Card Title" value={v.floatingTitle} onChange={(floatingTitle) => set({ floatingTitle })} />
        <Text label="Floating Card Subtitle" value={v.floatingSubtitle} onChange={(floatingSubtitle) => set({ floatingSubtitle })} />
      </div>
    </div>
  );
}

function AboutEditor({ v, onChange }: { v: SiteContent["about"]; onChange: (v: SiteContent["about"]) => void }) {
  const set = (p: Partial<SiteContent["about"]>) => onChange({ ...v, ...p });
  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-bold">About Section</h2>
      <ImageField label="About Image" value={v.image} onChange={(image) => set({ image })} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Text label="Eyebrow" value={v.eyebrow} onChange={(eyebrow) => set({ eyebrow })} />
        <Text label="Since Year" value={v.sinceYear} onChange={(sinceYear) => set({ sinceYear })} />
      </div>
      <Text label="Title" value={v.title} onChange={(title) => set({ title })} textarea />
      <Text label="Body" value={v.body} onChange={(body) => set({ body })} textarea />
      <div className="grid gap-3 sm:grid-cols-2">
        <Text label="Mission Title" value={v.missionTitle} onChange={(missionTitle) => set({ missionTitle })} />
        <Text label="Vision Title" value={v.visionTitle} onChange={(visionTitle) => set({ visionTitle })} />
        <Text label="Mission Text" value={v.missionText} onChange={(missionText) => set({ missionText })} textarea />
        <Text label="Vision Text" value={v.visionText} onChange={(visionText) => set({ visionText })} textarea />
      </div>
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Key Points</div>
        <ArrayEditor items={v.points} onChange={(points) => set({ points })} fields={[{ k: "title", label: "Title" }, { k: "desc", label: "Description" }]} newItem={{ title: "New", desc: "" }} title="" />
      </div>
    </div>
  );
}

function FacilitiesEditor({ v, onChange }: { v: SiteContent["facilities"]; onChange: (v: SiteContent["facilities"]) => void }) {
  const set = (p: Partial<SiteContent["facilities"]>) => onChange({ ...v, ...p });
  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-bold">Facilities</h2>
      <Text label="Title" value={v.title} onChange={(title) => set({ title })} />
      <Text label="Body" value={v.body} onChange={(body) => set({ body })} textarea />
      <StringListEditor items={v.items} onChange={(items) => set({ items })} title="Facility Items" />
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Images (3)</div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <ImageField key={i} label={`Image ${i + 1}`} value={v.images[i] || ""} onChange={(val) => { const imgs = [...v.images]; imgs[i] = val; set({ images: imgs }); }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactEditor({ v, onChange }: { v: SiteContent["contact"]; onChange: (v: SiteContent["contact"]) => void }) {
  const set = (p: Partial<SiteContent["contact"]>) => onChange({ ...v, ...p });
  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-bold">Contact</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <Text label="Phone 1" value={v.phone1} onChange={(phone1) => set({ phone1 })} />
        <Text label="Phone 2" value={v.phone2} onChange={(phone2) => set({ phone2 })} />
        <Text label="WhatsApp (with country code)" value={v.whatsapp} onChange={(whatsapp) => set({ whatsapp })} />
        <Text label="Email" value={v.email} onChange={(email) => set({ email })} />
      </div>
      <Text label="Google Maps Search Query" value={v.mapQuery} onChange={(mapQuery) => set({ mapQuery })} />
      <StringListEditor items={v.addressLines} onChange={(addressLines) => set({ addressLines })} title="Address Lines" />
      <StringListEditor items={v.hoursLines} onChange={(hoursLines) => set({ hoursLines })} title="Working Hours Lines" />
    </div>
  );
}

function FooterEditor({ v, onChange }: { v: SiteContent["footer"]; onChange: (v: SiteContent["footer"]) => void }) {
  const set = (p: Partial<SiteContent["footer"]>) => onChange({ ...v, ...p });
  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-bold">Footer</h2>
      <Text label="About Blurb" value={v.about} onChange={(about) => set({ about })} textarea />
      <StringListEditor items={v.popularCourses} onChange={(popularCourses) => set({ popularCourses })} title="Popular Courses" />
    </div>
  );
}