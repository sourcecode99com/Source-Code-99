import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface AIArticleResponse {
  title: string;
  content: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
  coverImagePrompt: string;
  contentImagePrompt: string;
}

export async function generateArticle(keyword: string): Promise<AIArticleResponse> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Buatkan artikel SEO Friendly tentang "${keyword}". 
    
    Gunakan gaya bahasa santai-formal yang 'ngobrol' dengan pembaca Indonesia. 
    Hindari paragraf panjang yang membosankan. 
    Pastikan ada alur masalah-solusi-manfaat. 
    Masukkan brand/Website sourcecode99.com secara halus di tengah dan akhir artikel sebagai solusi.
    Gunakan Human-First SEO Protocol untuk menulis artikel ini.

    Format Output:
    - Gunakan HTML tags (<h2>, <h3>, <p>, <ul>, <li>, <strong>, dll) untuk konten.
    - Jangan gunakan tag <h1> di dalam konten (karena judul sudah ada di field terpisah).
    - Pastikan alur pembaca nyaman dan informatif.
    - Berikan juga prompt bahasa inggris yang sangat deskriptif untuk generate image AI dengan gaya "google nano banana" (modern, clean, high-tech, vibrant) untuk Cover Image dan satu Content Image. Pastikan prompt mencerminkan topik "${keyword}" dan brand "Source Code 99".`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING, description: "HTML content for the article body" },
          excerpt: { type: Type.STRING },
          seoTitle: { type: Type.STRING },
          metaDescription: { type: Type.STRING },
          coverImagePrompt: { type: Type.STRING, description: "Descriptive English prompt for AI image generation (Cover)" },
          contentImagePrompt: { type: Type.STRING, description: "Descriptive English prompt for AI image generation (Content)" }
        },
        required: ["title", "content", "excerpt", "seoTitle", "metaDescription", "coverImagePrompt", "contentImagePrompt"]
      }
    }
  });

  const data = JSON.parse(response.text);
  
  // Inject the content image into the content at a strategic position (after the first H2 or second paragraph)
  const contentImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(data.contentImagePrompt)}?width=1080&height=720&nologo=true`;
  const imageHtml = `<figure class="my-8"><img src="${contentImageUrl}" alt="${data.title}" class="rounded-2xl w-full shadow-lg" referrerPolicy="no-referrer" /><figcaption class="text-center text-sm text-slate-500 mt-2 italic">Visualisasi: ${data.title}</figcaption></figure>`;
  
  // Find the first </h2> to insert after it, or after the second </p>
  if (data.content.includes('</h2>')) {
    data.content = data.content.replace('</h2>', '</h2>' + imageHtml);
  } else {
    const paragraphs = data.content.split('</p>');
    if (paragraphs.length > 2) {
      paragraphs[1] = paragraphs[1] + '</p>' + imageHtml;
      data.content = paragraphs.join('</p>');
    } else {
      data.content += imageHtml;
    }
  }

  return data;
}

export async function rewriteArticle(content: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Rewrite the following article to be more engaging and SEO-friendly while maintaining the core message. Language: Indonesian.\n\n${content}`,
  });

  return response.text;
}

export async function generateOutline(topic: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a detailed blog post outline for the topic: "${topic}". Language: Indonesian.`,
  });

  return response.text;
}

export async function generateWeeklyTopics(niche: string): Promise<string[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate 7 high-quality, SEO-friendly blog post topics for the niche: "${niche}". 
    Language: Indonesian. 
    Topics should be engaging, trend-based, and relevant for a tech agency blog.
    Return ONLY a JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  return JSON.parse(response.text);
}
