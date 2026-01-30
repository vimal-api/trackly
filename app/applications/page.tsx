"use client";

import { useEffect, useState } from "react";
import RequireAuth from "../lib/requireAuth";

type Status = "Applied" | "Interview" | "Offer";

type Application = {
  id: string;
  company: string;
  role: string;
  status: Status;
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Status>("Applied");

  // Load apps
  useEffect(() => {
    const stored = localStorage.getItem("trackly_apps");
    if (stored) setApplications(JSON.parse(stored));
  }, []);

  // Save apps
  useEffect(() => {
    localStorage.setItem("trackly_apps", JSON.stringify(applications));
  }, [applications]);

  const addApplication = () => {
    if (!company || !role) return;

    setApplications([
      ...applications,
      {
        id: crypto.randomUUID(),
        company,
        role,
        status,
      },
    ]);

    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  const deleteApplication = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const updateStatus = (id: string, newStatus: Status) => {
    setApplications(
      applications.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <RequireAuth>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Applications</h1>

        {/* Add Application */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex gap-4">
          <input
            className="border p-2 rounded-lg flex-1"
            placeholder="Company"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
          <input
            className="border p-2 rounded-lg flex-1"
            placeholder="Role"
            value={role}
            onChange={e => setRole(e.target.value)}
          />
          <select
            className="border p-2 rounded-lg"
            value={status}
            onChange={e => setStatus(e.target.value as Status)}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
          </select>
          <button
            onClick={addApplication}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* List */}
        {applications.length === 0 && (
          <p className="text-gray-500">No applications yet.</p>
        )}

        <div className="space-y-3">
          {applications.map(app => (
            <div
              key={app.id}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{app.company}</p>
                <p className="text-sm text-gray-600 mb-1">{app.role}</p>

                {/* Status dropdown */}
                <select
                  value={app.status}
                  onChange={e =>
                    updateStatus(app.id, e.target.value as Status)
                  }
                  className={`border px-2 py-1 rounded-lg text-sm font-medium ${
                    app.status === "Applied"
                      ? "bg-blue-50 text-blue-700"
                      : app.status === "Interview"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                </select>
              </div>

              <button
                onClick={() => deleteApplication(app.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </RequireAuth>
  );
}
