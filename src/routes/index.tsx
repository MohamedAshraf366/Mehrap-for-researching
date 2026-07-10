import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo, type MouseEvent, type FormEvent } from "react";
import {
  BookOpen,
  Globe2,
  Microscope,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  Quote,
  Check,
  ExternalLink,
  Loader2,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { RESEARCH_LIST, FIELD_LABEL, type Field } from "@/lib/research-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "مِحراب — مكتبة الأبحاث العلمية المترجمة إلى العربية" },
      { name: "description", content: "تصفّح مكتبة تضمّ أبرز الأبحاث العلمية العالمية من Nature وScience وarXiv مُترجمةً إلى العربية في الطب، الفيزياء، علوم الحاسوب، والأحياء." },
      { property: "og:title", content: "مِحراب — مكتبة الأبحاث المترجمة" },
      { property: "og:description", content: "معرفة عالمية بلسانٍ عربي مبين." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "الأبحاث العلمية المترجمة",
          numberOfItems: RESEARCH_LIST.length,
          itemListElement: RESEARCH_LIST.map((r, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `/research/${r.id}`,
            name: r.titleAr,
          })),
        }),
      },
    ],
  }),
});

function Landing() {
  return (
    <main className="min-h-screen bg-hero text-foreground overflow-hidden relative">
      <AmbientOrbs />
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <ResearchLibrary />
      <Fields />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}

/* ---------- Ambient background ---------- */
function AmbientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full mesh-glow" />
      <div className="absolute top-1/2 -left-40 w-[600px] h-[600px] rounded-full mesh-glow" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full mesh-glow" />
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const links = [
    { label: "الرئيسية", href: "#hero" },
    { label: "المميزات", href: "#features" },
    { label: "المجالات", href: "#fields" },
    { label: "منهجيتنا", href: "#process" },
    { label: "آراء الباحثين", href: "#voices" },
  ];
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 inset-x-4 z-50 mx-auto max-w-6xl glass rounded-2xl px-5 py-3 flex items-center justify-between"
    >
      <a href="#hero" className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-gold-gradient grid place-items-center shadow-gold">
          <BookOpen className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-display text-xl font-bold text-gold-gradient">مِحراب</span>
      </a>
      <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-gold-soft transition-colors">
            {l.label}
          </a>
        ))}
      </nav>
      <a
        href="#cta"
        className="px-4 py-2 rounded-xl bg-gold-gradient text-primary-foreground text-sm font-bold shadow-gold hover:scale-105 transition-transform"
      >
        ابدأ القراءة
      </a>
    </motion.header>
  );
}

/* ---------- Hero with 3D tilt ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 15 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 100]);

  return (
    <section id="hero" className="relative pt-40 pb-32 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-right"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs text-gold-soft">
            <Sparkles className="w-3.5 h-3.5" />
            منصة عربية متخصصة في ترجمة العلوم
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
            المعرفة العالمية،
            <br />
            <span className="text-gold-gradient">بلسانٍ عربي مبين</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
            نُترجم أحدث الأبحاث العلمية من كبريات المجلات العالمية إلى لغة عربية دقيقة
            وأصيلة، ليصبح العلم في متناول كل باحث وقارئ عربي.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#cta"
              className="group px-7 py-3.5 rounded-2xl bg-gold-gradient text-primary-foreground font-bold shadow-gold hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              تصفّح المكتبة
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </a>
            <a
              href="#process"
              className="px-7 py-3.5 rounded-2xl glass hover:bg-white/5 transition-colors font-medium"
            >
              كيف نعمل؟
            </a>
          </div>
        </motion.div>

        {/* 3D tilt card */}
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{ perspective: 1200, y: y1 }}
          className="relative"
        >
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative rounded-3xl overflow-hidden shadow-elegant border border-white/10"
          >
            <img
              src={heroImg}
              alt="أبحاث علمية مترجمة"
              width={1536}
              height={1152}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            {/* floating badges */}
            <motion.div
              style={{ transform: "translateZ(60px)" }}
              className="absolute top-6 left-6 glass rounded-2xl px-4 py-3 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gold-gradient grid place-items-center">
                <Microscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">آخر عدد</div>
                <div className="text-sm font-bold">الكيمياء الحيوية</div>
              </div>
            </motion.div>
            <motion.div
              style={{ transform: "translateZ(80px)" }}
              className="absolute bottom-6 right-6 glass rounded-2xl px-4 py-3"
            >
              <div className="text-xs text-muted-foreground mb-1">مترجم من</div>
              <div className="text-sm font-bold text-gold-soft">Nature · Science · Cell</div>
            </motion.div>
          </motion.div>
          {/* glow */}
          <div className="absolute -inset-8 -z-10 bg-gold-gradient opacity-20 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */
function Stats() {
  const stats = [
    { n: "+2,400", l: "بحث مُترجم" },
    { n: "+180", l: "باحث ومترجم" },
    { n: "34", l: "مجالاً علمياً" },
    { n: "12", l: "دولة مستفيدة" },
  ];
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto glass rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-display text-4xl md:text-5xl font-bold text-gold-gradient mb-2">
              {s.n}
            </div>
            <div className="text-sm text-muted-foreground">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function Features() {
  const feats = [
    {
      icon: Microscope,
      title: "دقّة علمية صارمة",
      desc: "كل ترجمة يُراجعها متخصص في المجال قبل النشر، للحفاظ على المصطلح والمعنى.",
    },
    {
      icon: Globe2,
      title: "مصادر عالمية موثوقة",
      desc: "ننتقي من Nature وScience وCell وLancet لضمان محتوى في طليعة المعرفة.",
    },
    {
      icon: GraduationCap,
      title: "بلسان عربي أصيل",
      desc: "لغة رصينة تُوازن بين الأمانة العلمية وسلاسة الأسلوب العربي.",
    },
    {
      icon: BookOpen,
      title: "مكتبة رقمية مفتوحة",
      desc: "تصفح واقرأ وحمّل الأبحاث المترجمة بصيغ متعددة، مع أدوات بحث متقدمة.",
    },
  ];
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHead
          tag="لماذا مِحراب؟"
          title="منصةٌ صُنعت لعقلٍ عربي متعطش للعلم"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {feats.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group glass rounded-2xl p-7 hover:border-gold/40 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-gradient grid place-items-center mb-5 shadow-gold group-hover:scale-110 transition-transform">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Fields ---------- */
function Fields() {
  const items = [
    "الطب والصيدلة",
    "الفيزياء النظرية",
    "علوم الحاسوب",
    "علم الأحياء",
    "الكيمياء",
    "علوم الأرض",
    "الاقتصاد",
    "علم النفس",
    "الفلك",
    "الرياضيات",
    "الهندسة",
    "علوم الأعصاب",
  ];
  return (
    <section id="fields" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHead tag="المجالات" title="نُغطّي طيفاً واسعاً من العلوم" />
        <div className="mt-14 flex flex-wrap gap-3 justify-center">
          {items.map((it, i) => (
            <motion.span
              key={it}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.08, y: -3 }}
              className="glass px-5 py-2.5 rounded-full text-sm font-medium hover:text-gold-soft hover:border-gold/50 transition-colors cursor-default"
            >
              {it}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  const steps = [
    { n: "01", t: "الاختيار", d: "نرصد أبرز الأبحاث المنشورة في المجلات المصنّفة عالمياً." },
    { n: "02", t: "الترجمة", d: "يتولى الترجمة مختصون في المجال، لا مجرد لغويين." },
    { n: "03", t: "المراجعة", d: "لجنة تحكيم علمية ولغوية تُدقّق كل مصطلح وسياق." },
    { n: "04", t: "النشر", d: "يُنشر البحث بصياغة أنيقة، مع الحفاظ على المرجع الأصلي." },
  ];
  return (
    <section id="process" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHead tag="منهجيتنا" title="من مختبرٍ في زيوريخ… إلى قارئٍ في القاهرة" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative glass rounded-2xl p-7"
            >
              <div className="font-display text-6xl font-bold text-gold-gradient opacity-30 mb-2">
                {s.n}
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              <Check className="absolute top-6 left-6 w-5 h-5 text-gold" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const quotes = [
    {
      q: "أخيراً منصةٌ عربية تحترم عقل الباحث وتقدّم العلم كما يجب أن يُقدَّم.",
      n: "د. سارة الحسيني",
      r: "أستاذة الكيمياء الحيوية — جامعة الملك سعود",
    },
    {
      q: "الترجمة دقيقة، والاختيار موفّق، والتصميم يليق بالمحتوى.",
      n: "د. عمر بن طاهر",
      r: "باحث في علم الأعصاب — INSERM باريس",
    },
    {
      q: "أنصح كل طالب دراسات عليا عربي بمتابعة مِحراب أسبوعياً.",
      n: "د. ليلى مروان",
      r: "كلية الطب — الجامعة الأردنية",
    },
  ];
  return (
    <section id="voices" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHead tag="آراء الباحثين" title="أثرٌ يتردّد في الجامعات العربية" />
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {quotes.map((t, i) => (
            <motion.blockquote
              key={t.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-7 relative"
            >
              <Quote className="w-8 h-8 text-gold/40 mb-4" />
              <p className="text-base leading-relaxed mb-6">{t.q}</p>
              <div className="border-t border-white/10 pt-4">
                <div className="font-bold text-gold-soft">{t.n}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.r}</div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA (newsletter with double opt-in) ---------- */
function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "already" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    trackEvent("newsletter_submit", { location: "cta" });
    try {
      const res = await fetch("/api/public/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error === "invalid_email" ? "الرجاء إدخال بريد إلكتروني صحيح." : "حدث خطأ، حاول لاحقاً.");
        trackEvent("newsletter_error", { code: data.error });
        return;
      }
      if (data.status === "already_confirmed") {
        setStatus("already");
        setMessage("أنت مشترك مسبقاً — شكراً لك.");
      } else {
        setStatus("sent");
        setMessage("تحقّق من بريدك لتأكيد الاشتراك.");
        trackEvent("newsletter_confirmation_sent");
      }
    } catch {
      setStatus("error");
      setMessage("تعذّر الاتصال بالخادم.");
    }
  }

  return (
    <section id="cta" className="py-24 px-6">
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute inset-0 bg-gold-gradient opacity-20 blur-3xl rounded-full" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 mesh-glow rounded-full" />
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 relative">
            انضمّ إلى <span className="text-gold-gradient">قافلة العلم</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 relative">
            اشترك في نشرتنا الأسبوعية لتصلك أبرز الأبحاث المُترجمة قبل غيرك. سنرسل رسالة تأكيد لبريدك.
          </p>
          <form onSubmit={onSubmit} className="relative flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading" || status === "sent"}
              placeholder="بريدك الإلكتروني"
              className="flex-1 px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-gold outline-none text-right disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "sent"}
              className="px-7 py-3.5 rounded-2xl bg-gold-gradient text-primary-foreground font-bold shadow-gold hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100 inline-flex items-center justify-center gap-2"
            >
              {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
              {status === "sent" ? "تم الإرسال" : status === "loading" ? "جارٍ..." : "اشترك الآن"}
            </button>
          </form>
          <AnimatePresence>
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-5 text-sm ${status === "error" ? "text-rose-300" : "text-gold-soft"}`}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Research Library (filterable) ---------- */
type FilterField = Field | "all";

function ResearchLibrary() {
  const [filter, setFilter] = useState<FilterField>("all");
  const fields = useMemo(
    () => Array.from(new Set(RESEARCH_LIST.map((r) => r.field))),
    [],
  );
  const filtered = filter === "all" ? RESEARCH_LIST : RESEARCH_LIST.filter((r) => r.field === filter);

  return (
    <section id="library" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHead tag="المكتبة" title="أبحاثٌ حقيقية، بين يديك" />
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mt-4">
          مختارات من أبرز الأبحاث العلمية المعاصرة — كلّها مفتوحة الوصول ومتاحة للقراءة كاملةً.
        </p>

        <div className="flex flex-wrap gap-2 justify-center mt-10">
          <FilterChip active={filter === "all"} onClick={() => { setFilter("all"); trackEvent("filter_research", { field: "all" }); }}>
            الكل ({RESEARCH_LIST.length})
          </FilterChip>
          {fields.map((f) => (
            <FilterChip
              key={f}
              active={filter === f}
              onClick={() => { setFilter(f); trackEvent("filter_research", { field: f }); }}
            >
              {FIELD_LABEL[f]}
            </FilterChip>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((r, i) => (
              <motion.article
                key={r.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: (i % 6) * 0.05 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 flex flex-col group hover:border-gold/40 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block glass rounded-full px-3 py-1 text-[11px] text-gold-soft">
                    {FIELD_LABEL[r.field]}
                  </span>
                  <span className="text-xs text-muted-foreground">{r.year}</span>
                </div>
                <h3 className="font-display text-lg font-bold leading-snug mb-2 line-clamp-2">
                  {r.titleAr}
                </h3>
                <p className="text-xs text-muted-foreground italic mb-3 line-clamp-1" dir="ltr">
                  {r.titleEn}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {r.summaryAr}
                </p>
                <div className="text-xs text-muted-foreground mb-5 pb-4 border-b border-white/5">
                  {r.source}
                </div>
                <div className="mt-auto flex items-center justify-between gap-2">
                  <Link
                    to="/research/$id"
                    params={{ id: r.id }}
                    onClick={() => trackEvent("view_research", { id: r.id, field: r.field })}
                    className="text-sm text-gold-soft font-bold hover:underline inline-flex items-center gap-1"
                  >
                    التفاصيل <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={r.readUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("read_full", { id: r.id })}
                    className="text-xs text-muted-foreground hover:text-gold-soft inline-flex items-center gap-1"
                  >
                    النص الكامل <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active
          ? "bg-gold-gradient text-primary-foreground shadow-gold"
          : "glass hover:text-gold-soft hover:border-gold/40"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold-gradient grid place-items-center">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-gold-gradient text-lg">مِحراب</span>
        </div>
        <div>© {new Date().getFullYear()} جميع الحقوق محفوظة — مِحراب للأبحاث المترجمة</div>
      </div>
    </footer>
  );
}

/* ---------- Helpers ---------- */
function SectionHead({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="inline-block glass rounded-full px-4 py-1.5 mb-4 text-xs text-gold-soft">
        {tag}
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">{title}</h2>
    </div>
  );
}
