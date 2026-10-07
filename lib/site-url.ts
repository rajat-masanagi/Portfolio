import { basePath } from './paths';
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'https://rajatmasanagi.in';
export function siteUrl(path = '/') {
  return new URL(`${basePath}${path}`, siteOrigin).toString();
}
