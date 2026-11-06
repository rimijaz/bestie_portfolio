import Link from 'next/link';

export default function NotFound() {
  return <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 32, background: '#111a1b', color: '#f3f0e8', textAlign: 'center' }}>
    <div><p style={{ color: '#c9f36a', fontFamily: 'monospace', letterSpacing: '.12em' }}>404 / NOT FOUND</p><h1 style={{ fontSize: 'clamp(48px, 9vw, 110px)', margin: '20px 0', letterSpacing: '-.07em' }}>This path needs<br /><i style={{ color: '#c9f36a', fontFamily: 'Georgia, serif', fontWeight: 400 }}>a retest.</i></h1><Link href="/" style={{ color: '#111516', background: '#c9f36a', padding: '14px 18px', display: 'inline-block', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: 12 }}>Return home ↗</Link></div>
  </main>;
}
