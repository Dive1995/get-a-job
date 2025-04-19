import { GoogleGenAI } from "@google/genai";

// export async function main() {
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});
const config = {
  responseMimeType: "application/json",
};
const model = "gemini-2.0-flash";

//   const contents = [
//     {
//       role: "user",
//       parts: [
//         {
//           text: `CV:

//         Job description:

//         based on the CV and Job description, Generate a complete JSON object strictly following the schema below. Do not return the schema, only a fully filled JSON that follows the given schema. Do not include explanations, comments, or partial structures.

// "{
//   "type": "object",
//   "properties": {
//     "coverLetter": {
//       "type": "string",
//       "description": "A personalized cover letter generated based on the CV and Job Description, shouldn't sound like generic. If skills are transferable with previous experiences and skill mention them."
//     },
//     "candidate": {
// 	    "candidate_name": { "type": "string" },,
//       "current_status": { "type": "string" },
// 			"keySkillsInCV": {
//           "type": "array",
//           "items": { "type": "string" },
//           "description": "Key skills detected in the CV"
//         },
//     },
//     "resumeOptimization": {
//       "type": "object",
//       "description": "Suggestions and improvements to the resume for this job based on the job description",
//       "properties": {
//         "summary": { "type": "string" },
//         "keywordsToAdd": {
//           "type": "array",
//           "items": { "type": "string" }
//         },
//         "experienceAlignment": {
//           "type": "string"
//         },
//         "skillGapAnalysis": {
//           "type": "string"
//         },
//         "cvImprovementSuggestions": {
//           "type": "array",
//           "items": { "type": "string" },
//           "description": "List of general improvements to make the CV better"
//         },
//         "optimizedResume": {
//           "type": "string",
//           "description": "A rewritten version of the resume tailored to the job description based on the cvImprovementSuggestions"
//         }
//       }
//     },
//     "atsAnalysis": {
//       "type": "object",
//       "description": "ATS (Applicant Tracking System) compatibility analysis",
//       "properties": {
//         "score": {
//           "type": "number",
//           "description": "Score out of 100"
//         },
//         "issues": {
//           "type": "array",
//           "items": { "type": "string" }
//         },
//         "recommendations": {
//           "type": "array",
//           "items": { "type": "string" }
//         },
//         "keySkillsRequired": {
//           "type": "array",
//           "items": { "type": "string" },
//           "description": "Key skills required based on the job description"
//         }
//       }
//     },
//     "positionAlignment": {
//       "type": "object",
//       "description": "Assessment of candidate's alignment with the job role",
//       "properties": {
//         "fitLevel": {
//           "type": "string",
//           "enum": ["Strong Fit", "Moderate Fit", "Low Fit"]
//         },
//         "matchedResponsibilities": {
//           "type": "array",
//           "items": { "type": "string" }
//         },
//         "unmatchedResponsibilities": {
//           "type": "array",
//           "items": { "type": "string" }
//         },
//         "overallComment": {
//           "type": "string",
//           "description": "General summary of how well the CV fits the position"
//         }
//       }
//     },
//     "interviewPreparation": {
//       "type": "object",
//       "description": "Personalized guidance for interview preparation based on CV and Job description",
//       "properties": {
//         "likelyQuestions": {
//           "type": "array",
//           "items": { "type": "string" }
//         },
//         "answersTips": {
//           "type": "array",
//           "items": { "type": "string" }
//         },
//         "strengthsToHighlight": {
//           "type": "array",
//           "items": { "type": "string" }
//         },
//         "weaknessesToHandle": {
//           "type": "array",
//           "items": { "type": "string" }
//         }
//       }
//     },
//     "jobTrackingMeta": {
//       "type": "object",
//       "description": "Information for tracking this job application",
//       "properties": {
//         "company": { "type": "string" },
//         "jobTitle": { "type": "string" },
//         "location": { "type": "string" },
//         "languageRequirement":
// 		        {
// 			        "type": "enum",
// 			        "enum": ["German", "English", "German & English", "German / English"]
// 			        "description": "Check whether English and/or Language are mentioned with levels next to the enum value if mentioned"
// 			       },
//         "applicationStatus": {
//           "type": "string",
//           "value": "notApplied"
//         },
//         "appliedDate": { "type": "string", "format": "date" },
//         "notes": { "type": "string" }
//       }
//     }
//   },
//   "required": [
//     "coverLetter",
//     "resumeOptimization",
//     "atsAnalysis",
//     "positionAlignment",
//     "interviewPreparation",
// 		"jobTrackingMeta"
//   ]
// }"
// `,
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: `The user wants a JSON object populated based on the provided CV and Job Description, strictly adhering to the given schema.

// **Plan:**

// 1.  **Parse the CV:** Extract key information like name, education, work experience, projects, skills, and contact details.
// 2.  **Parse the Job Description:** Identify requirements like skills (Angular, React, TypeScript, HTML5, CSS/SASS, REST APIs, AWS), qualifications (degree in relevant field), languages (German, English), and responsibilities (client-side applications, native cloud solutions, design process).
// 3.  **Generate Cover Letter:** Draft a personalized cover letter highlighting the candidate's relevant experience (Angular, REST API, .NET Core as transferable backend knowledge, project with React/Express/MongoDB) and skills, mentioning the specific company (Siemens AG) and location (Mannheim). Emphasize enthusiasm for the technologies mentioned (JavaScript Frameworks, native cloud solutions). Mention language skills (German B1, English C1).
// 4.  **Populate Candidate Information:**
//     *   \`candidate_name\`: Diveshan Thavarasa
//     *   \`current_status\`: Master Student of Software Engineering for Industrial Applications
//     *   \`keySkillsInCV\`: List skills mentioned in the CV (Angular, .NET core, REST API, MongoDB, SQL, Azure CI/CD, Azure SQL, Azure Logic apps, React, Express, Stripe, Auth0, Shadecn, Socket.io, JavaScript, TypeScript, C#, Git, English C1, German B1, Tamil Native).
// 5.  **Populate Resume Optimization:**
//     *   \`summary\`: Create a concise summary highlighting the candidate's current MEng studies, BSc degree, relevant work experience (Angular, REST API, .NET), key projects (React), and core technical skills aligning with the job description.
//     *   \`keywordsToAdd\`: Identify keywords from the JD missing or underrepresented in the CV (AWS, S3, CloudFront, IAM, API Gateway, HTML5, CSS, SASS, native cloud solutions, business informatics, mathematics, computer science).
//     *   \`experienceAlignment\`: Assess how the candidate's experience aligns with the JD's focus on Angular/React, TypeScript, REST APIs, and potentially cloud exposure (Azure mentioned, not AWS). Mention the transferable skills from .NET/Azure to backend/cloud concepts.
//     *   \`skillGapAnalysis\`: Note the lack of explicit AWS experience and potentially less focus on HTML/CSS (though implied by web dev). Highlight the strong match with Angular, TypeScript, and REST APIs.
//     *   \`cvImprovementSuggestions\`: Suggest adding a brief profile summary, quantifying achievements more where possible, explicitly listing HTML/CSS, potentially adding a section for cloud skills mentioning Azure and willingness to learn AWS, and tailoring the project descriptions slightly more towards frontend aspects if possible. Ensure consistent date formatting. Update the date at the bottom.
//     *   \`optimizedResume\`: Draft a revised CV incorporating these suggestions. (This might be too long for a direct JSON string, so I'll keep it concise, focusing on structure and keyword additions). *Self-correction: The schema asks for a string, so I will need to format the rewritten CV as a single string, potentially using newline characters.*
// 6.  **Populate ATS Analysis:**
//     *   \`score\`: Estimate a score based on keyword matching (Angular, TypeScript, REST API, German, English, Computer Science degree). Missing AWS keywords will lower it slightly. Aim for around 75/100.
//     *   \`issues\`: List missing keywords (AWS services, HTML5, CSS/SASS explicitly). Note the slightly older Angular experience (implicit, not explicitly stated 'latest version'). Date formatting inconsistency.
//     *   \`recommendations\`: Add missing keywords, quantify achievements further, add a summary/objective, ensure consistent formatting.
//     *   \`keySkillsRequired\`: List skills directly from the JD (Angular, React, TypeScript, HTML5, CSS, SASS, REST APIs, AWS (S3, CloudFront, IAM, API Gateway), German, English).
// 7.  **Populate Position Alignment:**
//     *   \`fitLevel\`: "Moderate Fit" due to strong Angular/TypeScript/REST API match but lack of explicit AWS experience and potentially less focus on latest versions/HTML/CSS.
//     *   \`matchedResponsibilities\`: Programming client-side applications with Angular/TypeScript, familiarity with REST APIs, German and English language skills, relevant degree field.
//     *   \`unmatchedResponsibilities\`: Direct experience with AWS services (S3, CloudFront, IAM, API Gateway), experience with the *latest* Angular/React versions (CV doesn't specify), deep focus on HTML5/CSS (SASS) mentioned specifically in JD.
//     *   \`overallComment\`: The candidate is a promising fit due to their strong foundation in Angular, TypeScript, REST APIs, relevant education, and language skills. The primary gap is the lack of specified AWS experience, although Azure experience shows cloud familiarity. Enthusiasm for learning and current studies are positives.
// 8.  **Populate Interview Preparation:**
//     *   \`likelyQuestions\`: Questions about Angular experience (specific projects, versions, challenges like the optimization mentioned), TypeScript usage, REST API design/consumption, experience with responsive design/accessibility (from i-Wonder role), cloud concepts (drawing parallels from Azure to AWS), motivation for Siemens/the role, experience with React (from project), German language proficiency discussion, problem-solving questions.
//     *   \`answersTips\`: Use the STAR method for behavioral questions, connect Angular optimization experience to performance focus, relate Azure experience to cloud concepts and express eagerness to learn AWS, highlight the Food Corner Cafe project for React/full-stack understanding, emphasize adaptability and learning ability (current Master's student), be prepared to discuss WCAG compliance work.
//     *   \`strengthsToHighlight\`: Proven Angular experience with quantifiable results, TypeScript proficiency, REST API knowledge, full-stack project experience (React/Node/MongoDB), cloud exposure (Azure), bilingual (English C1, German B1), currently enhancing skills through MEng.
//     *   \`weaknessesToHandle\`: Lack of direct AWS experience (frame as eager to learn, mention Azure exposure), potentially less explicit focus on HTML/CSS in CV (mention it's fundamental to web dev roles held), ensure clarity on Angular versions used if asked.
// 9.  **Populate Job Tracking Meta:**
//     *   \`company\`: Siemens AG
//     *   \`jobTitle\`: Temporary Fulltime role (likely Junior Frontend Developer or similar, JD doesn't give a specific title) - *Self-correction: JD doesn't state a title, use a placeholder like "Frontend Developer Role (Temporary)"*
//     *   \`location\`: Manheim, on-site
//     *   \`languageRequirement\`: German & English
//     *   \`applicationStatus\`: notApplied
//     *   \`appliedDate\`: "" (empty as not applied)
//     *   \`notes\`: Requires relocation/presence in Manheim. Focus on Angular/React, TypeScript, REST, HTML/CSS. AWS experience desired. Temporary position.
// 10. **Final Review:** Ensure the generated JSON strictly follows the schema, with no extra explanations or comments outside the JSON structure itself. Check data types and required fields. Ensure the date at the bottom of the CV is updated or removed in the optimized version.`,
//         },
//         {
//           text: `\`\`\`json
// {
//   "coverLetter": "Dear Hiring Manager,\\n\\nI am writing to express my strong interest in the Temporary Full-time position at Siemens AG in Manheim, as advertised. Currently pursuing a Master's in Software Engineering for Industrial Applications at Hof University, I am eager to apply my academic knowledge and practical experience in a dynamic environment like Siemens.\\n\\nThe job description's emphasis on creative work, new technologies, and JavaScript frameworks like Angular and React deeply resonates with my passion and skills. During my time as an Associate Software Engineer at i-Wonder Sri Lanka, I gained significant hands-on experience with Angular and TypeScript, developing client-side applications. A key achievement was resolving a critical performance bottleneck by optimizing Angular event propagation, which reduced page load times by over 50%. I also developed comprehensive keyboard navigation, achieving WCAG 2.0 compliance, demonstrating my commitment to user experience and accessibility – skills directly relevant to designing client-side applications.\\n\\nMy familiarity with REST APIs is well-established through integrating front-end applications with backend services using .NET Core and interacting with databases like MongoDB and SQL Server. While my cloud experience is primarily with Azure, including CI/CD pipelines and Logic Apps for automation (saving over 100 hours monthly in a previous role), I am highly motivated to gain expertise in AWS services like S3, CloudFront, IAM, and API Gateway as mentioned in your requirements. My recent project, \\"Food Corner Cafe,\\" further honed my skills in React, Express, and real-time updates using Socket.io, showcasing my ability to work with different JavaScript frameworks.\\n\\nI am proficient in HTML5 and CSS, fundamental to my front-end development experience. Furthermore, I possess advanced (C1) English and intermediate (B1) German language skills, enabling effective communication within your team.\\n\\nI am confident that my skills in Angular, TypeScript, REST APIs, coupled with my eagerness to learn AWS and contribute to native cloud solutions, make me a strong candidate for this role. I am excited by the prospect of working alongside experts at Siemens and contributing to innovative projects.\\n\\nThank you for considering my application. I have attached my CV for your review and welcome the opportunity to discuss my qualifications further.\\n\\nSincerely,\\nDiveshan Thavarasa",
//   "candidate": {
//     "candidate_name": "Diveshan Thavarasa",
//     "current_status": "Master Student of Software Engineering for Industrial Applications",
//     "keySkillsInCV": [
//       "Angular",
//       ".NET core",
//       "REST API",
//       "MongoDB",
//       "SQL",
//       "Azure CI/CD",
//       "Azure SQL",
//       "Azure Logic apps",
//       "React",
//       "Express",
//       "Stripe",
//       "Auth0",
//       "Shadecn",
//       "Socket.io",
//       "JavaScript",
//       "TypeScript",
//       "C#",
//       "Git",
//       "English - Advanced (C1)",
//       "German - Intermediate (B1)",
//       "Tamil – Native"
//     ]
//   },
//   "resumeOptimization": {
//     "summary": "Highly motivated Software Engineering Master's student with a BSc in Computer Science & Technology and 2 years of professional experience developing and optimizing web applications. Proven expertise in Angular, TypeScript, .NET Core, and REST APIs, demonstrated by significantly improving application performance and accessibility (WCAG 2.0). Experience includes full-stack development (React, Express, MongoDB) and cloud automation using Azure services. Eager to leverage skills in JavaScript frameworks and contribute to native cloud solutions using AWS at Siemens AG. Fluent in English (C1) and German (B1).",
//     "keywordsToAdd": [
//       "AWS",
//       "S3",
//       "CloudFront",
//       "IAM",
//       "API Gateway",
//       "HTML5",
//       "CSS",
//       "SASS",
//       "Client-side applications",
//       "Native cloud solutions",
//       "Frontend Development",
//       "Web Development"
//     ],
//     "experienceAlignment": "The candidate's experience strongly aligns with the requirement for Angular and TypeScript proficiency, evidenced by the i-Wonder role focused on Angular development, performance optimization, and accessibility. Experience with REST APIs is also well-documented. The Food Corner Cafe project shows proficiency in React. While direct AWS experience is missing, the Azure experience (CI/CD, Logic Apps, SQL) demonstrates foundational cloud knowledge and automation skills, which are transferable. Explicitly mentioning HTML/CSS skills would strengthen alignment.",
//     "skillGapAnalysis": "The primary skill gap is the lack of specified experience with AWS services (S3, CloudFront, IAM, API Gateway) as required by the job description. While the candidate has Azure experience, AWS is specifically mentioned. Additionally, experience with HTML5 and CSS (SASS) should be explicitly listed, although implied by the web development roles. The JD mentions the 'latest' Angular/React version, which isn't specified in the CV.",
//     "cvImprovementSuggestions": [
//       "Add a concise 'Profile Summary' section at the top, tailored to this job.",
//       "Explicitly list HTML5 and CSS (mentioning SASS if applicable) under 'IT Skills'.",
//       "Consider adding a 'Cloud Skills' subsection mentioning Azure experience and explicitly stating eagerness/ability to learn AWS.",
//       "Quantify achievements further if possible (e.g., size of websites made accessible, specific metrics for automation savings beyond hours).",
//       "Ensure date formatting is consistent (e.g., MM/YYYY or Month YYYY).",
//       "Update the date at the bottom of the CV to the current date.",
//       "Optionally, briefly mention the Angular versions worked with if they were recent."
//     ],
//     "optimizedResume": "Diveshan Thavarasa\\nMaster Student of Software Engineering for Industrial Applications\\n\\nAddress: Luitpoldstraße 37, 95028 Hof, Germany\\nEmail: diveshan.thavarasa@gmail.com\\nPhone: +49 162 2924574\\nLinkedIn: https://www.linkedin.com/in/diveshan/\\nGithub: https://github.com/Dive1995\\nPortfolio: https://diveshan.netlify.app/\\nBirthdate: 04.11.1995\\nNationality: Sri Lankan\\n\\nProfile Summary\\nHighly motivated Software Engineering Master's student with a BSc in Computer Science & Technology and 2 years of professional experience developing and optimizing web applications. Proven expertise in frontend development using Angular, TypeScript, React, HTML5, and CSS, coupled with backend experience using .NET Core and Node.js. Demonstrated ability to enhance performance (reducing load times by 50%) and ensure accessibility (WCAG 2.0). Experienced with REST APIs, MongoDB, SQL, and Azure cloud services (CI/CD, Logic Apps). Eager to apply skills to client-side application development and native cloud solutions, with a strong desire to learn and utilize AWS technologies at Siemens AG. Fluent in English (C1) and German (B1).\\n\\nEducation\\n10/2024 – Present: MEng Software Engineering for Industrial Applications\\nHof University of Applied Sciences, Hof, Germany\\n\\n02/2018 – 08/2022: BSc Hons in Computer Science & Technology\\nUva Wellassa University, Badulla, Sri Lanka\\n\\nWork Experience\\n12/2022 – 08/2024: Associate Software Engineer\\ni-Wonder Sri Lanka, Colombo, Sri Lanka\\n[Angular, TypeScript, C#, .NET core, REST API, MongoDB, SQL, Azure CI/CD, HTML5, CSS]\\n- Resolved critical performance bottleneck by optimizing Angular event propagation, reducing page load times by over 50% and improving user experience.\\n- Developed comprehensive keyboard navigation across four websites, significantly enhancing accessibility and achieving full WCAG 2.0 compliance.\\n- Implemented responsive design using HTML5 and CSS, ensuring seamless user experience across mobile, tablet, and desktop devices.\\n- Collaborated in developing and consuming REST APIs for client-side applications.\\n\\n02/2022 – 12/2022: Associate Software Engineer\\nVirtusa Pvt. Ltd, Colombo, Sri Lanka\\n[Azure SQL, Azure Logic apps]\\n- Automated the manual process of assigning employees to skill channels in MS Teams using Azure Logic Apps and Azure SQL, resulting in a time savings of over 100 hours per month and eliminating errors.\\n\\nProjects\\n03/2024 - 07/2024: Food Corner Cafe\\n[React, TypeScript, Express, MongoDB, Stripe, Auth0, Shadecn, Socket.io, HTML5, CSS]\\n- Developed a user-friendly web platform enabling customers to order food, make payments (Stripe), and track order statuses in real-time.\\n- Optimized real-time order updates and notifications using Socket.io, enhancing user engagement.\\n- Built a robust admin dashboard for menu management, order monitoring, and status updates.\\n- Link: https://www.foodcornercafe.com/\\n\\nSkills\\nLanguages: English (Advanced - C1), German (Intermediate - B1), Tamil (Native)\\nFrontend: JavaScript, TypeScript, Angular, React, HTML5, CSS, Socket.io\\nBackend: C#, .NET Core, Express.js, Node.js\\nDatabases: MongoDB, SQL Server\\nCloud: Azure CI/CD, Azure Logic Apps, Azure SQL (Experience with Azure, keen to learn AWS)\\nTools & Concepts: REST API, Git, Responsive Design, Web Accessibility (WCAG 2.0)\\n\\nDate: [Current Date, e.g., 24.05.2024]"
//   },
//   "atsAnalysis": {
//     "score": 75,
//     "issues": [
//       "Missing keywords: AWS, S3, CloudFront, IAM, API Gateway, SASS.",
//       "HTML5 and CSS are not explicitly listed in the original skills section.",
//       "Experience with the 'latest' Angular/React versions is not specified.",
//       "Inconsistent date formatting in the original CV.",
//       "Date at the bottom is outdated."
//     ],
//     "recommendations": [
//       "Incorporate missing keywords (AWS, specific services, SASS if applicable) naturally into the profile summary or skills section.",
//       "Explicitly list HTML5 and CSS in the skills section.",
//       "Add a professional summary/profile section tailored to the job.",
//       "Quantify achievements more where possible.",
//       "Ensure consistent date formatting throughout the CV.",
//       "Update the date at the bottom of the CV.",
//       "Mention willingness to learn AWS explicitly, potentially referencing Azure experience as a foundation."
//     ],
//     "keySkillsRequired": [
//       "Angular",
//       "React",
//       "TypeScript",
//       "HTML5",
//       "CSS (SASS)",
//       "REST APIs",
//       "AWS (S3, CloudFront, IAM, API Gateway)",
//       "German",
//       "English",
//       "Degree in Business Informatics, Computer Science, Mathematics, or comparable field"
//     ]
//   },
//   "positionAlignment": {
//     "fitLevel": "Moderate Fit",
//     "matchedResponsibilities": [
//       "Programming client-side applications with Angular or React version in TypeScript.",
//       "Familiarity with REST APIs.",
//       "Holds a relevant degree (BSc Hons in Computer Science & Technology).",
//       "Meets language requirements (German and English).",
//       "Experience with HTML5 and CSS (implied, strengthened in optimized resume)."
//     ],
//     "unmatchedResponsibilities": [
//       "Direct experience with AWS services (S3, CloudFront, IAM, API Gateway).",
//       "Experience specifically mentioned as 'latest' Angular/React versions.",
//       "Explicit mention of SASS."
//     ],
//     "overallComment": "Diveshan Thavarasa presents a solid profile for this position, particularly with proven experience in Angular, TypeScript, REST APIs, and relevant project work in React. The candidate's educational background and language skills meet the requirements. The main gap is the lack of specified AWS experience, though Azure experience provides a good foundation. With a demonstrated ability to learn and current Master's studies, the candidate shows strong potential and is a moderate fit, likely becoming a strong fit with demonstrable enthusiasm for learning AWS."
//   },
//   "interviewPreparation": {
//     "likelyQuestions": [
//       "Can you describe your experience with Angular? Which versions have you used? Tell us about the performance optimization you implemented.",
//       "Describe your experience with TypeScript. Why do you prefer it?",
//       "Walk us through your experience designing or consuming REST APIs.",
//       "Tell us about your experience with React based on your 'Food Corner Cafe' project.",
//       "How familiar are you with HTML5 and CSS, including responsive design and preprocessors like SASS?",
//       "The role involves AWS services like S3, CloudFront, IAM, and API Gateway. What is your experience with cloud platforms, particularly AWS?",
//       "Describe a challenging technical problem you faced and how you solved it.",
//       "How do you approach learning new technologies, like the AWS stack mentioned?",
//       "Why are you interested in working at Siemens AG in Manheim?",
//       "How would you rate your German language skills (B1)? Can you conduct a technical discussion in German?",
//       "Tell us about your work ensuring WCAG 2.0 compliance."
//     ],
//     "answersTips": [
//       "Use the STAR method (Situation, Task, Action, Result) to structure answers about past experiences.",
//       "Highlight the quantifiable result (50% load time reduction) when discussing the Angular optimization.",
//       "Connect your Azure experience (CI/CD, Logic Apps) to general cloud concepts and express strong enthusiasm and a clear plan for learning AWS quickly.",
//       "Emphasize your hands-on experience with both Angular and React, showing versatility.",
//       "Be prepared to discuss the specific technical details of your projects and work experiences.",
//       "Clearly articulate your understanding of REST principles.",
//       "When discussing weaknesses (like lack of AWS), frame it positively, focusing on your eagerness and ability to learn.",
//       "Prepare specific examples demonstrating your familiarity with HTML5/CSS and responsive design.",
//       "Be ready to answer some questions or parts of the interview in German to demonstrate your B1 level."
//     ],
//     "strengthsToHighlight": [
//       "Strong practical experience in Angular and TypeScript.",
//       "Proven ability to optimize frontend performance and ensure accessibility (WCAG).",
//       "Experience with React through a full-stack personal project.",
//       "Solid understanding and use of REST APIs.",
//       "Familiarity with cloud concepts and CI/CD through Azure experience.",
//       "Relevant academic background (BSc and ongoing MEng).",
//       "Good language skills: English (C1) and German (B1).",
//       "Demonstrated ability to learn and adapt (current student, project diversity)."
//     ],
//     "weaknessesToHandle": [
//       "Lack of direct experience with the specified AWS services (S3, CloudFront, IAM, API Gateway).",
//       "CV doesn't explicitly state experience with the *latest* framework versions.",
//       "CSS preprocessor (SASS) experience not explicitly mentioned."
//     ]
//   },
//   "jobTrackingMeta": {
//     "company": "Siemens AG",
//     "jobTitle": "Frontend Developer Role (Temporary)",
//     "location": "Manheim, on-site",
//     "languageRequirement": "German & English",
//     "applicationStatus": "notApplied",
//     "appliedDate": "",
//     "notes": "Temporary, full-time position focused on frontend development (Angular/React, TypeScript) and native cloud solutions. Requires degree and familiarity with HTML5, CSS (SASS), REST APIs. AWS experience desired. Location is Manheim, on-site. Requires both German and English proficiency."
//   }
// }
// \`\`\``,
//         },
//       ],
//     },
//     {
//       role: "user",
//       parts: [
//         {
//           text: `INSERT_INPUT_HERE`,
//         },
//       ],
//     },
//   ];

export const generateJobDetails = (prompt: string) =>
  ai.models.generateContent({
    model,
    config,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `CV: 

        Job description: 

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
`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `The user wants a JSON object populated based on the provided CV and Job Description, strictly adhering to the given schema.

**Plan:**

1.  **Parse the CV:** Extract key information like name, education, work experience, projects, skills, and contact details.
2.  **Parse the Job Description:** Identify requirements like skills (Angular, React, TypeScript, HTML5, CSS/SASS, REST APIs, AWS), qualifications (degree in relevant field), languages (German, English), and responsibilities (client-side applications, native cloud solutions, design process).
3.  **Generate Cover Letter:** Draft a personalized cover letter highlighting the candidate's relevant experience (Angular, REST API, .NET Core as transferable backend knowledge, project with React/Express/MongoDB) and skills, mentioning the specific company (Siemens AG) and location (Mannheim). Emphasize enthusiasm for the technologies mentioned (JavaScript Frameworks, native cloud solutions). Mention language skills (German B1, English C1).
4.  **Populate Candidate Information:**
    *   \`candidate_name\`: Diveshan Thavarasa
    *   \`current_status\`: Master Student of Software Engineering for Industrial Applications
    *   \`keySkillsInCV\`: List skills mentioned in the CV (Angular, .NET core, REST API, MongoDB, SQL, Azure CI/CD, Azure SQL, Azure Logic apps, React, Express, Stripe, Auth0, Shadecn, Socket.io, JavaScript, TypeScript, C#, Git, English C1, German B1, Tamil Native).
5.  **Populate Resume Optimization:**
    *   \`summary\`: Create a concise summary highlighting the candidate's current MEng studies, BSc degree, relevant work experience (Angular, REST API, .NET), key projects (React), and core technical skills aligning with the job description.
    *   \`keywordsToAdd\`: Identify keywords from the JD missing or underrepresented in the CV (AWS, S3, CloudFront, IAM, API Gateway, HTML5, CSS, SASS, native cloud solutions, business informatics, mathematics, computer science).
    *   \`experienceAlignment\`: Assess how the candidate's experience aligns with the JD's focus on Angular/React, TypeScript, REST APIs, and potentially cloud exposure (Azure mentioned, not AWS). Mention the transferable skills from .NET/Azure to backend/cloud concepts.
    *   \`skillGapAnalysis\`: Note the lack of explicit AWS experience and potentially less focus on HTML/CSS (though implied by web dev). Highlight the strong match with Angular, TypeScript, and REST APIs.
    *   \`cvImprovementSuggestions\`: Suggest adding a brief profile summary, quantifying achievements more where possible, explicitly listing HTML/CSS, potentially adding a section for cloud skills mentioning Azure and willingness to learn AWS, and tailoring the project descriptions slightly more towards frontend aspects if possible. Ensure consistent date formatting. Update the date at the bottom.
    *   \`optimizedResume\`: Draft a revised CV incorporating these suggestions. (This might be too long for a direct JSON string, so I'll keep it concise, focusing on structure and keyword additions). *Self-correction: The schema asks for a string, so I will need to format the rewritten CV as a single string, potentially using newline characters.*
6.  **Populate ATS Analysis:**
    *   \`score\`: Estimate a score based on keyword matching (Angular, TypeScript, REST API, German, English, Computer Science degree). Missing AWS keywords will lower it slightly. Aim for around 75/100.
    *   \`issues\`: List missing keywords (AWS services, HTML5, CSS/SASS explicitly). Note the slightly older Angular experience (implicit, not explicitly stated 'latest version'). Date formatting inconsistency.
    *   \`recommendations\`: Add missing keywords, quantify achievements further, add a summary/objective, ensure consistent formatting.
    *   \`keySkillsRequired\`: List skills directly from the JD (Angular, React, TypeScript, HTML5, CSS, SASS, REST APIs, AWS (S3, CloudFront, IAM, API Gateway), German, English).
7.  **Populate Position Alignment:**
    *   \`fitLevel\`: "Moderate Fit" due to strong Angular/TypeScript/REST API match but lack of explicit AWS experience and potentially less focus on latest versions/HTML/CSS.
    *   \`matchedResponsibilities\`: Programming client-side applications with Angular/TypeScript, familiarity with REST APIs, German and English language skills, relevant degree field.
    *   \`unmatchedResponsibilities\`: Direct experience with AWS services (S3, CloudFront, IAM, API Gateway), experience with the *latest* Angular/React versions (CV doesn't specify), deep focus on HTML5/CSS (SASS) mentioned specifically in JD.
    *   \`overallComment\`: The candidate is a promising fit due to their strong foundation in Angular, TypeScript, REST APIs, relevant education, and language skills. The primary gap is the lack of specified AWS experience, although Azure experience shows cloud familiarity. Enthusiasm for learning and current studies are positives.
8.  **Populate Interview Preparation:**
    *   \`likelyQuestions\`: Questions about Angular experience (specific projects, versions, challenges like the optimization mentioned), TypeScript usage, REST API design/consumption, experience with responsive design/accessibility (from i-Wonder role), cloud concepts (drawing parallels from Azure to AWS), motivation for Siemens/the role, experience with React (from project), German language proficiency discussion, problem-solving questions.
    *   \`answersTips\`: Use the STAR method for behavioral questions, connect Angular optimization experience to performance focus, relate Azure experience to cloud concepts and express eagerness to learn AWS, highlight the Food Corner Cafe project for React/full-stack understanding, emphasize adaptability and learning ability (current Master's student), be prepared to discuss WCAG compliance work.
    *   \`strengthsToHighlight\`: Proven Angular experience with quantifiable results, TypeScript proficiency, REST API knowledge, full-stack project experience (React/Node/MongoDB), cloud exposure (Azure), bilingual (English C1, German B1), currently enhancing skills through MEng.
    *   \`weaknessesToHandle\`: Lack of direct AWS experience (frame as eager to learn, mention Azure exposure), potentially less explicit focus on HTML/CSS in CV (mention it's fundamental to web dev roles held), ensure clarity on Angular versions used if asked.
9.  **Populate Job Tracking Meta:**
    *   \`company\`: Siemens AG
    *   \`jobTitle\`: Temporary Fulltime role (likely Junior Frontend Developer or similar, JD doesn't give a specific title) - *Self-correction: JD doesn't state a title, use a placeholder like "Frontend Developer Role (Temporary)"*
    *   \`location\`: Manheim, on-site
    *   \`languageRequirement\`: German & English
    *   \`applicationStatus\`: notApplied
    *   \`appliedDate\`: "" (empty as not applied)
    *   \`notes\`: Requires relocation/presence in Manheim. Focus on Angular/React, TypeScript, REST, HTML/CSS. AWS experience desired. Temporary position.
10. **Final Review:** Ensure the generated JSON strictly follows the schema, with no extra explanations or comments outside the JSON structure itself. Check data types and required fields. Ensure the date at the bottom of the CV is updated or removed in the optimized version.`,
          },
          {
            text: `\`\`\`json
{
  "coverLetter": "Dear Hiring Manager,\\n\\nI am writing to express my strong interest in the Temporary Full-time position at Siemens AG in Manheim, as advertised. Currently pursuing a Master's in Software Engineering for Industrial Applications at Hof University, I am eager to apply my academic knowledge and practical experience in a dynamic environment like Siemens.\\n\\nThe job description's emphasis on creative work, new technologies, and JavaScript frameworks like Angular and React deeply resonates with my passion and skills. During my time as an Associate Software Engineer at i-Wonder Sri Lanka, I gained significant hands-on experience with Angular and TypeScript, developing client-side applications. A key achievement was resolving a critical performance bottleneck by optimizing Angular event propagation, which reduced page load times by over 50%. I also developed comprehensive keyboard navigation, achieving WCAG 2.0 compliance, demonstrating my commitment to user experience and accessibility – skills directly relevant to designing client-side applications.\\n\\nMy familiarity with REST APIs is well-established through integrating front-end applications with backend services using .NET Core and interacting with databases like MongoDB and SQL Server. While my cloud experience is primarily with Azure, including CI/CD pipelines and Logic Apps for automation (saving over 100 hours monthly in a previous role), I am highly motivated to gain expertise in AWS services like S3, CloudFront, IAM, and API Gateway as mentioned in your requirements. My recent project, \\"Food Corner Cafe,\\" further honed my skills in React, Express, and real-time updates using Socket.io, showcasing my ability to work with different JavaScript frameworks.\\n\\nI am proficient in HTML5 and CSS, fundamental to my front-end development experience. Furthermore, I possess advanced (C1) English and intermediate (B1) German language skills, enabling effective communication within your team.\\n\\nI am confident that my skills in Angular, TypeScript, REST APIs, coupled with my eagerness to learn AWS and contribute to native cloud solutions, make me a strong candidate for this role. I am excited by the prospect of working alongside experts at Siemens and contributing to innovative projects.\\n\\nThank you for considering my application. I have attached my CV for your review and welcome the opportunity to discuss my qualifications further.\\n\\nSincerely,\\nDiveshan Thavarasa",
  "candidate": {
    "candidate_name": "Diveshan Thavarasa",
    "current_status": "Master Student of Software Engineering for Industrial Applications",
    "keySkillsInCV": [
      "Angular",
      ".NET core",
      "REST API",
      "MongoDB",
      "SQL",
      "Azure CI/CD",
      "Azure SQL",
      "Azure Logic apps",
      "React",
      "Express",
      "Stripe",
      "Auth0",
      "Shadecn",
      "Socket.io",
      "JavaScript",
      "TypeScript",
      "C#",
      "Git",
      "English - Advanced (C1)",
      "German - Intermediate (B1)",
      "Tamil – Native"
    ]
  },
  "resumeOptimization": {
    "summary": "Highly motivated Software Engineering Master's student with a BSc in Computer Science & Technology and 2 years of professional experience developing and optimizing web applications. Proven expertise in Angular, TypeScript, .NET Core, and REST APIs, demonstrated by significantly improving application performance and accessibility (WCAG 2.0). Experience includes full-stack development (React, Express, MongoDB) and cloud automation using Azure services. Eager to leverage skills in JavaScript frameworks and contribute to native cloud solutions using AWS at Siemens AG. Fluent in English (C1) and German (B1).",
    "keywordsToAdd": [
      "AWS",
      "S3",
      "CloudFront",
      "IAM",
      "API Gateway",
      "HTML5",
      "CSS",
      "SASS",
      "Client-side applications",
      "Native cloud solutions",
      "Frontend Development",
      "Web Development"
    ],
    "experienceAlignment": "The candidate's experience strongly aligns with the requirement for Angular and TypeScript proficiency, evidenced by the i-Wonder role focused on Angular development, performance optimization, and accessibility. Experience with REST APIs is also well-documented. The Food Corner Cafe project shows proficiency in React. While direct AWS experience is missing, the Azure experience (CI/CD, Logic Apps, SQL) demonstrates foundational cloud knowledge and automation skills, which are transferable. Explicitly mentioning HTML/CSS skills would strengthen alignment.",
    "skillGapAnalysis": "The primary skill gap is the lack of specified experience with AWS services (S3, CloudFront, IAM, API Gateway) as required by the job description. While the candidate has Azure experience, AWS is specifically mentioned. Additionally, experience with HTML5 and CSS (SASS) should be explicitly listed, although implied by the web development roles. The JD mentions the 'latest' Angular/React version, which isn't specified in the CV.",
    "cvImprovementSuggestions": [
      "Add a concise 'Profile Summary' section at the top, tailored to this job.",
      "Explicitly list HTML5 and CSS (mentioning SASS if applicable) under 'IT Skills'.",
      "Consider adding a 'Cloud Skills' subsection mentioning Azure experience and explicitly stating eagerness/ability to learn AWS.",
      "Quantify achievements further if possible (e.g., size of websites made accessible, specific metrics for automation savings beyond hours).",
      "Ensure date formatting is consistent (e.g., MM/YYYY or Month YYYY).",
      "Update the date at the bottom of the CV to the current date.",
      "Optionally, briefly mention the Angular versions worked with if they were recent."
    ],
    "optimizedResume": "Diveshan Thavarasa\\nMaster Student of Software Engineering for Industrial Applications\\n\\nAddress: Luitpoldstraße 37, 95028 Hof, Germany\\nEmail: diveshan.thavarasa@gmail.com\\nPhone: +49 162 2924574\\nLinkedIn: https://www.linkedin.com/in/diveshan/\\nGithub: https://github.com/Dive1995\\nPortfolio: https://diveshan.netlify.app/\\nBirthdate: 04.11.1995\\nNationality: Sri Lankan\\n\\nProfile Summary\\nHighly motivated Software Engineering Master's student with a BSc in Computer Science & Technology and 2 years of professional experience developing and optimizing web applications. Proven expertise in frontend development using Angular, TypeScript, React, HTML5, and CSS, coupled with backend experience using .NET Core and Node.js. Demonstrated ability to enhance performance (reducing load times by 50%) and ensure accessibility (WCAG 2.0). Experienced with REST APIs, MongoDB, SQL, and Azure cloud services (CI/CD, Logic Apps). Eager to apply skills to client-side application development and native cloud solutions, with a strong desire to learn and utilize AWS technologies at Siemens AG. Fluent in English (C1) and German (B1).\\n\\nEducation\\n10/2024 – Present: MEng Software Engineering for Industrial Applications\\nHof University of Applied Sciences, Hof, Germany\\n\\n02/2018 – 08/2022: BSc Hons in Computer Science & Technology\\nUva Wellassa University, Badulla, Sri Lanka\\n\\nWork Experience\\n12/2022 – 08/2024: Associate Software Engineer\\ni-Wonder Sri Lanka, Colombo, Sri Lanka\\n[Angular, TypeScript, C#, .NET core, REST API, MongoDB, SQL, Azure CI/CD, HTML5, CSS]\\n- Resolved critical performance bottleneck by optimizing Angular event propagation, reducing page load times by over 50% and improving user experience.\\n- Developed comprehensive keyboard navigation across four websites, significantly enhancing accessibility and achieving full WCAG 2.0 compliance.\\n- Implemented responsive design using HTML5 and CSS, ensuring seamless user experience across mobile, tablet, and desktop devices.\\n- Collaborated in developing and consuming REST APIs for client-side applications.\\n\\n02/2022 – 12/2022: Associate Software Engineer\\nVirtusa Pvt. Ltd, Colombo, Sri Lanka\\n[Azure SQL, Azure Logic apps]\\n- Automated the manual process of assigning employees to skill channels in MS Teams using Azure Logic Apps and Azure SQL, resulting in a time savings of over 100 hours per month and eliminating errors.\\n\\nProjects\\n03/2024 - 07/2024: Food Corner Cafe\\n[React, TypeScript, Express, MongoDB, Stripe, Auth0, Shadecn, Socket.io, HTML5, CSS]\\n- Developed a user-friendly web platform enabling customers to order food, make payments (Stripe), and track order statuses in real-time.\\n- Optimized real-time order updates and notifications using Socket.io, enhancing user engagement.\\n- Built a robust admin dashboard for menu management, order monitoring, and status updates.\\n- Link: https://www.foodcornercafe.com/\\n\\nSkills\\nLanguages: English (Advanced - C1), German (Intermediate - B1), Tamil (Native)\\nFrontend: JavaScript, TypeScript, Angular, React, HTML5, CSS, Socket.io\\nBackend: C#, .NET Core, Express.js, Node.js\\nDatabases: MongoDB, SQL Server\\nCloud: Azure CI/CD, Azure Logic Apps, Azure SQL (Experience with Azure, keen to learn AWS)\\nTools & Concepts: REST API, Git, Responsive Design, Web Accessibility (WCAG 2.0)\\n\\nDate: [Current Date, e.g., 24.05.2024]"
  },
  "atsAnalysis": {
    "score": 75,
    "issues": [
      "Missing keywords: AWS, S3, CloudFront, IAM, API Gateway, SASS.",
      "HTML5 and CSS are not explicitly listed in the original skills section.",
      "Experience with the 'latest' Angular/React versions is not specified.",
      "Inconsistent date formatting in the original CV.",
      "Date at the bottom is outdated."
    ],
    "recommendations": [
      "Incorporate missing keywords (AWS, specific services, SASS if applicable) naturally into the profile summary or skills section.",
      "Explicitly list HTML5 and CSS in the skills section.",
      "Add a professional summary/profile section tailored to the job.",
      "Quantify achievements more where possible.",
      "Ensure consistent date formatting throughout the CV.",
      "Update the date at the bottom of the CV.",
      "Mention willingness to learn AWS explicitly, potentially referencing Azure experience as a foundation."
    ],
    "keySkillsRequired": [
      "Angular",
      "React",
      "TypeScript",
      "HTML5",
      "CSS (SASS)",
      "REST APIs",
      "AWS (S3, CloudFront, IAM, API Gateway)",
      "German",
      "English",
      "Degree in Business Informatics, Computer Science, Mathematics, or comparable field"
    ]
  },
  "positionAlignment": {
    "fitLevel": "Moderate Fit",
    "matchedResponsibilities": [
      "Programming client-side applications with Angular or React version in TypeScript.",
      "Familiarity with REST APIs.",
      "Holds a relevant degree (BSc Hons in Computer Science & Technology).",
      "Meets language requirements (German and English).",
      "Experience with HTML5 and CSS (implied, strengthened in optimized resume)."
    ],
    "unmatchedResponsibilities": [
      "Direct experience with AWS services (S3, CloudFront, IAM, API Gateway).",
      "Experience specifically mentioned as 'latest' Angular/React versions.",
      "Explicit mention of SASS."
    ],
    "overallComment": "Diveshan Thavarasa presents a solid profile for this position, particularly with proven experience in Angular, TypeScript, REST APIs, and relevant project work in React. The candidate's educational background and language skills meet the requirements. The main gap is the lack of specified AWS experience, though Azure experience provides a good foundation. With a demonstrated ability to learn and current Master's studies, the candidate shows strong potential and is a moderate fit, likely becoming a strong fit with demonstrable enthusiasm for learning AWS."
  },
  "interviewPreparation": {
    "likelyQuestions": [
      "Can you describe your experience with Angular? Which versions have you used? Tell us about the performance optimization you implemented.",
      "Describe your experience with TypeScript. Why do you prefer it?",
      "Walk us through your experience designing or consuming REST APIs.",
      "Tell us about your experience with React based on your 'Food Corner Cafe' project.",
      "How familiar are you with HTML5 and CSS, including responsive design and preprocessors like SASS?",
      "The role involves AWS services like S3, CloudFront, IAM, and API Gateway. What is your experience with cloud platforms, particularly AWS?",
      "Describe a challenging technical problem you faced and how you solved it.",
      "How do you approach learning new technologies, like the AWS stack mentioned?",
      "Why are you interested in working at Siemens AG in Manheim?",
      "How would you rate your German language skills (B1)? Can you conduct a technical discussion in German?",
      "Tell us about your work ensuring WCAG 2.0 compliance."
    ],
    "answersTips": [
      "Use the STAR method (Situation, Task, Action, Result) to structure answers about past experiences.",
      "Highlight the quantifiable result (50% load time reduction) when discussing the Angular optimization.",
      "Connect your Azure experience (CI/CD, Logic Apps) to general cloud concepts and express strong enthusiasm and a clear plan for learning AWS quickly.",
      "Emphasize your hands-on experience with both Angular and React, showing versatility.",
      "Be prepared to discuss the specific technical details of your projects and work experiences.",
      "Clearly articulate your understanding of REST principles.",
      "When discussing weaknesses (like lack of AWS), frame it positively, focusing on your eagerness and ability to learn.",
      "Prepare specific examples demonstrating your familiarity with HTML5/CSS and responsive design.",
      "Be ready to answer some questions or parts of the interview in German to demonstrate your B1 level."
    ],
    "strengthsToHighlight": [
      "Strong practical experience in Angular and TypeScript.",
      "Proven ability to optimize frontend performance and ensure accessibility (WCAG).",
      "Experience with React through a full-stack personal project.",
      "Solid understanding and use of REST APIs.",
      "Familiarity with cloud concepts and CI/CD through Azure experience.",
      "Relevant academic background (BSc and ongoing MEng).",
      "Good language skills: English (C1) and German (B1).",
      "Demonstrated ability to learn and adapt (current student, project diversity)."
    ],
    "weaknessesToHandle": [
      "Lack of direct experience with the specified AWS services (S3, CloudFront, IAM, API Gateway).",
      "CV doesn't explicitly state experience with the *latest* framework versions.",
      "CSS preprocessor (SASS) experience not explicitly mentioned."
    ]
  },
  "jobTrackingMeta": {
    "company": "Siemens AG",
    "jobTitle": "Frontend Developer Role (Temporary)",
    "location": "Manheim, on-site",
    "languageRequirement": "German & English",
    "applicationStatus": "notApplied",
    "appliedDate": "",
    "notes": "Temporary, full-time position focused on frontend development (Angular/React, TypeScript) and native cloud solutions. Requires degree and familiarity with HTML5, CSS (SASS), REST APIs. AWS experience desired. Location is Manheim, on-site. Requires both German and English proficiency."
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
