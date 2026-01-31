export function analyzeResume(resume: string, jd: string) {
  const sections = ['experience', 'education', 'skills', 'projects']

  const foundSections = sections.filter(section =>
    resume.toLowerCase().includes(section)
  )

  const jdWords = jd.toLowerCase().split(/\s+/)
  const resumeText = resume.toLowerCase()

  const keywordHits = jdWords.filter(word =>
    resumeText.includes(word)
  )

  const score =
    foundSections.length * 15 +
    Math.min(keywordHits.length, 40)

  return {
    score: Math.min(score, 100),
    keywordMatch: keywordHits.length,
    missingSections: sections.filter(
      s => !foundSections.includes(s)
    ),
  }
}
