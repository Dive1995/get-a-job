export interface JobApplicationModel {
  coverLetter: string;

  company: {
    name: string;
    address?: string;
    about?: string;
    highlights?: string[];
  };

  candidate?: {
    candidate_name?: string;
    current_status?: string;
    keySkillsInCV?: string[];
  };

  resumeOptimization: {
    summary: string;
    keywordsToAdd: string[];
    experienceAlignment: string;
    skillGapAnalysis: string;
    cvImprovementSuggestions: string[];
    optimizedResume: string;
  };

  atsAnalysis: {
    score: number;
    issues: string[];
    recommendations: string[];
    keySkillsRequired: string[];
  };

  positionAlignment: {
    fitLevel: "Strong Fit" | "Moderate Fit" | "Low Fit";
    matchedResponsibilities: string[];
    unmatchedResponsibilities: string[];
    overallComment: string;
  };

  interviewPreparation: {
    likelyQuestions: string[];
    answersTips: string[];
    strengthsToHighlight: string[];
    weaknessesToHandle: string[];
  };

  jobTrackingMeta: {
    company: string;
    jobTitle: string;
    location: string;
    languageRequirement:
      | "German"
      | "English"
      | "German & English"
      | "German / English";
    applicationStatus: string; // Consider changing this to a literal type if it's always "notApplied"
    appliedDate: string; // Format: "YYYY-MM-DD"
  };
}
