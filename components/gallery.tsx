'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { GalleryImage } from '@/lib/content';

export function Gallery({ images, label, compact = false }: { images: GalleryImage[]; label: string; compact?: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [atEnd, setAtEnd] = useState(images.length <= 1);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    function update() {
      if (!el) return;
      const closest = Array.from(el.children).reduce((best, child, i) => Math.abs((child as HTMLElement).offsetLeft - el.scrollLeft) < Math.abs((el.children[best] as HTMLElement).offsetLeft - el.scrollLeft) ? i : best, 0);
      setCurrent(closest);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    }
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener('scroll', update);
    return () => { observer.disconnect(); el.removeEventListener('scroll', update); };
  }, [images.length]);
  if (!images.length) return null;
  function move(index: number) {
    const slide = track.current?.children[index] as HTMLElement | undefined;
    if (slide) track.current?.scrollTo({ left: slide.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <section className={`gallery${compact ? " gallery-compact" : ""}`} aria-label={label}>
    <div className="gallery-heading"><div><p className="eyebrow">{label}</p>{compact && <p className="gallery-note">A collection of milestones. Select a certificate to take a closer look.</p>}</div><div className="gallery-controls">
      <button type="button" aria-label={`Previous image in ${label}`} disabled={current === 0} onClick={() => move(current - 1)}>←</button>
      <span aria-live="polite" aria-atomic="true">{current + 1} / {images.length}</span>
      <button type="button" aria-label={`Next image in ${label}`} disabled={atEnd} onClick={() => move(current + 1)}>→</button>
    </div></div>
    <div className="gallery-track" ref={track}>
      {images.map((photo, index) => <figure className="gallery-slide" key={photo.src}>
        <button type="button" className="gallery-image" aria-label={`Enlarge ${photo.alt}`} onClick={event => { trigger.current = event.currentTarget; setSelected(photo); dialog.current?.showModal(); }}>
          <Image src={photo.src} alt={photo.alt} width={1200} height={850} sizes={compact ? "(max-width: 640px) 75vw, 330px" : "(max-width: 640px) 90vw, 800px"} />
        </button>
        <figcaption>{photo.kind && <span className="eyebrow">{photo.kind} · </span>}{photo.caption || photo.alt}<span className="sr-only"> Image {index + 1} of {images.length}</span></figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className="image-viewer" aria-label={`${label}: enlarged image`} onClose={() => trigger.current?.focus()} onKeyDown={event => {
      if (event.key === 'Tab') {
        event.preventDefault();
        dialog.current?.querySelector<HTMLButtonElement>('.viewer-close')?.focus();
      }
    }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <button type="button" className="viewer-close" autoFocus onClick={() => dialog.current?.close()}>Close ×</button>
      {selected && <figure><Image src={selected.src} alt={selected.alt} width={1600} height={1200} sizes="95vw" /><figcaption>{selected.kind && `${selected.kind} · `}{selected.caption || selected.alt}</figcaption></figure>}
    </dialog>
  </section>;
}
