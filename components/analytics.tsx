'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const measurementId = 'G-L9DXP162B3';
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  useEffect(() => {
    function trackClick(event: MouseEvent) {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (!link) return;
      const eventName = link.hasAttribute('download') ? 'resume_download' : link.protocol === 'mailto:' ? 'contact_click' : null;
      if (eventName) window.gtag?.('event', eventName);
    }
    document.addEventListener('click', trackClick);
    return () => document.removeEventListener('click', trackClick);
  }, []);
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
  </>;
}
