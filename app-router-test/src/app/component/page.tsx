import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export default function AppRouterTest() {
  return (
    <main className={inter.className}>
      {/* 1. Font 组件测试 */}
      <h1>Font Component Test</h1>
      <p>This text uses @next/font</p>

      {/* 2. Form 组件测试 */}
      <form action="/api/submit" method="POST">
        <input type="text" name="test" defaultValue="Form test" />
        <button type="submit">Submit</button>
      </form>

      {/* 3. Image 组件测试 */}
      <Image
        src="/next.svg"
        alt="Test Image"
        width={300}
        height={200}
        priority
      />

      {/* 4. Link 组件测试 */}
      <Link href="/about" prefetch={false}>
        Go to Pages Router Test
      </Link>

      {/* 5. Script 组件测试 */}
      <Script
        src="/script.js"
        strategy="afterInteractive"
        // onLoad={() => console.log('Script loaded')}
      />
    </main>
  );
}