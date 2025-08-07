// pages/test.jsx
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function PagesRouterTest() {
  return (
    <div className={inter.className}>
      {/* 1. Head 组件测试 */}
      <Head>
        <title>Pages Router Test</title>
        <meta name="description" content="EdgeOne Pages Test" />
      </Head>

      {/* 2. Font 组件测试 */}
      <h1>Pages Router Components</h1>

      {/* 3. Form 组件测试 */}
      <form action="/api/submit" method="POST">
        <input type="text" name="test" defaultValue="Form test" />
        <button type="submit">Submit</button>
      </form>

      {/* 4. Image 组件测试 */}
      <Image
        src="/next.svg"
        alt="Test Image"
        width={300}
        height={200}
        placeholder="blur"
        blurDataURL="data:image/png;base64,..."
      />

      {/* 5. Link 组件测试 */}
      <Link href="/about">
        To About
      </Link>

      {/* 6. Script 组件测试 */}
      <Script
        src="/script.js"
        strategy="lazyOnload"
        onLoad={() => console.log('Pages Script loaded')}
      />
    </div>
  );
}