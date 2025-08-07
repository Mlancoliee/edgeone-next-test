import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>App Router Test Verified</h1>
      <Link href="/about">To About</Link>
      <br />
      <Link href="/component">To Component</Link>
    </>
  );
}
