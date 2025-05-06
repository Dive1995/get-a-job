import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useJobApplicationContext } from "@/lib/JobApplicationProvider";
import useGenerateJobResponse from "@/lib/hooks/useGenerateJobResponse";

function NewApplicationPage() {
  // const navigate = useNavigate();
  const { state } = useJobApplicationContext();

  const [jobDescription, setJobDescription] = useState<string>("");
  const [cv, setCv] = useState<string>(state.existingCV || "");
  const [additional, setAdditional] = useState<string | null>(null);

  const { loading, generateJobApplication } = useGenerateJobResponse(
    cv,
    jobDescription,
    additional,
    null
  );

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
        <span className="mr-2">🚀</span>
        <span className="text-[#4fa252]">
          One step closer to your dream job.
        </span>
      </h2>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <div className="">
          <Label className="text-gray-600 text-lg mb-2" htmlFor="cv">
            CV
          </Label>
          <Textarea
            className="bg-white h-[400px]"
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
            className="bg-white h-[400px]"
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
          className="bg-white h-[100px]"
          placeholder="✍🏼 Write about your skills and experience, to provide more personal context."
          id="additional"
          onChange={(e) => {
            setAdditional(e.target.value);
          }}
        />
      </div>

      <Button
        onClick={generateJobApplication}
        className={`w-full sm:w-20 my-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:opacity-90 transition duration-300 disabled:cursor-not-allowed`}
        disabled={cv == null || jobDescription == null || jobDescription == ""}>
        Generate
      </Button>
    </div>
  );
}

export default NewApplicationPage;
