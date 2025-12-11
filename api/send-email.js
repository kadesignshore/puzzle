export const config = { runtime: "edge" };

export default async function handler(req) {
  const { email, message } = await req.json();

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "Gift Puzzle <onboarding@resend.dev>",
      to: email,
      subject: "Puzzle Solved!",
      html: `<p>${message}</p>`
    })
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
