import { createFileRoute, redirect } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const SITE_NAME = "مِحراب";
const FROM_EMAIL = "onboarding@resend.dev";

async function sendWelcome(to: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from: `${SITE_NAME} <${FROM_EMAIL}>`,
      to,
      subject: `${SITE_NAME} — أهلاً بك في قافلة العلم`,
      html: `<div dir="rtl" style="font-family:Tajawal,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#ffffff;color:#0f172a">
        <h1 style="color:#c9a24a;font-size:26px;margin:0 0 16px">أهلاً بك في ${SITE_NAME} 🌿</h1>
        <p style="line-height:1.9">تمّ تأكيد اشتراكك بنجاح. ستصلك كلّ أسبوع خلاصةٌ منتقاة من أحدث الأبحاث العلمية المترجمة إلى العربية.</p>
        <p style="line-height:1.9">نبدأ معك بمكتبةٍ تضمّ أبحاثاً في الطب، الفيزياء، علوم الحاسوب، وعلوم الأعصاب — كلّها متاحة للقراءة مجاناً.</p>
        <p style="margin-top:32px;color:#64748b;font-size:13px">— فريق ${SITE_NAME}</p>
      </div>`,
    }),
  }).catch((e) => console.error("welcome email failed", e));
}

export const Route = createFileRoute("/api/public/subscribe/confirm")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const token = url.searchParams.get("token");
        const origin = url.origin;
        if (!token) throw redirect({ to: "/confirm", search: { status: "invalid" } });

        const supabase = createClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
          { auth: { persistSession: false } },
        );

        const { data: row } = await supabase
          .from("newsletter_subscribers")
          .select("id, email, confirmed, token_expires_at")
          .eq("confirm_token", token)
          .maybeSingle();

        if (!row) {
          return Response.redirect(`${origin}/confirm?status=invalid`, 302);
        }
        if (row.confirmed) {
          return Response.redirect(`${origin}/confirm?status=already`, 302);
        }
        if (row.token_expires_at && new Date(row.token_expires_at) < new Date()) {
          return Response.redirect(`${origin}/confirm?status=expired`, 302);
        }

        await supabase
          .from("newsletter_subscribers")
          .update({
            confirmed: true,
            confirmed_at: new Date().toISOString(),
            confirm_token: null,
            token_expires_at: null,
          })
          .eq("id", row.id);

        await sendWelcome(row.email);

        return Response.redirect(`${origin}/confirm?status=ok`, 302);
      },
    },
  },
});
