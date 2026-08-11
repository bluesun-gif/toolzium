// lib/utils/ats-parser.ts
const TECH_DICTIONARY = [
  "javascript", "typescript", "react", "next.js", "node.js", "python", "java", "c++", "c#", "ruby", "php", "golang", "rust",
  "sql", "postgresql", "mysql", "mongodb", "redis", "dynamodb", "elasticsearch", "aws", "azure", "gcp", "docker", "kubernetes", 
  "terraform", "ci/cd", "jenkins", "github actions", "machine learning", "deep learning", "nlp", "pytorch", "tensorflow", 
  "data engineering", "data science", "spark", "hadoop", "kafka", "agile", "scrum", "git", "rest api", "graphql", "microservices"
];
const SYNONYMS: Record<string, string[]> = {
  "javascript": ["js", "es6"], "typescript": ["ts"], "react": ["react.js", "reactjs"], "next.js": ["nextjs", "next"],
  "node.js": ["nodejs", "node"], "machine learning": ["ml"], "ci/cd": ["ci-cd", "continuous integration"],
  "rest api": ["restful api", "rest"], "postgresql": ["postgres"], "mongodb": ["mongo"]
};
const SOFT_SKILLS = ["leadership", "communication", "teamwork", "problem solving", "analytical", "collaboration", "agile", "mentoring"];

export interface ATSResult {
  score: number; matchedSkills: string[]; missingSkills: string[];
  categories: { hardSkills: { matched: string[], missing: string[] }, softSkills: { matched: string[], missing: string[] } };
  recommendations: string[];
}

export function analyzeResume(jdText: string, resumeText: string): ATSResult {
  const jdLower = jdText.toLowerCase();
  const resumeLower = resumeText.toLowerCase();
  const jdKeywords = new Set<string>();
  
  TECH_DICTIONARY.forEach(t => { if (jdLower.includes(t)) jdKeywords.add(t); });
  SOFT_SKILLS.forEach(t => { if (jdLower.includes(t)) jdKeywords.add(t); });
  
  const matched: string[] = [], missing: string[] = [];
  jdKeywords.forEach(kw => {
    let isMatch = resumeLower.includes(kw);
    if (!isMatch && SYNONYMS[kw]) isMatch = SYNONYMS[kw].some(syn => resumeLower.includes(syn));
    if (!isMatch) {
      for (const [canonical, aliases] of Object.entries(SYNONYMS)) {
        if (aliases.includes(kw) && resumeLower.includes(canonical)) { isMatch = true; break; }
      }
    }
    isMatch ? matched.push(kw) : missing.push(kw);
  });

  let totalWeight = 0, matchedWeight = 0;
  jdKeywords.forEach(kw => {
    const weight = kw.split(" ").length * 10;
    totalWeight += weight;
    if (matched.includes(kw)) matchedWeight += weight;
  });
  
  const score = totalWeight > 0 ? Math.round((matchedWeight / totalWeight) * 100) : 0;
  const hardMatch = matched.filter(k => TECH_DICTIONARY.includes(k));
  const hardMissing = missing.filter(k => TECH_DICTIONARY.includes(k));
  const softMatch = matched.filter(k => SOFT_SKILLS.includes(k));
  const softMissing = missing.filter(k => SOFT_SKILLS.includes(k));

  const recommendations: string[] = [];
  if (hardMissing.length > 0) recommendations.push(`Add critical hard skills to your experience section: ${hardMissing.slice(0, 5).join(", ")}.`);
  if (softMissing.length > 0) recommendations.push(`Highlight soft skills like ${softMissing.slice(0, 3).join(", ")} in your summary.`);
  if (score < 50) recommendations.push("Tailor your bullet points to reflect the required technologies more explicitly.");
  if (matched.length > 0 && !resumeLower.includes("impact") && !resumeLower.includes("result")) recommendations.push("Quantify your achievements using metrics to show impact.");

  return { score, matchedSkills: matched, missingSkills: missing, categories: { hardSkills: { matched: hardMatch, missing: hardMissing }, softSkills: { matched: softMatch, missing: softMissing } }, recommendations };
}
