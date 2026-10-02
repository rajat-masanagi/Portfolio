import type { Metadata } from 'next';
import { assetPath } from '@/lib/paths';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allProjects } from '@/lib/content';
import { Header, Footer, Arrow } from '@/components/site';
import { ProjectArt } from '@/components/project-art';
import { Gallery } from '@/components/gallery';
export const dynamicParams = false;
export function generateStaticParams() { return allProjects.map(({slug})=>({slug})); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const {slug}=await params; const project=allProjects.find(p=>p.slug===slug);
  if(!project) return { title: 'Project not found' };
  return { title: project.title, description: project.description, openGraph: { title: project.title, description: project.description, type: 'article', images: [{url:assetPath(['event-booking', 'lunar-navigation', 'workflow-generator'].includes(project.slug) ? `/images/social-${project.slug}.jpg` : '/images/social-preview.jpg'),width:1200,height:630,alt:project.title}] } };
}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const index=allProjects.findIndex(p=>p.slug===slug); if(index===-1) notFound();
  const project=allProjects[index]; const next=allProjects[(index+1)%allProjects.length];
  return <div className="painted-content case-page" id="top"><Header/><main id="main" className="shell">
    <div className="case-heading"><Link href="/#work" className="back-link">← Back to selected work</Link><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p className="case-description">{project.description}</p>
      {project.stack.length > 0 && <div className="case-tags" aria-label="Technology stack">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div>}
      {project.repositoryUrl && <div className="profile-links"><a className="text-link" href={project.repositoryUrl}>GitHub repository <Arrow/></a><a className="text-link" href={`${project.repositoryUrl}#readme`}>Read the README <Arrow/></a></div>}
      {project.repositoryNote && <p className="repository-note">{project.repositoryNote}</p>}
    </div>
    {project.images?.length ? <Gallery images={project.images} label={`${project.title} screenshots`}/> : (project.kind || project.flow) && <figure className="case-art"><ProjectArt kind={project.kind} flow={project.flow}/><figcaption>Conceptual illustration of the project approach, not a product screenshot.</figcaption></figure>}
    <div className="case-body">
      {project.problem && <section className="case-block"><h2>The problem</h2><p>{project.problem}</p></section>}
      {!!project.features?.length && <section className="case-block"><h2>Features</h2><ul className="case-list">{project.features.map(feature=><li key={feature}>{feature}</li>)}</ul></section>}
      {project.contribution && <section className="case-block"><h2>My contribution</h2><p>{project.contribution}</p></section>}
      {project.approach.length > 0 && <section className="case-block"><h2>The approach</h2><div>{project.approach.map((item,i)=><div className="approach-item" key={item.title}><p className="eyebrow">0{i+1}</p><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section>}
      {project.setup && <section className="case-block"><h2>Getting started</h2><pre className="setup-instructions">{project.setup}</pre></section>}
      {(project.results.length > 0 || project.outcome) && <section className="case-block"><h2>The outcome</h2><div>{project.results.length > 0 && <div className="results-grid">{project.results.map(result=><div key={result.label}><div className="result-value">{result.value}</div><div className="result-label">{result.label}</div></div>)}</div>}{project.outcome && <p>{project.outcome}</p>}</div></section>}
      <Link href={`/projects/${next.slug}/`} className="next-project"><div><p className="eyebrow">Next exploration</p><h2>{next.shortTitle}</h2></div><span aria-hidden="true">↗</span></Link>
    </div>
  </main><Footer/></div>;
}
