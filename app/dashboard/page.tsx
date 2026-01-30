"use client";

import { useEffect, useState } from "react";
import RequireAuth from "../lib/requireAuth";

type Status = "Applied" | "Interview" | "Offer";
type App = { status: Status };

export default function DashboardPage() {
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("trackly_apps");
    if (stored) setApps(JSON.parse(stored));
  }, []);

  const count = (s: Status) => apps.filter(a => a.status === s).length;

  const applied = count("Applied");
  const interview = count("Interview");
  const offer = count("Offer");
  const max = Math.max(applied, interview, offer, 1);

  return (
    <RequireAuth>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Applied" value={applied} color="blue" />
          <StatCard title="Interview" value={interview} color="yellow" />
          <StatCard title="Offer" value={offer} color="green" />
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Applications Overview</h2>

          <svg width="100%" height="160">
            <Bar x={40} value={applied} max={max} label="Applied" color="#3b82f6" />
            <Bar x={140} value={interview} max={max} label="Interview" color="#facc15" />
            <Bar x={240} value={offer} max={max} label="Offer" color="#22c55e" />
          </svg>
        </div>
      </div>
    </RequireAuth>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: "blue" | "yellow" | "green";
}) {
  const colors = {
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
    green: "bg-green-500",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <p className="text-gray-600">{title}</p>
      <span
        className={`text-white px-3 py-1 rounded-full ${colors[color]}`}
      >
        {value}
      </span>
    </div>
  );
}

function Bar({
  x,
  value,
  max,
  label,
  color,
}: {
  x: number;
  value: number;
  max: number;
  label: string;
  color: string;
}) {
  const height = (value / max) * 100;

  return (
    <>
      <rect
        x={x}
        y={120 - height}
        width={40}
        height={height}
        fill={color}
        rx={6}
      />
      <text x={x + 20} y={135} textAnchor="middle" fontSize="12">
        {label}
      </text>
      <text x={x + 20} y={120 - height - 5} textAnchor="middle" fontSize="12">
        {value}
      </text>
    </>
  );
}
