import RequireAuth from "../lib/requireAuth";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted mt-1">
            Track your applications and analyze resumes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <p className="text-muted text-sm">Applications</p>
            <p className="text-4xl font-bold mt-2">12</p>
          </div>

          <div className="card p-6">
            <p className="text-muted text-sm">Interviews</p>
            <p className="text-4xl font-bold mt-2">3</p>
          </div>

          <div className="card p-6">
            <p className="text-muted text-sm">Resume Score</p>
            <p className="text-4xl font-bold mt-2">—</p>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
          <div className="flex gap-4">
            <a href="/applications" className="btn-primary">
              Add Application
            </a>
            <a href="/analyze" className="btn-primary">
              Analyze Resume
            </a>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
