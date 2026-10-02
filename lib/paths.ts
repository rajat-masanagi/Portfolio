/** Prefix static assets for project sites such as /Portfolio on GitHub Pages. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export function assetPath(path: string) {
  return `${basePath}${path}`;
}
