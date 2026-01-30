"use client";

import { useRouter } from "next/navigation";
import { login } from "../lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    login();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Trackly</h1>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
