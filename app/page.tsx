import { Cross } from '@/components/icons';
import Image from 'next/image';
import { assetPath } from '@/lib/paths';
import Link from 'next/link';
import { Header, Footer, SectionHeading, Arrow } from '@/components/site';
import { ProjectArt } from '@/components/project-art';
import { projects, experience, additionalProjects, skills, problemSolving, profiles, education, achievements, certificates, certificateFolderUrl, publication } from '@/lib/content';
import { Gallery } from '@/components/gallery';
function ProfileLinks() { return <div className="profile-links"><a className="text-link" href={profiles.github}>GitHub <Arrow/></a><a className="text-link" href={profiles.linkedin}>LinkedIn <Arrow/></a></div>; }
export default function Home() {
  return <><div id="top"/><Header home/><main id="main">
    <section className="hero" aria-labelledby="hero-title">
      <Image src={assetPath("/images/landscape.webp")} alt="An oil-pastel landscape of a blue-grey sky above moss-green hills, fading into charcoal shadows." fill priority sizes="100vw" className="hero-image"/>
      <div className="hero-shade"/>
      <div className="hero-title"><p className="eyebrow">A practice in curiosity</p><h1 id="hero-title">Rajat Masanagi</h1><p className="hero-subtitle">Software Developer</p></div>
      <div className="hero-bottom"><p>Thoughtful systems.<br/>Real-world possibilities.</p><a href="#work" className="scroll-cue"><span>Scroll to explore</span><span className="scroll-line"/></a><p>Mumbai, India<br/><span>Always exploring.</span></p></div>
    </section>
    <div className="painted-content">
      <section id="work" className="section shell work-section">
        <SectionHeading number="01" label="Selected work" title="Ideas, made tangible."><p>A few explorations at the intersection<br className="desktop-break"/> of engineering, intelligence, and impact.</p></SectionHeading>
        <div className="project-grid">{projects.map((project,i)=><article key={project.slug} className="project-card"><Link href={`/projects/${project.slug}/`}>{project.images?.length ? <Image className="project-cover" src={assetPath(project.images[0].src)} alt={project.images[0].alt} width={800} height={500}/> : (project.kind || project.flow) && <ProjectArt kind={project.kind} flow={project.flow}/>}<div className="project-meta"><span>0{i+1} / {project.category}</span><Arrow/></div><h3>{project.shortTitle}</h3><p>{project.description}</p><span className="project-link">Explore project <Arrow/></span></Link>{project.repositoryUrl && <a className="text-link repository-link" href={project.repositoryUrl}>GitHub repository <Arrow/></a>}</article>)}</div>
      </section>
      <section id="experience" className="section shell">
        <SectionHeading number="02" label="Experience" title="Grounded in the real world."><p>Learning by building.<br/>From research to everyday operations.</p></SectionHeading>
        <div className="experience-list">{experience.map(job=><article className="experience-row" key={job.company}><div className="experience-date"><span>{job.period}</span><span>{job.place}</span></div><div><div className="job-heading"><h3>{job.company}</h3><span>{job.role}</span></div><p>{job.summary}</p>{job.highlights.length>0&&<ul>{job.highlights.map(text=><li key={text}>{text}</li>)}</ul>}{job.images && <Gallery images={job.images} label={`${job.company} photos`}/>}</div></article>)}</div>
      </section>
      <section className="section shell" id="explorations">
        <SectionHeading number="03" label="Further explorations" title="Curiosity takes many forms."><p>More experiments, prototypes,<br/>and problems worth working on.</p></SectionHeading>
        <div className="archive">{additionalProjects.map(item=><details key={item.title}><summary><h3>{item.title}</h3><span className="archive-category">{item.category}</span><span className="details-toggle" aria-hidden="true"><Cross/></span></summary><p>{item.description}</p><div className="archive-links"><Link className="text-link" href={`/projects/${item.slug}/`}>Explore project <Arrow/></Link>{item.repositoryUrl && <a className="text-link" href={item.repositoryUrl}>GitHub repository <Arrow/></a>}</div></details>)}</div>
      </section>
      <section id="about" className="section shell about-section">
        <div><p className="eyebrow"><span>04</span> A little about me</p><h2>Driven by curiosity.<br/>Grounded in craft.</h2><p className="about-intro">I’m Rajat, a software developer in Mumbai. I build thoughtful software that makes complex problems more approachable.</p><p>My work spans operational tools, intelligent workflows, computer vision, and geospatial systems. I enjoy moving between disciplines—and turning what I learn into something useful.</p><ProfileLinks/><a href={assetPath("/Rajat-Masanagi-Resume.pdf")} download className="text-link">Download résumé <Arrow direction="down"/></a></div>
        <div className="about-details"><div className="education"><p className="eyebrow">Education</p>{education.map(item=><article className="education-entry" key={item.school}><h3>{item.school}</h3><p>{item.qualification}<br/>{item.period} · {item.place}</p>{item.detail && <p>{item.detail}</p>}<span className="grade">{item.grade}</span>{item.coursework && <div className="coursework"><h4>Relevant coursework</h4><p>{item.coursework.join(' · ')}</p></div>}</article>)}</div></div>
      </section>
      <section id="skills" className="section shell skills-section" aria-labelledby="skills-title">
        <div className="section-heading"><div><p className="eyebrow"><span>05</span> Skills</p><h2 id="skills-title">Tools of the craft.</h2></div></div>
        <div className="skills-grid">{skills.map(skill=><div className="skill-group" key={skill.title}><h3>{skill.title}</h3><p>{skill.items}</p></div>)}<div className="skill-group"><h3>Problem solving</h3><p>{problemSolving}</p><div className="profile-links"><a className="text-link" href={profiles.leetcode}>LeetCode <Arrow/></a><a className="text-link" href={profiles.codolio}>Codolio · All profiles <Arrow/></a></div></div></div>
      </section>
      <section className="section shell recognition"><SectionHeading number="06" label="Along the way" title="A few meaningful milestones."/><div className="recognition-grid">{achievements.map(item=><div key={item.title}><span className="large-stat">{item.value}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div><div className="certificates">{certificates.length > 0 && <Gallery images={certificates} label="Achievements & participation" compact/>}<a className="text-link" href={certificateFolderUrl}>View certificates on Google Drive <Arrow/></a></div><article className="publication"><div><p className="eyebrow">Published research · {publication.date}</p><h3><a href={publication.url}>{publication.title}</a></h3></div><div><p>{publication.summary}</p><span>{publication.journal}</span><a className="text-link" href={publication.url}>Read publication <Arrow/></a></div></article></section>
      <section id="contact" className="contact section shell"><p className="eyebrow">The next chapter</p><h2>Good things start<br/>with a conversation.</h2><a className="contact-link" href="mailto:r.masanagi26@gmail.com">r.masanagi26@gmail.com <Arrow/></a><ProfileLinks/><p>For interesting problems, thoughtful collaborations,<br/>or simply a hello.</p></section>
      <Footer/>
    </div>
  </main></>;
}
