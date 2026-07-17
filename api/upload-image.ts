// Vercel Serverless Function: POST /api/upload-image
// Proxies image uploads to Cloudflare Images so the API token never
// reaches the browser. Client sends a base64 data URL (already compressed
// client-side via browser-image-compression); this function decodes it,
// forwards it to Cloudflare, and returns the public delivery URL.

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    return res.status(500).json({ error: 'Cloudflare Images belum dikonfigurasi di server.' });
  }

  try {
    const { image, filename } = req.body || {};

    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'Data gambar tidak ditemukan.' });
    }

    const match = image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
    if (!match) {
      return res.status(400).json({ error: 'Format gambar tidak valid.' });
    }

    const mimeType = match[1];
    const buffer = Buffer.from(match[2], 'base64');

    const form = new FormData();
    form.append('file', new Blob([buffer], { type: mimeType }), filename || `upload-${Date.now()}.jpg`);

    const cfResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        body: form,
      }
    );

    const data = await cfResponse.json();

    if (!data.success) {
      console.error('Cloudflare Images upload failed:', JSON.stringify(data.errors));
      return res.status(502).json({ error: 'Gagal mengunggah gambar ke Cloudflare Images.', details: data.errors });
    }

    const variants: string[] = data.result?.variants || [];
    const publicUrl = variants.find((v) => v.endsWith('/public')) || variants[0];

    if (!publicUrl) {
      return res.status(502).json({ error: 'Cloudflare tidak mengembalikan URL gambar.' });
    }

    return res.status(200).json({ url: publicUrl, id: data.result.id });
  } catch (err: any) {
    console.error('upload-image error:', err);
    return res.status(500).json({ error: err.message || 'Terjadi kesalahan tak terduga.' });
  }
}
