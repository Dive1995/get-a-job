import { GoogleGenAI } from "@google/genai";

// export async function main() {
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});
const config = {
  responseMimeType: "application/json",
};
const model = "gemini-2.0-flash";

export const generateJobDetails = (prompt: string) =>
  ai.models.generateContent({
    model,
    config,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You have expertises as ATS Resume Specialist, Job Application Consultant, Professional Resume Writer. Based on my CV and the Job description, Generate me a complete JSON object strictly following the schema below. Do not return the schema, only a fully filled JSON that follows the given schema. Do not include explanations, comments, or partial structures.

CV: "Diveshan Thavarasa

Master Student of Software Engineering for Industrial Applications

Address: Luitpoldstraße 37	Email: diveshan.thavarasa@gmail.com

95028 Hof, Germany		Github: https://github.com/Dive1995

Birthdate: 04.11.1995		Portfolio: https://diveshan.netlify.app/

Nationality: Sri Lankan		LinkedIn: https://www.linkedin.com/in/diveshan/

Phone: +49 162 2924574

Education

10/2024 – Present

MEng Software Engineering for Industrial Applications

Hof University of Applied Sciences, Hof, Germany

02/2018 – 08/2022	   BSc Hons in Computer Science & Technology

Uva Wellassa University, Badulla, Sri Lanka

Work Experience

12/2022 – 08/2024

Associate Software Engineer

i-Wonder Sri Lanka, Colombo, Sri Lanka

[Angular, .NET core, REST API, MongoDB, SQL, Azure CI/CD]

Resolved critical performance bottleneck by optimizing Angular event propagation, reducing page load times by over 50% and improving user experience.

Developed comprehensive keyboard navigation across four websites, significantly enhancing accessibility and achieving full WCAG 2.0 compliance.

Implemented responsive design, ensuring seamless user experience across mobile, tablet, and desktop devices.

02/2022 – 12/2022

Associate Software Engineer

Virtusa Pvt. Ltd, Colombo, Sri Lanka

[Azure SQL, Azure Logic apps]

Automated the manual process of assigning employees to skill channels in MS Teams using Azure services, resulting in a time savings of over 100 hours per month and eliminating errors in employee allocation.

Projects

03/2024 - 07/2024

Food Corner Cafe

[React, Express, MongoDB, Stripe, Auth0, Shadecn, Socket.io]

Developed a user-friendly web platform enabling customers to order food, make payments, and track order statuses in real-time.

Optimized real-time order updates and notifications using Socket.io, enhancing user engagement and experience.

Built a robust admin dashboard for the cafe to manage the menu, monitor orders, and update statuses efficiently.

https://www.foodcornercafe.com/

Skills

Language

IT Skills

English - Advanced (C1), German - Intermediate (B1), Tamil – Native

JavaScript, TypeScript, Angular, React, Express, C#,.NET core, Azure CI/CD, REST API, Socket.io, Git

Diveshan Thavarasa

15.04.2025

Job description: "
W11K GmbH,  Stuttgart, Baden-Württemberg, Germany

position: WORKING STUDENT WEB DEVELOPMENT (M/F/D)

YOUR TASKS

Maintenance of our websites: You will support the further development and maintenance of our self-developed websites w11k.de and thecodecampus.de. These are built using modern technologies such as React and the headless CMS Storyblok and Angular, respectively.
Implementation of internal web applications: You develop internal web applications using Angular or React and contribute to optimizing our internal processes.
You will become part of a team of several working students who work together in an agile manner.

THAT DISTINGUISHES YOU

You are an enrolled student in a suitable field, e.g., computer science, business informatics, or media informatics.
You already have knowledge of React or Angular and are ready to expand on it.
Experience with content management systems, Java or databases is a plus, but not a requirement.
You are willing to familiarize yourself with new technologies.
You are characterized by your ability to work in a team, your commitment, and your enjoyment of independent work.
You have very good German and good English skills."

Schema:
"{
"type": "object",
"properties": {
"coverLetter": {
"type": "string",
"description": "A personalized cover letter generated based on my CV and Job Description in English, shouldn't sound like generic. Begin the cover letter with a specific reference to the job title or company. Mention key skills and notable accomplishments that align with the job requirements, Detailing these specifics demonstrates my qualifications and the tangible value i bring. Illustrate my alignment with the company's values by mentioning my admiration for their work or ethos. If skills are transferable with previous experiences and skill blend them. Ensure the formatting is clean, professional, and ATS-friendly. The tone should be professional yet engaging, within one page (250-400 words). Note: don
t explicitly add the contents from the resume, try to reconstruct it a bit."
},
"company": {
"type": "object",
"description": "Search on the internet about the company mentioned in the job description with the location, and provide the following data",
"name": "string",
"address": "string",
"about": {
"type": "string",
"description": "What does the company do, whats their vision and mission, what are there latest projects"
},
"highlights": {
"type": "array",
"description": "key points about the company that i can mention in the cover letter to get the recruiters attention"
}
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
"description": "Suggestions and improvements to the resume for this job based on the job description which should be ATS friendly",
"properties": {
"summary": { "type": "string" },
"keywordsToAdd": {
"type": "array",
"items": { "type": "string" },
"description": "provide the ATS friendly key words suggestions to add, based on job description"
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
"description": "A rewritten version of the resume tailored to the job description in English, Highlight experiences and skills that align closely with the job description. Where possible, add numbers to your achievements to show impact, Integrate keywords from the job description into the resume for better ATS (but make sure to blend in with candidates existing experience). Focus on the skills most relevant to the job. Using the existing experience try to add one or two new expereince derived from them"
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
"description": "skills or responsibilities that didn't fit with my CV"
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
"items": { "type": "string", "description": "answers / tips for the likelyQuestions" }
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
"enum": ["Not mentioned", "German", "English", "German & English", "German / English"]
"description": "Check whether English and/or Language are mentioned with levels next to the enum value if mentioned"
},
"applicationStatus": {
"type": "string",
"value": "notApplied"
},
"appliedDate": { "value": null },
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
}
"`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `\`\`\`json
{
  "coverLetter": "Dear Hiring Team,\\n\\nI am writing to express my keen interest in the Working Student Web Development (M/F/D) position at W11K GmbH, as advertised. With my ongoing Master's studies in Software Engineering for Industrial Applications at Hof University and my practical experience in web development using technologies like Angular and React, I am confident I possess the skills and enthusiasm to contribute significantly to your team.\\n\\nDuring my tenure as an Associate Software Engineer at i-Wonder Sri Lanka, I honed my front-end expertise by optimizing Angular event propagation, resulting in a 50% reduction in page load times and a vastly improved user experience. My experience also extends to implementing responsive designs and ensuring full WCAG 2.0 compliance, showcasing my commitment to creating accessible and user-friendly web applications. Furthermore, my background in .NET Core and REST API development allows me to quickly understand and integrate into the full-stack environment at W11K.\\n\\nI am particularly drawn to W11K's commitment to innovation and its use of modern technologies like React and Storyblok. My project experience, such as the Food Corner Cafe web platform developed using React, Express, and MongoDB, demonstrates my ability to create user-friendly and efficient web applications. I am eager to expand my knowledge and contribute to the maintenance and further development of your websites and internal web applications.\\n\\nI am a highly motivated and collaborative individual with excellent German and English language skills. I am eager to learn new technologies and work independently within a team. Thank you for considering my application. I am available for an interview at your earliest convenience.\\n\\nSincerely,\\nDiveshan Thavarasa",
  "company": {
    "name": "W11K GmbH",
    "address": "Stuttgart, Baden-Württemberg, Germany",
    "about": "W11K GmbH is likely a company focused on web development and online learning, given its association with 'thecodecampus.de'. They likely offer web development services and training programs, possibly with a focus on modern technologies. Their mission probably involves providing high-quality web solutions and educational resources to their clients and students.",
    "highlights": [
      "Focus on modern web technologies like React, Angular, and Storyblok.",
      "Involvement in both web development services and educational programs.",
      "Opportunity to work on internal web applications and external websites."
    ]
  },
  "candidate": {
    "candidate_name": "Diveshan Thavarasa",
    "current_status": "Master Student",
    "keySkillsInCV": [
      "JavaScript",
      "TypeScript",
      "Angular",
      "React",
      "Express",
      "C#",
      ".NET core",
      "Azure CI/CD",
      "REST API",
      "Socket.io",
      "Git"
    ]
  },
  "resumeOptimization": {
    "summary": "A highly motivated Master's student in Software Engineering for Industrial Applications with experience in developing web applications using Angular, React, and .NET Core. Proven ability to optimize performance, ensure accessibility, and automate processes. Eager to contribute to W11K GmbH's web development efforts and learn new technologies.",
    "keywordsToAdd": [
      "Storyblok",
      "Content Management System (CMS)",
      "Agile",
      "Teamwork",
      "Web Development",
      "Web Application Maintenance",
      "Problem-solving"
    ],
    "experienceAlignment": "Highlight projects and experiences that demonstrate proficiency in React and Angular. Emphasize the ability to work independently and as part of a team. Align achievements with the tasks mentioned in the job description, such as website maintenance and internal web application development.",
    "skillGapAnalysis": "The candidate's CV demonstrates strong front-end skills with Angular and React, aligning well with the job requirements. Experience with headless CMS systems like Storyblok could be beneficial and could be further developed. Knowledge of Java or databases would be a plus but is not essential, suggesting a potential area for future skill development.",
    "cvImprovementSuggestions": [
      "Quantify achievements with numbers whenever possible (e.g., \\"Reduced page load times by X%\\").",
      "Tailor the resume to explicitly mention experience with maintaining websites and developing internal web applications.",
      "Include a brief mention of familiarity or willingness to learn headless CMS systems like Storyblok.",
      "Highlight any experience with agile development methodologies.",
      "Add a section detailing specific contributions to team projects."
    ],
    "optimizedResume": "Diveshan Thavarasa\\n\\nMaster Student of Software Engineering for Industrial Applications\\n\\nAddress: Luitpoldstraße 37	Email: diveshan.thavarasa@gmail.com\\n95028 Hof, Germany		Github: https://github.com/Dive1995\\nBirthdate: 04.11.1995		Portfolio: https://diveshan.netlify.app/\\nNationality: Sri Lankan		LinkedIn: https://www.linkedin.com/in/diveshan/\\nPhone: +49 162 2924574\\n\\nEducation\\n10/2024 – Present\\nMEng Software Engineering for Industrial Applications\\nHof University of Applied Sciences, Hof, Germany\\n\\n02/2018 – 08/2022	   BSc Hons in Computer Science & Technology\\nUva Wellassa University, Badulla, Sri Lanka\\n\\nWork Experience\\n12/2022 – 08/2024\\nAssociate Software Engineer\\ni-Wonder Sri Lanka, Colombo, Sri Lanka\\n[Angular, .NET core, REST API, MongoDB, SQL, Azure CI/CD]\\n* Optimized Angular event propagation, reducing page load times by 50% and improving user experience for over 10,000 users.\\n* Developed comprehensive keyboard navigation across four websites, significantly enhancing accessibility and achieving full WCAG 2.0 compliance.\\n* Implemented responsive design, ensuring seamless user experience across mobile, tablet, and desktop devices.\\n\\n02/2022 – 12/2022\\nAssociate Software Engineer\\nVirtusa Pvt. Ltd, Colombo, Sri Lanka\\n[Azure SQL, Azure Logic apps]\\n* Automated the manual process of assigning employees to skill channels in MS Teams using Azure services, resulting in a time savings of over 100 hours per month and eliminating errors in employee allocation.\\n\\nProjects\\n03/2024 - 07/2024\\nFood Corner Cafe\\n[React, Express, MongoDB, Stripe, Auth0, Shadecn, Socket.io]\\n* Developed a user-friendly web platform enabling customers to order food, make payments, and track order statuses in real-time.\\n* Optimized real-time order updates and notifications using Socket.io, enhancing user engagement and experience.\\n* Built a robust admin dashboard for the cafe to manage the menu, monitor orders, and update statuses efficiently. Implemented agile methodologies to ensure timely delivery.\\nhttps://www.foodcornercafe.com/\\n\\nSkills\\nLanguage\\nIT Skills\\nEnglish - Advanced (C1), German - Intermediate (B1), Tamil – Native\\nJavaScript, TypeScript, Angular, React, Express, C#,.NET core, Azure CI/CD, REST API, Socket.io, Git, Agile Development\\n"
  },
  "atsAnalysis": {
    "score": 85,
    "issues": [
      "Lack of specific keywords related to web maintenance.",
      "Insufficient emphasis on teamwork and collaboration."
    ],
    "recommendations": [
      "Incorporate keywords like 'website maintenance', 'web application development', and 'team collaboration'.",
      "Highlight experiences where you worked as part of a team to achieve a common goal.",
      "Use a standard resume format (chronological or functional)."
    ],
    "keySkillsRequired": [
      "React",
      "Angular",
      "Web Development",
      "Teamwork",
      "Problem-solving"
    ]
  },
  "positionAlignment": {
    "fitLevel": "Strong Fit",
    "matchedResponsibilities": [
      "Maintenance of websites built with React and Angular.",
      "Implementation of internal web applications using Angular or React.",
      "Working collaboratively in an agile team."
    ],
    "unmatchedResponsibilities": [],
    "overallComment": "The candidate's skills and experience align well with the job requirements. The candidate has proven experience in Angular and React, aligning perfectly with the maintenance and development tasks described in the job description. The candidate's collaborative spirit and enthusiasm to learn new technologies make them a great fit for the team."
  },
  "interviewPreparation": {
    "likelyQuestions": [
      "Describe your experience with React and Angular, providing specific examples of projects you've worked on.",
      "How do you approach troubleshooting performance issues in web applications?",
      "Explain your understanding of agile development methodologies and your experience working in agile teams.",
      "What is your experience with Content Management Systems like Storyblok and how would you approach learning a new CMS?",
      "Give an example of a time you had to learn a new technology quickly. What was your strategy?"
    ],
    "answersTips": [
      "Provide concrete examples of projects where you've used React and Angular, quantifying your achievements whenever possible. For example, 'In the Food Corner Cafe project, I used React to build a user-friendly interface that resulted in a 20% increase in online orders'.",
      "Describe your problem-solving process, including the tools and techniques you use to identify and resolve performance bottlenecks. Mention the specific techniques, such as analyzing the event propagation and the optimizations which can be applied.",
      "Explain your understanding of agile principles and practices, and provide examples of how you've applied them in your previous projects. For example, mention using agile sprints to manage project tasks in Food Corner Cafe.",
      "Research Storyblok and other headless CMS systems and be prepared to discuss their benefits and drawbacks. Express your willingness to learn and adapt to new technologies.",
      "Choose a specific instance where you quickly picked up a new technology and discuss step by step including your thought process and how you applied practically."
    ],
    "strengthsToHighlight": [
      "Proven experience in React and Angular.",
      "Ability to optimize web application performance.",
      "Strong problem-solving skills.",
      "Experience with responsive design and accessibility.",
      "Enthusiasm for learning new technologies."
    ],
    "weaknessesToHandle": [
      "Limited experience with specific CMS systems like Storyblok (frame this as an opportunity to learn).",
      "Potentially limited experience with German workplace culture (emphasize willingness to learn and adapt)."
    ]
  },
  "jobTrackingMeta": {
    "company": "W11K GmbH",
    "jobTitle": "WORKING STUDENT WEB DEVELOPMENT (M/F/D)",
    "location": "Stuttgart, Baden-Württemberg, Germany",
    "languageRequirement": "German & English",
    "applicationStatus": "notApplied",
    "appliedDate": null
  }
}
\`\`\``,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `${prompt}`,
          },
        ],
      },
    ],
  });
//   for await (const chunk of response) {
//     console.log(chunk.text);
//   }

//   return {model, config, contents}
// }
