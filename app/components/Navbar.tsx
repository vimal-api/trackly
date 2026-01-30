"use client";

import Link from "next/link";
import { logout } from "../lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Trackly
        </Link>

        <div className="flex gap-4 items-center">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/applications">Applications</Link>
          <Link href="/analyze">Analyze</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
