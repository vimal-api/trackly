import "./globals.css";
import Link from "next/link";
import TopBar from "./components/topbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="w-64 p-6 border-r border-white/10 hidden md:block">
            <h1 className="text-xl font-bold mb-8">Trackly</h1>
            <nav className="space-y-4 text-sm">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/applications">Applications</Link>
              <Link href="/analyze">Resume Analyzer</Link>
            </nav>
          </aside>

          {/* Main */}
          <main className="flex-1 p-6 md:p-10">
            <TopBar />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
