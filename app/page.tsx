import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Trackly</h1>

      <ul style={{ marginTop: 16 }}>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/applications">Applications</Link></li>
        <li><Link href="/analyze">Analyze</Link></li>
      </ul>
    </main>
  );
}
