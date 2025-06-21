import { creator } from '@/constant';

export async function SendMessageGemini(prompt: string) {
  const normalized = prompt.toLowerCase().trim();

  if (normalized.includes('alif dwi rahman')) {
    return `AI Assistant ini dibuat oleh ${creator.name}, seorang ${creator.role}. ${creator.bio}\n\n🔗 GitHub: ${creator.socials.github}\n🌐 Portfolio: ${creator.socials.portfolio}\n💼 LinkedIn: ${creator.socials.linkedIn}`;
  }

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  try {
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
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    console.log('data:', data);

    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return 'Maaf, saya tidak bisa menghasilkan jawaban saat ini.';
    }
  } catch (error) {
    console.error('Error:', error);
    return 'Terjadi kesalahan saat menghubungi Gemini API.';
  }
}
