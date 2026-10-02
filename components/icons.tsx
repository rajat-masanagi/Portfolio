type Direction = 'up-right' | 'up' | 'down' | 'left' | 'right';
const rotations: Record<Direction, number> = { 'up-right': -45, up: -90, down: 90, left: 180, right: 0 };
export function Arrow({ direction = 'up-right' }: { direction?: Direction }) {
  return <span className="ui-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" focusable="false"><path d="M5 12h14m-7-7 7 7-7 7" transform={`rotate(${rotations[direction]} 12 12)`} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>;
}
export function Cross({ close = false }: { close?: boolean }) {
  return <span className="ui-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" focusable="false"><path d="M5 12h14M12 5v14" transform={close ? 'rotate(45 12 12)' : undefined} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></span>;
}
