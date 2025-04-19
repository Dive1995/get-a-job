import { useState } from "react";
import { generateJobDetails } from "../lib/jobDetails";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useNavigate } from "react-router-dom";
import { JobApplicationAnalysis } from "../lib/JobApplicationAnalysis";
import { toast } from "sonner";

function NewApplicationPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const [cv, setCv] = useState<string | null>(null);
  // const [jobDescription, setJobDescription] = useState<string | null>(null);

  const cv = `"Diveshan Thavarasa

  // Master Student of Software Engineering for Industrial Applications

  // Address: Luitpoldstraße 37	Email: [diveshan.thavarasa@gmail.com](https://www.google.com/url?sa=E&q=mailto%3Adiveshan.thavarasa%40gmail.com)

  // 95028 Hof, Germany		Github: [https://github.com/Dive1995](https://www.google.com/url?sa=E&q=https%3A%2F%2Fgithub.com%2FDive1995)

  // Birthdate: 04.11.1995		Portfolio: [https://diveshan.netlify.app/](https://www.google.com/url?sa=E&q=https%3A%2F%2Fdiveshan.netlify.app%2F)

  // Nationality: Sri Lankan		LinkedIn: [https://www.linkedin.com/in/diveshan/](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fdiveshan%2F)

  // Phone: +49 162 2924574

  // Education

  // 10/2024 – Present

  // MEng Software Engineering for Industrial Applications

  // Hof University of Applied Sciences, Hof, Germany

  // 02/2018 – 08/2022	   BSc Hons in Computer Science & Technology

  // Uva Wellassa University, Badulla, Sri Lanka

  // Work Experience

  // 12/2022 – 08/2024

  // Associate Software Engineer

  // i-Wonder Sri Lanka, Colombo, Sri Lanka

  // [Angular, .NET core, REST API, MongoDB, SQL, Azure CI/CD]

  // Resolved critical performance bottleneck by optimizing Angular event propagation, reducing page load times by over 50% and improving user experience.

  // Developed comprehensive keyboard navigation across four websites, significantly enhancing accessibility and achieving full WCAG 2.0 compliance.

  // Implemented responsive design, ensuring seamless user experience across mobile, tablet, and desktop devices.

  // 02/2022 – 12/2022

  // Associate Software Engineer

  // Virtusa Pvt. Ltd, Colombo, Sri Lanka

  // [Azure SQL, Azure Logic apps]

  // Automated the manual process of assigning employees to skill channels in MS Teams using Azure services, resulting in a time savings of over 100 hours per month and eliminating errors in employee allocation.

  // Projects

  // 03/2024 - 07/2024

  // Food Corner Cafe

  // [React, Express, MongoDB, Stripe, Auth0, Shadecn, Socket.io]

  // Developed a user-friendly web platform enabling customers to order food, make payments, and track order statuses in real-time.

  // Optimized real-time order updates and notifications using Socket.io, enhancing user engagement and experience.

  // Built a robust admin dashboard for the cafe to manage the menu, monitor orders, and update statuses efficiently.

  // [https://www.foodcornercafe.com/](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.foodcornercafe.com%2F)

  // Skills

  // Language

  // IT Skills

  // English - Advanced (C1), German - Intermediate (B1), Tamil – Native

  // JavaScript, TypeScript, Angular, React, Express, C#,.NET core, Azure CI/CD, REST API, Socket.io, Git

  // Diveshan Thavarasa

  // 15.04.2025

  // "`;

  const jobDescription = `
  //     LichtBlick SE · Hamburg, Germany (Hybrid)

  //     Working Student (gn) Frontend Software Development at ison

  //     Your Job

  // You will support in designing and delivering the frontends for a solution that serves as a foundation for connected and decarbonized energy solutions in the German market
  // With your expertise in technical solutions, you will provide support to the team on the optimal feasibility of implementation
  // You will collaborate closely with the backend development team to ensure that the system APIs are utilized correctly
  // You will contribute to writing high-quality, self-documenting code using test-driven development methods
  // You will assist in testing and debugging processes, including unit and UI tests

  // Your Skills

  // You are currently enrolled in a degree program in computer science, business informatics, or a comparable field
  // You have a minimum of 1-2 years of experience in Frontend Development and are proficient in common Javascript frameworks like React
  // You care about quality and writing clean, maintainable code in Typescript/React
  // You have experience with responsive design and a mobile-first approach
  // Knowledge in Material UI (or other UI libraries) is a plus
  // You are familiar with Git and CI/CD pipelines
  // You possess excellent problem-solving and analytical skills, and you are forward-thinking
  // You have strong and positive communication skils
  // Fluent English is a must, and fluent German is a plus
  // Additionally, you have the ability to come to our Hamburg office at least once a week`;

  const prompt = `CV: ${cv}
Job description: ${jobDescription}
based on the CV and Job description, Generate a complete JSON object strictly following the schema below. Do not return the schema, only a fully filled JSON that follows the given schema. Do not include explanations, comments, or partial structures.
"{
"type": "object",
"properties": {
"coverLetter": {
"type": "string",
"description": "A personalized cover letter generated based on the CV and Job Description, shouldn't sound like generic. If skills are transferable with previous experiences and skill mention them."
},
"candidate": {
"candidate_name": { "type": "string" },,
"current_status": { "type": "string" },
"keySkillsInCV": {
"type": "array",
"items": { "type": "string" },
"description": "Key skills detected in the CV"
},
},
"resumeOptimization": {
"type": "object",
"description": "Suggestions and improvements to the resume for this job based on the job description",
"properties": {
"summary": { "type": "string" },
"keywordsToAdd": {
"type": "array",
"items": { "type": "string" }
},
"experienceAlignment": {
"type": "string"
},
"skillGapAnalysis": {
"type": "string"
},
"cvImprovementSuggestions": {
"type": "array",
"items": { "type": "string" },
"description": "List of general improvements to make the CV better"
},
"optimizedResume": {
"type": "string",
"description": "A rewritten version of the resume tailored to the job description based on the cvImprovementSuggestions"
}
}
},
"atsAnalysis": {
"type": "object",
"description": "ATS (Applicant Tracking System) compatibility analysis",
"properties": {
"score": {
"type": "number",
"description": "Score out of 100"
},
"issues": {
"type": "array",
"items": { "type": "string" }
},
"recommendations": {
"type": "array",
"items": { "type": "string" }
},
"keySkillsRequired": {
"type": "array",
"items": { "type": "string" },
"description": "Key skills required based on the job description"
}
}
},
"positionAlignment": {
"type": "object",
"description": "Assessment of candidate's alignment with the job role",
"properties": {
"fitLevel": {
"type": "string",
"enum": ["Strong Fit", "Moderate Fit", "Low Fit"]
},
"matchedResponsibilities": {
"type": "array",
"items": { "type": "string" }
},
"unmatchedResponsibilities": {
"type": "array",
"items": { "type": "string" }
},
"overallComment": {
"type": "string",
"description": "General summary of how well the CV fits the position"
}
}
},
"interviewPreparation": {
"type": "object",
"description": "Personalized guidance for interview preparation based on CV and Job description",
"properties": {
"likelyQuestions": {
"type": "array",
"items": { "type": "string" }
},
"answersTips": {
"type": "array",
"items": { "type": "string" }
},
"strengthsToHighlight": {
"type": "array",
"items": { "type": "string" }
},
"weaknessesToHandle": {
"type": "array",
"items": { "type": "string" }
}
}
},
"jobTrackingMeta": {
"type": "object",
"description": "Information for tracking this job application",
"properties": {
"company": { "type": "string" },
"jobTitle": { "type": "string" },
"location": { "type": "string" },
"languageRequirement":
{
"type": "enum",
"enum": ["German", "English", "German & English", "German / English"]
"description": "Check whether English and/or Language are mentioned with levels next to the enum value if mentioned"
},
"applicationStatus": {
"type": "string",
"value": "notApplied"
},
"appliedDate": { "type": "string", "format": "date" },
"notes": { "type": "string" }
}
}
},
"required": [
"coverLetter",
"resumeOptimization",
"atsAnalysis",
"positionAlignment",
"interviewPreparation",
"jobTrackingMeta"
]
}"
`;

  const generateJobApplication = async () => {
    setLoading(true);
    const response = await generateJobDetails(prompt);

    // for await (const chunk of response) {
    //   console.log(chunk.text);
    // }

    console.log("Response ", response.text);
    setLoading(false);

    if (response.text) {
      localStorage.setItem("AIresponse", response.text || "");
      const index = saveResponse(response.text);
      navigate(`/application/${index}`);
    } else {
      toast("Failed to Generate response, try again!!");
    }
  };

  const saveResponse = (response: string) => {
    const data = localStorage.getItem("allApplications") || "[]";
    const allApplications: JobApplicationAnalysis[] = JSON.parse(data);

    allApplications.push(JSON.parse(response));

    localStorage.setItem("allApplications", JSON.stringify(allApplications));
    return allApplications.length - 1;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <span className="text-4xl animate-ping">✨</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 my-4">
      <h2 className="text-4xl font-bold">
        <span className="mr-2">✨</span>
        <span className="bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          New Job Application
        </span>
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="">
          <Label className="text-gray-600 text-lg mb-2" htmlFor="cv">
            CV
          </Label>
          <Textarea
            className="bg-gray-50 h-[400px]"
            placeholder="📋 Paste your CV here."
            id="cv"
            // onChange={(e) => setCv(e.target.value)}
          />
        </div>
        <div className="">
          <Label className="text-gray-600 mb-2 text-lg" htmlFor="jobDesc">
            Job description
          </Label>
          <Textarea
            className="bg-gray-50 h-[400px]"
            placeholder="📋 Paste your Job description here."
            id="jobDesc"
            // onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      <Button
        onClick={generateJobApplication}
        className={`my-4 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:opacity-90 transition duration-300`}
        // disabled={cv == null && jobDescription == null}
      >
        Generate
      </Button>
    </div>
  );
}

export default NewApplicationPage;
