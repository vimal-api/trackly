"use client";

import { useState } from "react";
import RequireAuth from "../lib/requireAuth";

export default function AnalyzePage() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume, jd }),
    });
    setResult(await res.json());
  };

  return (
    <RequireAuth>
      <h1 className="text-3xl font-bold mb-6">Resume Analyzer</h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <textarea
          className="border p-3 rounded"
          placeholder="Paste resume"
          value={resume}
          onChange={e => setResume(e.target.value)}
        />
        <textarea
          className="border p-3 rounded"
          placeholder="Paste job description"
          value={jd}
          onChange={e => setJd(e.target.value)}
        />
      </div>

      <button
        onClick={analyze}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Analyze
      </button>

      {result && (
        <pre className="bg-white p-4 rounded shadow mt-4">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </RequireAuth>
  );
}
