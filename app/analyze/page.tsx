'use client'

import { useState } from 'react'
import { analyzeResume } from '@/app/lib/analyze/resume'

export default function AnalyzePage() {
  const [resume, setResume] = useState('')
  const [jd, setJd] = useState('')
  const [result, setResult] = useState<any>(null)

  return (
    <div>
      <p style={{ color: 'red', fontWeight: 'bold' }}>
  DEPLOY CHECK — SHOULD SEE THIS
</p>

      <h1 className="text-2xl font-semibold mb-6">Resume Analyzer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setResult(analyzeResume(resume, jd))}
      >
        Analyze
      </button>

      {result && (
        <div className="mt-6 border rounded p-4">
          <p><strong>Score:</strong> {result.score}%</p>
          <p><strong>Keyword matches:</strong> {result.keywordMatch}</p>
          <p>
            <strong>Missing sections:</strong>{' '}
            {result.missingSections.join(', ') || 'None'}
          </p>
        </div>
      )}
    </div>
  )
}
