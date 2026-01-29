import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function bad(res, status, message) {
  res.status(status).json({ error: message });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return bad(res, 405, "Method not allowed");

  const { systemPrompt, userPrompt } = req.body || {};
  if (typeof systemPrompt !== "string" || systemPrompt.trim().length < 10) {
    return bad(res, 400, "Missing/invalid systemPrompt");
  }
  if (typeof userPrompt !== "string" || userPrompt.trim().length < 5) {
    return bad(res, 400, "Missing/invalid userPrompt");
  }

  // Basic safety guard: avoid accidental mega-prompts
  const MAX_CHARS = 120000;
  const sys = systemPrompt.slice(0, MAX_CHARS);
  const usr = userPrompt.slice(0, MAX_CHARS);

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const temperature = Number(process.env.OPENAI_TEMPERATURE ?? "0.9");
  const max_tokens = Number(process.env.OPENAI_MAX_TOKENS ?? "4000");

  try {
    const completion = await openai.chat.completions.create({
      model,
      temperature,
      max_tokens,
      messages: [
        { role: "system", content: sys },
        { role: "user", content: usr }
      ]
    });

    const text = completion?.choices?.[0]?.message?.content ?? "";
    if (!text) return bad(res, 502, "Empty model response");

    res.status(200).json({ text });
  } catch (err) {
    const msg = err?.message || "Unknown error";
    res.status(500).json({ error: msg });
  }
}
