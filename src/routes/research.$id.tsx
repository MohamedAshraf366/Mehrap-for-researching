import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, BookOpen, Calendar, Users } from "lucide-react";
import { getResearchById, FIELD_LABEL, RESEARCH_LIST } from "@/lib/research-data";

export const Route = createFileRoute("/research/$id")({
  loader: ({ params }) => {
    const research = getResearchById(params.id);
    if (!research) throw notFound();
    return { research };
  },
  head: ({ loaderData }) => {
    const r = loaderData?.research;
    if (!r) return { meta: [{ title: "بحث غير موجود — مِحراب" }] };
    const desc = r.summaryAr.slice(0, 155);
    return {
      meta: [
        { title: `${r.titleAr} — مِحراب` },
        { name: "description", content: desc },
        { name: "keywords", content: `${FIELD_LABEL[r.field]}, ${r.titleEn}, بحث علمي مترجم, ${r.authors}` },
        { property: "og:title", content: r.titleAr },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/research/${r.id}` },
        { property: "article:published_time", content: `${r.year}-01-01` },
        { property: "article:section", content: FIELD_LABEL[r.field] },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: r.titleAr },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `/research/${r.id}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            headline: r.titleAr,
            alternativeHeadline: r.titleEn,
            author: { "@type": "Person", name: r.authors },
            datePublished: `${r.year}-01-01`,
            inLanguage: "ar",
            about: FIELD_LABEL[r.field],
            isBasedOn: r.originalUrl,
            publisher: { "@type": "Organization", name: "مِحراب" },
            description: desc,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "الرئيسية", item: "/" },
              { "@type": "ListItem", position: 2, name: FIELD_LABEL[r.field] },
              { "@type": "ListItem", position: 3, name: r.titleAr, item: `/research/${r.id}` },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="min-h-screen bg-hero grid place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl font-bold mb-4">البحث غير موجود</h1>
        <Link to="/" className="text-gold-soft hover:underline">العودة إلى المكتبة</Link>
      </div>
    </main>
  ),
  errorComponent: ({ reset }) => (
    <main className="min-h-screen bg-hero grid place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold mb-4">حدث خطأ ما</h1>
        <button onClick={reset} className="text-gold-soft hover:underline">إعادة المحاولة</button>
      </div>
    </main>
  ),
  component: ResearchDetail,
});

function ResearchDetail() {
  const { research: r } = Route.useLoaderData() as { research: import("@/lib/research-data").Research };
  const related = RESEARCH_LIST.filter((x) => x.field === r.field && x.id !== r.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-hero pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-28">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold-soft mb-8">
          <ArrowRight className="w-4 h-4" /> عودة إلى المكتبة
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <div className="inline-block glass rounded-full px-4 py-1.5 mb-4 text-xs text-gold-soft">
            {FIELD_LABEL[r.field]}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-3">{r.titleAr}</h1>
          <p className="text-sm text-muted-foreground italic mb-6" dir="ltr">{r.titleEn}</p>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-white/10">
            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> {r.authors}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {r.year}</span>
            <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> {r.source}</span>
          </div>

          <h2 className="font-display text-xl font-bold mb-3 text-gold-soft">الخلاصة</h2>
          <p className="text-base leading-loose mb-8">{r.summaryAr}</p>

          <h2 className="font-display text-xl font-bold mb-3 text-gold-soft">المستخلص المترجم</h2>
          <p className="text-base leading-loose mb-10">{r.abstractAr}</p>

          <div className="flex flex-wrap gap-3">
            <a href={r.readUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gold-gradient text-primary-foreground font-bold shadow-gold hover:scale-105 transition-transform">
              اقرأ النص الكامل <ExternalLink className="w-4 h-4" />
            </a>
            <a href={r.originalUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass hover:bg-white/5 transition-colors font-medium">
              المصدر الأصلي <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.article>

        {related.length > 0 && (
          <section className="mt-16">
            <h3 className="font-display text-2xl font-bold mb-6">أبحاث ذات صلة</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {related.map((x) => (
                <Link key={x.id} to="/research/$id" params={{ id: x.id }}
                  className="glass rounded-2xl p-5 hover:border-gold/40 transition-all block">
                  <div className="text-xs text-gold-soft mb-2">{FIELD_LABEL[x.field]}</div>
                  <div className="font-display font-bold leading-snug">{x.titleAr}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
