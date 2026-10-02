import Link from 'next/link';
import { Arrow } from './icons';
export { Arrow } from './icons';
export function Header({ home = false }: { home?: boolean }) {
  return <header className={`site-header ${home ? 'on-hero' : ''}`}>
    <Link href="/" className="wordmark" aria-label="Rajat Masanagi home">rm<span>.</span></Link>
    <nav aria-label="Main navigation">{['Work','Experience','About','Contact'].map(item=><Link key={item} href={`${home ? '' : '/'}#${item.toLowerCase()}`}>{item}</Link>)}</nav>
    <span className="header-note">Mumbai, India <span className="status-dot" /></span>
  </header>;
}
export function SectionHeading({ number, label, title, children }: { number: string; label: string; title: string; children?: React.ReactNode }) {
  return <div className="section-heading"><div><p className="eyebrow"><span>{number}</span> {label}</p><h2>{title}</h2></div>{children}</div>;
}
export function Footer() {
  return <footer className="footer shell"><Link href="/" className="wordmark">rm<span>.</span></Link><p>Rajat Masanagi <span>Copyright {new Date().getFullYear()}</span></p><a href="#top">Back to top <Arrow direction="up"/></a></footer>;
}
