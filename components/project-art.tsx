import Image from 'next/image';
import { assetPath } from '@/lib/paths';
import type { Project } from '@/lib/content';

function Node({ x, y, title, subtitle, wide = false }: { x: number; y: number; title: string; subtitle: string; wide?: boolean }) {
  const width = wide ? 144 : 112;
  return <g transform={`translate(${x} ${y})`}><rect width={width} height="58" rx="7" fill="#1b251e" stroke="#7d8b6a" strokeOpacity=".8"/><path d="M12 15h13m-13 5h9" stroke="#b6bf92"/><text x="12" y="36" fill="#e5e7d9" fontSize="11">{title}</text><text x="12" y="49" fill="#a4af99" fontSize="8">{subtitle}</text><circle cx="0" cy="29" r="3" fill="#b6bf92"/><circle cx={width} cy="29" r="3" fill="#b6bf92"/></g>;
}
export function ProjectArt({ kind, flow }: { kind: Project['kind']; flow?: Project['flow'] }) {
  if (kind === 'lunar') return <div className="project-art art-lunar" aria-hidden="true"><Image src={assetPath('/images/lunar-terrain.webp')} alt="" fill sizes="(max-width: 640px) 100vw, 50vw" className="lunar-terrain"/><span className="terrain-label">02 / Lunar surface</span><span className="art-caption">Concept illustration</span></div>;
  return <div className={`project-art art-${kind || 'overview'}`} aria-hidden="true">
    <svg viewBox="0 0 560 350" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id={`dots-${kind || flow?.[0]}`} width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="#a3b18d" opacity=".16"/></pattern></defs>
      <rect width="560" height="350" fill="#141d18"/><rect width="560" height="350" fill={`url(#dots-${kind || flow?.[0]})`}/>
      {kind === 'workflow' ? <>
        <text x="28" y="32" fill="#b6bf92" fontSize="9" letterSpacing="2">03 / IDEAS, CONNECTED</text>
        <g stroke="#8d9e77" strokeWidth="1.4"><path d="M142 174C185 174 166 97 210 97M142 174H210M354 174C389 174 379 97 414 97M354 174C389 174 379 251 414 251"/><path d="M250 203V242M314 203V242" strokeDasharray="3 5"/></g>
        <Node x={30} y={145} title="Your intent" subtitle="Prompt & context"/><Node x={210} y={68} title="Research" subtitle="Web & documents" wide/><Node x={210} y={145} title="Agent workflow" subtitle="Coordinate the task" wide/><Node x={414} y={68} title="Outreach" subtitle="Compose & deliver"/><Node x={414} y={222} title="Response" subtitle="Structured output"/>
        {[250,314].map((x,i)=><g key={x}><circle cx={x} cy="261" r="19" fill="#202b21" stroke="#697c5a"/><path d={i ? `M${x-7} 255h14v12h-14zM${x-3} 251v4` : `M${x-7} 261h14M${x} 254v14M${x-5} 256l10 10M${x+5} 256l-10 10`} stroke="#bdc6a5"/><text x={x} y="298" textAnchor="middle" fontSize="8" fill="#a4af99">{i?'Context':'Model'}</text></g>)}
      </> : kind === 'booking' ? <>
        <text x="28" y="32" fill="#b6bf92" fontSize="9" letterSpacing="2">01 / BUILT FOR THE RUSH</text>
        <g stroke="#83946c" strokeWidth="1.3"><path d="M105 136C150 136 130 174 176 174M105 174H176M105 212C150 212 130 174 176 174M320 174H347V96H380M347 174H380M347 174V252H380"/></g>
        {[116,154,192].map((y,i)=><g key={y}><rect x="35" y={y} width="70" height="28" rx="4" fill="#243022" stroke="#7d8b6a"/><path d={`M51 ${y+7}v14M58 ${y+9}h32M58 ${y+15}h24`} stroke="#b6bf92" opacity=".8"/><circle cx="105" cy={y+14} r="3" fill="#b6bf92"/><text x="25" y={y+18} textAnchor="end" fill="#78856b" fontSize="8">0{i+1}</text></g>)}
        <Node x={176} y={145} title="Admission queue" subtitle="Controlled concurrency" wide/><Node x={380} y={67} title="Reserve" subtitle="Seat availability"/><Node x={380} y={145} title="Hold" subtitle="Temporary reservation"/><Node x={380} y={223} title="Checkout" subtitle="Confirm the booking"/>
        <g stroke="#627254" strokeDasharray="3 5"><path d="M248 203v54H348"/></g><text x="181" y="282" fill="#a4af99" fontSize="9" letterSpacing="1">ORDER UNDER LOAD</text>
      </> : flow && <><path d="M165 175H205M355 175H395" stroke="#9ba982"/>{flow.map((label,i)=><g key={label}><rect x={15+i*190} y="140" width="150" height="70" rx="4" fill="#1c251e" stroke="#84917b"/><text x={90+i*190} y="168" textAnchor="middle" fill="#b6bf92" fontSize="10">0{i+1}</text><text x={90+i*190} y="189" textAnchor="middle" fill="#e1e2ce" fontSize="11">{label}</text></g>)}</>}
    </svg><span className="art-caption">Concept diagram</span>
  </div>;
}
