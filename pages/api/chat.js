import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROK_API_KEY,
  baseURL: "https://api.x.ai/v1", // endpoint do X.AI
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo Não Permitido!' });
  }

  const { message } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "grok-3-mini", // ou grok-3-beta se desejar o modelo beta
      messages: [
        { role: "system", content: "Você é um bot da FURIA para fãs de CS." },
        { role: "user", content: message },
      ]
    });

    const reply = completion.choices?.[0]?.message?.content ?? "Desculpe, não entendi!";
    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Erro ao se conectar ao Chat da FURIA." });
  }
}
