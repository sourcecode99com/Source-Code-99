// Vercel Serverless Function: POST /api/upload-image
// Uploads images to Cloudflare R2 (S3-compatible object storage) so the R2
// credentials never reach the browser. Client sends a base64 data URL
// (already compressed client-side via browser-image-compression); this
// function decodes it, signs an S3 PUT request with aws4fetch, and returns
// the public delivery URL served via the R2 bucket's custom domain.

import { AwsClient } from 'aws4fetch';

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

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
    return res.status(500).json({ error: 'Cloudflare R2 belum dikonfigurasi di server.' });
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

    const extFromMime = mimeType.split('/')[1]?.replace('jpeg', 'jpg') || 'jpg';
    const safeBase = (filename || `upload-${Date.now()}`).replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `${Date.now()}-${safeBase.includes('.') ? safeBase : `${safeBase}.${extFromMime}`}`;

    const client = new AwsClient({
      accessKeyId,
      secretAccessKey,
      service: 's3',
      region: 'auto',
    });

    const endpoint = `https://${accountId}.r2.cloudflarestorage.com/${bucketName}/${key}`;

    const putResponse = await client.fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': mimeType },
      body: buffer,
    });

    if (!putResponse.ok) {
      const details = await putResponse.text().catch(() => '');
      console.error('R2 upload failed:', putResponse.status, details);
      return res.status(502).json({ error: 'Gagal mengunggah gambar ke Cloudflare R2.', details });
    }

    const finalUrl = `${publicUrl.replace(/\/$/, '')}/${key}`;

    return res.status(200).json({ url: finalUrl, key });
  } catch (err: any) {
    console.error('upload-image error:', err);
    return res.status(500).json({ error: err.message || 'Terjadi kesalahan tak terduga.' });
  }
}
