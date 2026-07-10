import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const SITE_NAME = "مِحراب";
const FROM_EMAIL = "onboarding@resend.dev"; // بدّلها بنطاقك المُتحقّق منه في Resend

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function makeToken() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function sendResend(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY missing");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ from: `${SITE_NAME} <${FROM_EMAIL}>`, to, subject, html }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Resend error", res.status, text);
    throw new Error("email_send_failed");
  }
}

export const Route = createFileRoute("/api/public/subscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { email?: string };
          const email = String(body.email || "").trim().toLowerCase();
          if (!emailRe.test(email) || email.length > 254) {
            return Response.json({ error: "invalid_email" }, { status: 400 });
          }

          const supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            { auth: { persistSession: false } },
          );

          // إن كان مؤكّداً مسبقاً — استجب بنجاح دون إرسال
          const { data: existing } = await supabase
            .from("newsletter_subscribers")
            .select("id, confirmed")
            .eq("email", email)
            .maybeSingle();

          if (existing?.confirmed) {
            return Response.json({ status: "already_confirmed" });
          }

          const token = makeToken();
          const expires = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();

          const { error: upErr } = await supabase
            .from("newsletter_subscribers")
            .upsert(
              {
                email,
                confirm_token: token,
                token_expires_at: expires,
                confirmed: false,
              },
              { onConflict: "email" },
            );
          if (upErr) {
            console.error(upErr);
            return Response.json({ error: "db_error" }, { status: 500 });
          }

          const origin = new URL(request.url).origin;
          const confirmUrl = `${origin}/api/public/subscribe/confirm?token=${token}`;

          await sendResend(
            email,
            `${SITE_NAME} — أكّد اشتراكك`,
            `<div dir="rtl" style="font-family:Tajawal,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#ffffff;color:#0f172a">
              <h1 style="color:#c9a24a;font-size:24px;margin:0 0 16px">أهلاً بك في ${SITE_NAME}</h1>
              <p style="line-height:1.8">شكراً لاهتمامك بأبحاثنا العلمية المترجمة. اضغط الزرّ أدناه لتأكيد اشتراكك في النشرة الأسبوعية.</p>
              <p style="text-align:center;margin:32px 0">
                <a href="${confirmUrl}" style="display:inline-block;background:linear-gradient(135deg,#c9a24a,#8a6a2a);color:#ffffff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:700">تأكيد الاشتراك</a>
              </p>
              <p style="font-size:12px;color:#64748b">إن لم تطلب هذا الاشتراك يمكنك تجاهل الرسالة، وسينتهي الرابط تلقائياً خلال 24 ساعة.</p>
            </div>`,
          );

          return Response.json({ status: "confirmation_sent" });
        } catch (e) {
          console.error(e);
          return Response.json({ error: "server_error" }, { status: 500 });
        }
      },
    },
  },
});
