import { useState } from "react";
import { generateJobDetails } from "../lib/jobDetails";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useNavigate } from "react-router-dom";
import { JobApplicationAnalysis } from "../lib/JobApplicationAnalysis";
import { toast } from "sonner";

const stored = localStorage.getItem("existingCV");
const existingCV: string | null = stored ? stored : null;

function NewApplicationPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState<string | null>(null);
  const [cv, setCv] = useState<string | null>(existingCV ? existingCV : null);
  const [additional, setAdditional] = useState<string | null>(null);

  const prompt = `CV: ${cv}, Job description: ${jobDescription} ${
    additional && "more information: " + additional
  }`;
  //   const prompt = `CV: ${cv}
  // Job description: ${jobDescription}
  // based on the CV and Job description, Generate a complete JSON object strictly following the schema below. Do not return the schema, only a fully filled JSON that follows the given schema. Do not include explanations, comments, or partial structures.
  // `;

  const generateJobApplication = async () => {
    try {
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
    } catch (e) {
      toast("Failed to Generate response, try again later!!");
      console.log(e);
    }
  };

  const saveResponse = (response: string) => {
    if (cv) {
      localStorage.setItem("existingCV", cv);
    }

    const data = localStorage.getItem("allApplications") || "[]";
    const allApplications: JobApplicationAnalysis[] = JSON.parse(data);

    allApplications.push(JSON.parse(response));

    localStorage.setItem("allApplications", JSON.stringify(allApplications));
    return allApplications.length - 1;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <span className="text-6xl animate-ping">✨</span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold">
        <span className="mr-2">⭐</span>
        <span className="bg-gradient-to-tr from-cyan-300 via-teal-400 to-green-400 bg-clip-text text-transparent">
          One step closer to your dream job.
        </span>
      </h2>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <div className="">
          <Label className="text-gray-600 text-lg mb-2" htmlFor="cv">
            CV
          </Label>
          <Textarea
            className="bg-gray-50 h-[400px]"
            placeholder="📋 Paste your CV here."
            id="cv"
            value={cv || ""}
            onChange={(e) => setCv(e.target.value)}
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
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        <Label className="text-gray-600 text-lg mb-2" htmlFor="additional">
          Additional information{" "}
          <span className="text-gray-400 text-sm">(optional)</span>:
        </Label>
        <Textarea
          className="bg-gray-50 h-[100px]"
          placeholder="✍🏼 Write about your skills and experience, to provide more personal context."
          id="additional"
          onChange={(e) => {
            setAdditional(e.target.value);
          }}
        />
      </div>

      <Button
        onClick={generateJobApplication}
        className={`my-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:opacity-90 transition duration-300`}
        disabled={cv == null || jobDescription == null || jobDescription == ""}>
        Generate
      </Button>
    </div>
  );
}

export default NewApplicationPage;
