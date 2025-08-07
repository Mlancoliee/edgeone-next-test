import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Rendering Modes</h1>
      <ul>
        <li><Link href="/ssr-page">SSR</Link></li>
        <li><Link href="/isr-page">ISR</Link></li>
        <li><Link href="/ssg-page">SSG</Link></li>
      </ul>
    </div>
  );
}