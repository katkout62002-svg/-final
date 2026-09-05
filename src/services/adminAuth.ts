/**
 * Admin Authentication Service
 * Manages admin passcode verification, custom passcode hashing, and session management.
 */

const ADMIN_SESSION_KEY = 'be7ery_admin_session_auth_v1';
const CUSTOM_PASS_HASH_KEY = 'be7ery_admin_pass_hash_v1';
export const DEFAULT_ADMIN_PASS = 'be7ery2025';

async function sha256(str: string): Promise<string> {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyAdminPassword(inputPass: string): Promise<boolean> {
  const trimmed = inputPass.trim();
  if (!trimmed) return false;

  const storedHash = localStorage.getItem(CUSTOM_PASS_HASH_KEY);
  if (storedHash) {
    const inputHash = await sha256(trimmed);
    return inputHash === storedHash;
  }

  // Fallback to default password
  return trimmed === DEFAULT_ADMIN_PASS;
}

export async function updateAdminPassword(newPass: string): Promise<void> {
  const trimmed = newPass.trim();
  if (!trimmed || trimmed.length < 4) {
    throw new Error('يجب أن تتكون كلمة المرور من 4 أحرف أو أرقام على الأقل');
  }
  const hash = await sha256(trimmed);
  localStorage.setItem(CUSTOM_PASS_HASH_KEY, hash);
}

export function resetAdminPasswordToDefault(): void {
  localStorage.removeItem(CUSTOM_PASS_HASH_KEY);
}

export function hasCustomAdminPassword(): boolean {
  return !!localStorage.getItem(CUSTOM_PASS_HASH_KEY);
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

export function setAdminAuthenticated(authenticated: boolean): void {
  if (authenticated) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
  } else {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }
}
