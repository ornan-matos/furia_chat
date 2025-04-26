export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;

  const GROK_API_KEY = process.env.GROK_API_KEY;

  // Substitua a URL abaixo pela da API grok-3-mini
  const response = await fetch('https://api.grok.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROK_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "grok-3-mini",
      messages: [
        { role: "system", content: "Você é um bot da FURIA para fãs de CS." },
        { role: "user", content: message },
      ]
    }),
  });

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content ?? "Desculpe, não entendi!";
  res.status(200).json({ reply });
}
