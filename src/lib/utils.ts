export function slugify(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}
export function safeUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  // Allow only public image assets hosted by this portfolio (not arbitrary relative paths).
  if (/^\/images\/[a-zA-Z0-9/_-]+\.(?:png|jpe?g|webp|gif|svg)$/i.test(url)) return url;
  try { const u = new URL(url); return ['http:', 'https:'].includes(u.protocol) ? u.href : undefined; }
  catch { return undefined; }
}
export function isVideo(url: string): boolean { return /\.(mp4|webm|mov)(\?|$)/i.test(url); }
export function formatDate(): string { return new Date().getFullYear().toString(); }
