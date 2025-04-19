import { Dot } from "lucide-react";
import { JobApplicationAnalysis } from "../lib/JobApplicationAnalysis";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function RessultsPage() {
  const data: JobApplicationAnalysis = JSON.parse(
    localStorage.getItem("AIresponse") || "{}"
  );

  function getScoreBar(score, totalBlocks = 10) {
    const filledBlocks = Math.round((score / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return "🟩".repeat(filledBlocks) + "⬜".repeat(emptyBlocks);
  }

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 my-4">
      {/* user details from CV */}
      <section className="space-y-1">
        <h1 className="text-3xl font-semibold">
          🧑‍💻 {data.candidate?.candidate_name || "Hey there!"}
        </h1>
        <p className="text-gray-600">{data.candidate?.current_status}</p>
        <div className="flex gap-1 flex-wrap mt-4">
          {data.candidate?.keySkillsInCV?.map((skill) => (
            <Badge className="bg-green-500">{skill}</Badge>
          ))}
        </div>
      </section>

      {/* ATS analysis */}
      <section className="my-8 lg:my-16 space-y-2">
        <h2 className="text-2xl font-semibold">📊 ATS analysis</h2>
        {/* skills in description */}
        <p className="text-gray-600">Key skill required in Job description</p>
        <div className="flex gap-1 flex-wrap">
          {data.atsAnalysis.keySkillsRequired.map((skill) => (
            <Badge className="bg-blue-400">{skill}</Badge>
          ))}
        </div>
        {/* score */}
        <p className="mt-4 text-gray-600">
          🎯 ATS Compatibility Score:{" "}
          <span className="font-bold">{data.atsAnalysis.score}/100</span>{" "}
          {getScoreBar(data.atsAnalysis.score)}
        </p>

        {/* analysis */}
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <Card className="gap-2">
            <CardHeader>
              <CardTitle>⚠️ Missing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-gray-600">
              {data.atsAnalysis.issues.map((issue) => (
                <p className="text-sm flex items-center">
                  <Dot /> {issue}
                </p>
              ))}
            </CardContent>
          </Card>
          <Card className="gap-2">
            <CardHeader>
              <CardTitle>✅ Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-gray-600">
              {data.atsAnalysis.recommendations.map((tec) => (
                <p className="text-sm flex items-center">
                  <Dot /> {tec}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* position alignement */}
      <section>
        <h2 className="text-2xl font-semibold">
          📌 Position Alignement analysis
        </h2>
        <p className="text-gray-600 mt-2">
          Fit level:{" "}
          <span className="font-semibold">
            {data.positionAlignment.fitLevel}
          </span>
        </p>
        <p className=" text-gray-600 mt-4">
          {data.positionAlignment.overallComment}
        </p>

        {/* responsibilities */}
        <div className="grid md:grid-cols-2 gap-4 my-4">
          {data.positionAlignment.matchedResponsibilities.length > 0 && (
            <Card className="gap-2">
              <CardHeader>
                <CardTitle>✅ Matched responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-gray-600">
                {data.positionAlignment.matchedResponsibilities.map((issue) => (
                  <p className="text-sm flex items-center">
                    <Dot /> {issue}
                  </p>
                ))}
              </CardContent>
            </Card>
          )}
          {data.positionAlignment.unmatchedResponsibilities.length > 0 && (
            <Card className="gap-2">
              <CardHeader>
                <CardTitle>⚠️ Unmatched responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-gray-600">
                {data.positionAlignment.unmatchedResponsibilities.map((tec) => (
                  <p className="text-sm flex items-center">
                    <Dot /> {tec}
                  </p>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

export default RessultsPage;
