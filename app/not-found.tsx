import Link from 'next/link';
import { Header, Footer } from '@/components/site';
export default function NotFound(){return <div className="painted-content" id="top"><Header/><main id="main" className="not-found"><p className="eyebrow">404 / Off the beaten path</p><h1>A different direction.</h1><p>This page isn’t here. There’s still plenty to explore back at the portfolio.</p><Link href="/" className="text-link">Return to the landscape <span aria-hidden="true">↗</span></Link></main><Footer/></div>}
