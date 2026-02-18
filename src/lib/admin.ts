/**
 * Zero-Auth Admin 검증
 * URL의 ?key= 파라미터가 환경변수 ADMIN_SECRET과 일치하는지 확인합니다.
 */
export function isAdminKey(key: string | null): boolean {
  if (!key) return false;
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  // timing-safe comparison (기본적인 보안)
  if (key.length !== secret.length) return false;
  let mismatch = 0;
  for (let i = 0; i < key.length; i++) {
    mismatch |= key.charCodeAt(i) ^ secret.charCodeAt(i);
  }
  return mismatch === 0;
}
