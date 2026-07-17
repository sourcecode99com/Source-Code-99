/**
 * Simple salt-based encryption and decryption utility.
 * This ensures API keys stored in Firestore are encrypted (not plain text)
 * for security while maintaining synchronous execution.
 */
const SECRET_SALT = "sc99_agency_secure_salt_2026_gemini";

export function encrypt(text: string): string {
  if (!text) return "";
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const saltCharCode = SECRET_SALT.charCodeAt(i % SECRET_SALT.length);
    // XOR and shift characters
    const encryptedValue = charCode ^ saltCharCode;
    result += String.fromCharCode(encryptedValue);
  }
  // Convert binary string to base64 for safe storage
  return btoa(encodeURIComponent(result));
}

export function decrypt(cipher: string): string {
  if (!cipher) return "";
  try {
    const binaryStr = decodeURIComponent(atob(cipher));
    let result = "";
    for (let i = 0; i < binaryStr.length; i++) {
      const charCode = binaryStr.charCodeAt(i);
      const saltCharCode = SECRET_SALT.charCodeAt(i % SECRET_SALT.length);
      const decryptedValue = charCode ^ saltCharCode;
      result += String.fromCharCode(decryptedValue);
    }
    return result;
  } catch (error) {
    console.error("Decryption failed:", error);
    return "";
  }
}
