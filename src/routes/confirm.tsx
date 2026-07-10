import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { CheckCircle2, XCircle, Clock, BookOpen } from "lucide-react";

const searchSchema = z.object({
  status: fallback(z.enum(["ok", "already", "expired", "invalid"]), "invalid").default("invalid"),
});

export const Route = createFileRoute("/confirm")({
  validateSearch: zodValidator(searchSchema),
  component: ConfirmPage,
  head: () => ({
    meta: [
      { title: "تأكيد الاشتراك — مِحراب" },
      { name: "description", content: "حالة تأكيد الاشتراك في نشرة مِحراب البريدية." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/confirm" }],
  }),
});

const STATES = {
  ok: { icon: CheckCircle2, title: "تمّ تأكيد اشتراكك", text: "أهلاً بك في قافلة العلم. ستصلك النشرة الأولى قريباً.", color: "text-emerald-400" },
  already: { icon: CheckCircle2, title: "أنت مشترك مسبقاً", text: "بريدك مؤكّد من قبل — لا حاجة لأي إجراء.", color: "text-emerald-400" },
  expired: { icon: Clock, title: "انتهت صلاحية الرابط", text: "أعد المحاولة من الصفحة الرئيسية للحصول على رابط جديد.", color: "text-amber-400" },
  invalid: { icon: XCircle, title: "رابط غير صالح", text: "لم نتمكّن من التحقّق من هذا الرابط.", color: "text-rose-400" },
} as const;

function ConfirmPage() {
  const { status } = Route.useSearch();
  const s = STATES[status as keyof typeof STATES];
  const Icon = s.icon;
  return (
    <main className="min-h-screen bg-hero grid place-items-center px-6">
      <div className="glass rounded-3xl p-10 max-w-md w-full text-center">
        <Icon className={`w-16 h-16 mx-auto mb-6 ${s.color}`} />
        <h1 className="font-display text-3xl font-bold mb-3">{s.title}</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">{s.text}</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gold-gradient text-primary-foreground font-bold shadow-gold">
          <BookOpen className="w-4 h-4" /> العودة إلى المكتبة
        </Link>
      </div>
    </main>
  );
}
