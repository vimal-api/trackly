'use client'

import { useEffect, useState } from 'react'
import {
  createApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} from '../lib/db/applications'

type Status = 'applied' | 'interview' | 'offer' | 'rejected'

type Application = {
  id: string
  company: string
  job_title: string
  status: Status
}

export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // form state
  const [showForm, setShowForm] = useState(false)
  const [company, setCompany] = useState('')
  const [jobTitle, setJobTitle] = useState('')

  // READ
  useEffect(() => {
    getApplications()
      .then(setApps)
      .catch(() => setError('Failed to load applications'))
      .finally(() => setLoading(false))
  }, [])

  // CREATE
  async function handleCreate() {
    if (!company || !jobTitle) return

    try {
      setAdding(true)
      setError(null)

      const newApp = await createApplication({
        company,
        job_title: jobTitle,
      })

      setApps(prev => [newApp, ...prev])
      setCompany('')
      setJobTitle('')
      setShowForm(false)
    } catch {
      setError('Failed to add application')
    } finally {
      setAdding(false)
    }
  }

  // UPDATE
  async function handleStatusChange(id: string, status: Status) {
    try {
      await updateApplicationStatus(id, status)
      setApps(prev =>
        prev.map(app =>
          app.id === id ? { ...app, status } : app
        )
      )
    } catch {
      setError('Failed to update status')
    }
  }

  // DELETE
  async function handleDelete(id: string) {
    try {
      await deleteApplication(id)
      setApps(prev => prev.filter(app => app.id !== id))
    } catch {
      setError('Failed to delete application')
    }
  }

  if (loading) return <p>Loading applications…</p>

  return (
    <div>
      <h1>Applications</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={() => setShowForm(true)}>
        Add application
      </button>

      {showForm && (
        <div style={{ margin: '16px 0' }}>
          <input
            placeholder="Company"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />

          <input
            placeholder="Job title"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
          />

          <button onClick={handleCreate} disabled={adding}>
            {adding ? 'Saving…' : 'Save'}
          </button>

          <button onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      )}

      {apps.length === 0 ? (
        <p>
          No applications yet. <br />
          Click <strong>Add application</strong> to get started.
        </p>
      ) : (
        <ul>
          {apps.map(app => (
            <li key={app.id} style={{ marginBottom: 12 }}>
              <strong>{app.company}</strong> — {app.job_title}

              <select
                value={app.status}
                onChange={e =>
                  handleStatusChange(
                    app.id,
                    e.target.value as Status
                  )
                }
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>

              <button onClick={() => handleDelete(app.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
