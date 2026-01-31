import "./globals.css";
import Link from "next/link";
import UserMenu from "./components/UserMenu";

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
              <Link href="/dashboard" className="block hover:text-[color:var(--accent)]">
                Dashboard
              </Link>
              <Link href="/applications" className="block hover:text-[color:var(--accent)]">
                Applications
              </Link>
              <Link href="/analyze" className="block hover:text-[color:var(--accent)]">
                Resume Analyzer
              </Link>
            </nav>
          </aside>

          {/* Main */}
          <main className="flex-1 p-6 md:p-10">
            <div className="flex justify-end mb-6">
              <UserMenu />
            </div>

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
