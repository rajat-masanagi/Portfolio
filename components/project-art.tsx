import type { Project } from '@/lib/content';

export function ProjectArt({ kind, flow }: { kind: Project['kind']; flow?: Project['flow'] }) {
  return <div className={`project-art art-${kind}`} aria-hidden="true">
    <svg viewBox="0 0 560 350" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`grid-${kind}`} width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" stroke="currentColor" strokeOpacity=".07" /></pattern>
        <radialGradient id={`glow-${kind}`}><stop stopColor={kind === 'lunar' ? '#a1afb1' : '#9ea77a'} stopOpacity=".16"/><stop offset="1" stopColor="#111714" stopOpacity="0"/></radialGradient>
      </defs>
      <rect width="560" height="350" fill={`url(#grid-${kind})`}/><ellipse cx="280" cy="170" rx="270" ry="190" fill={`url(#glow-${kind})`}/>
      {!kind && flow && <>
        <path d="M165 175H205M355 175H395" stroke="#9ba982" strokeOpacity=".7"/>
        {flow.map((label, i) => <g key={label}><rect x={15 + i * 190} y="140" width="150" height="70" rx="4" fill="#1c251e" stroke="#84917b"/><text x={90 + i * 190} y="168" textAnchor="middle" fill="#b6bf92" fontSize="10">0{i + 1}</text><text x={90 + i * 190} y="189" textAnchor="middle" fill="#e1e2ce" fontSize="11">{label}</text></g>)}
        <text x="30" y="33" fontSize="9" fill="#b7c0a8" letterSpacing="2">FROM PROBLEM TO PRACTICE</text>
        <text x="30" y="327" fontSize="9" fill="#a7b29c" letterSpacing="1">PROJECT APPROACH</text>
      </>}
      {kind === 'booking' && <>
        <g stroke="#8e9a79" strokeOpacity=".55"><path d="M85 108H475M85 135H475M85 162H475" strokeDasharray="3 8"/><path d="M280 163V208M172 244H388"/></g>
        {Array.from({length: 13},(_,i)=><g key={i}><rect x={92+i*30} y="92" width="9" height="13" rx="4" fill="#b2ba96" opacity={.35+(i%3)*.2}/><rect x={92+i*30} y="122" width="9" height="13" rx="4" fill="#b2ba96" opacity=".35"/></g>)}
        <rect x="210" y="150" width="140" height="44" rx="3" fill="#1c251e" stroke="#9ba982"/><text x="280" y="177" textAnchor="middle" fill="#e1e2ce" fontSize="12" letterSpacing="2">ADMISSION QUEUE</text>
        {[100,230,360].map((x,i)=><g key={x}><rect x={x} y="221" width="100" height="49" rx="3" fill="#141d18" stroke="#63715b"/><text x={x+50} y="250" textAnchor="middle" fill="#c5ccba" fontSize="11">{['Reserve','Hold','Checkout'][i]}</text></g>)}
        <text x="30" y="33" fontSize="9" fill="#b7c0a8" letterSpacing="2">01 / CONCURRENT BY DESIGN</text><text x="30" y="327" fontSize="9" fill="#a7b29c" letterSpacing="1">REQUEST → RESERVATION → CONFIRMATION</text>
      </>}
      {kind === 'lunar' && <>
        {Array.from({length:10},(_,i)=><path key={i} d={`M-30 ${135+i*20} C65 ${40+i*18}, 132 ${245+i*8}, 230 ${130+i*16} S370 ${100+i*24},590 ${55+i*23}`} stroke="#8b9a9b" strokeOpacity={.17+i*.025}/>)}
        <ellipse cx="350" cy="126" rx="63" ry="35" transform="rotate(-22 350 126)" stroke="#a1adab" strokeOpacity=".5"/><ellipse cx="350" cy="126" rx="43" ry="24" transform="rotate(-22 350 126)" stroke="#a1adab" strokeOpacity=".3"/>
        <path d="M109 243L166 215L212 231L255 188L288 178L310 216L376 189L429 149" stroke="#d0d9b1" strokeWidth="2" strokeDasharray="5 5"/>
        <circle cx="109" cy="243" r="5" fill="#d0d9b1"/><circle cx="429" cy="149" r="5" fill="#d0d9b1"/><circle cx="429" cy="149" r="13" stroke="#d0d9b1" strokeOpacity=".4"/>
        <text x="30" y="33" fontSize="9" fill="#bdc7c5" letterSpacing="2">02 / A PATH THROUGH THE UNKNOWN</text><text x="30" y="327" fontSize="9" fill="#b3c1bd" letterSpacing="1">TERRAIN → HAZARDS → PLANNED ROUTE</text>
      </>}
      {kind === 'workflow' && <>
        <g stroke="#a2ac93" strokeOpacity=".65"><path d="M145 170H205Q220 170 220 155V110H285M220 170V230H285M380 110H410V170H443M380 230H410V170"/><circle cx="220" cy="170" r="4" fill="#a2ac93"/></g>
        <rect x="45" y="145" width="100" height="50" rx="4" fill="#1f2821" stroke="#84917b"/><text x="95" y="174" textAnchor="middle" fill="#dce0d1" fontSize="12">Your intent</text>
        {[85,205].map((y,i)=><g key={y}><rect x="285" y={y} width="95" height="50" rx="4" fill="#1d2622" stroke="#7b8974"/><text x="332" y={y+30} textAnchor="middle" fill="#dce0d1" fontSize="12">{i===0?'Research':'Compose'}</text></g>)}
        <circle cx="464" cy="170" r="22" fill="#283425" stroke="#a7b38c"/><path d="m455 170 6 6 12-13" stroke="#d7dfc4" strokeWidth="2"/>
        <text x="30" y="33" fontSize="9" fill="#b7c0a8" letterSpacing="2">03 / IDEAS, CONNECTED</text><text x="30" y="327" fontSize="9" fill="#a7b29c" letterSpacing="1">PROMPT → WORKFLOW → EXECUTION</text>
      </>}
    </svg>
    <span className="art-caption">Concept diagram</span>
  </div>;
}
