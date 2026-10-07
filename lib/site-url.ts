import { basePath } from './paths';
const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rajatmasanagi.in');
if (origin.hostname === 'rajatmasanagi.in' || origin.hostname === 'www.rajatmasanagi.in') origin.protocol = 'https:';
export const siteOrigin = origin.origin;
export function siteUrl(path = '/') {
  return new URL(`${basePath}${path}`, siteOrigin).toString();
}
