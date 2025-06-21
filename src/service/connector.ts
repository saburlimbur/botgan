export async function SendMessageGemini(propmt: string) {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: propmt,
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();

  console.log('data:', data);

  if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
    return data?.candidates?.[0]?.content?.parts?.[0]?.text;
  } else {
    return 'Error generating response';
  }
}
