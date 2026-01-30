import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    score: 72,
    matchedSkills: ["JavaScript", "React"],
    missingSkills: ["System Design"],
  });
}

