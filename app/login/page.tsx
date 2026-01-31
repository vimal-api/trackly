"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in


  const handleLogin = async () => {
    if (!email || !password) {
      setError("Enter email and password");
      return;
    }
useEffect
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Auto sign-up if user doesn't exist
    if (error?.message.includes("Invalid login credentials")) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      setLoading(false);

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      router.replace("/dashboard");
      return;
    }

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    setLoading(false);
    router.replace("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1020] via-[#121a3a] to-[#0b1020]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome to Trackly</h1>
        <p className="text-center text-sm text-muted mb-6">
          Login or create an account to continue
        </p>

        {error && (
          <p className="text-sm text-red-400 text-center mb-4">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-[color:var(--accent)] transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-[color:var(--accent)] transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[color:var(--accent)] hover:opacity-90 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Login / Sign up"}
          </button>
        </div>

        <p className="text-xs text-center text-muted mt-6">
          By continuing, you agree to Trackly’s terms.
        </p>
      </div>
    </div>
  );
}
