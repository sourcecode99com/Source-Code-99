import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import imageCompression from 'browser-image-compression';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')    // Remove all non-word chars
    .replace(/--+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')         // Trim - from start of text
    .replace(/-+$/, '');        // Trim - from end of text
}

/**
 * Validates if a string is a valid base64 data URL
 */
export function isValidBase64(str: string): boolean {
  if (!str || typeof str !== 'string') return false;
  const regex = /^data:image\/(png|jpeg|jpg|webp);base64,/;
  return regex.test(str);
}

/**
 * Safely converts base64 to File
 */
export function base64ToFile(base64: string, filename: string): File {
  try {
    const arr = base64.split(',');
    if (arr.length < 2) throw new Error('Invalid base64 format');
    
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    console.error('Error converting base64 to file:', error);
    throw new Error('Gagal mengonversi gambar.');
  }
}

/**
 * Compresses an image file
 */
export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    fileType: 'image/jpeg' as string,
  };
  
  try {
    const compressedBlob = await imageCompression(file, options);
    return new File([compressedBlob], file.name, { type: 'image/jpeg' });
  } catch (error) {
    console.error('Compression error:', error);
    return file; // Return original if compression fails
  }
}
