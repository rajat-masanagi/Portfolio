import type { MetadataRoute } from 'next';
import { allProjects } from '@/lib/content';
import { siteUrl } from '@/lib/site-url';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl('/') }, ...allProjects.map(project => ({ url: siteUrl(`/projects/${project.slug}/`) }))];
}
