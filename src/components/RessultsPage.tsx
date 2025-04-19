import { CheckCircle, Lightbulb } from "lucide-react";
import { JobApplicationAnalysis } from "../lib/JobApplicationAnalysis";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

function RessultsPage() {
  const data: JobApplicationAnalysis = JSON.parse(
    localStorage.getItem("AIresponse") || "{}"
  );

  function getScoreBar(score: number, totalBlocks = 10) {
    const filledBlocks = Math.round((score / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return "🟩".repeat(filledBlocks) + "⬜".repeat(emptyBlocks);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* User details */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          🧑‍💻 {data.candidate?.candidate_name || "Hey there!"}
        </h1>
        <p className="text-gray-600 text-base">
          {data.candidate?.current_status}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {data.candidate?.keySkillsInCV?.map((skill) => (
            <Badge key={skill} className="bg-green-500 text-white">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* ATS analysis */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          📊 ATS Analysis
        </h2>
        <p className="text-gray-600">Key skills required in Job Description:</p>
        <div className="flex flex-wrap gap-2">
          {data.atsAnalysis.keySkillsRequired.map((skill) => (
            <Badge key={skill} className="bg-blue-500 text-white">
              {skill}
            </Badge>
          ))}
        </div>
        <p className="text-gray-700 mt-4">
          🎯 <span className="font-medium">ATS Compatibility Score:</span>{" "}
          <span className="font-bold">{data.atsAnalysis.score}/100</span>{" "}
          {getScoreBar(data.atsAnalysis.score)}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">⚠️ Missing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              {data.atsAnalysis.issues.map((issue) => (
                <ul key={issue} className="list-disc pl-5">
                  <li>{issue}</li>
                </ul>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">
                ✅ Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              {data.atsAnalysis.recommendations.map((rec) => (
                <ul key={rec} className="list-disc pl-5">
                  <li>{rec}</li>
                </ul>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Position alignment */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          📌 Position Alignment Analysis
        </h2>
        <p className="text-gray-700">
          Fit level:{" "}
          <span className="font-semibold">
            {data.positionAlignment.fitLevel}
          </span>
        </p>
        <p className="text-gray-600">{data.positionAlignment.overallComment}</p>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {data.positionAlignment.matchedResponsibilities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">
                  ✅ Matched Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                {data.positionAlignment.matchedResponsibilities.map((item) => (
                  <ul key={item} className="list-disc pl-5">
                    <li>{item}</li>
                  </ul>
                ))}
              </CardContent>
            </Card>
          )}

          {data.positionAlignment.unmatchedResponsibilities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-red-500">
                  ⚠️ Unmatched Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                {data.positionAlignment.unmatchedResponsibilities.map(
                  (item) => (
                    <ul key={item} className="list-disc pl-5">
                      <li>{item}</li>
                    </ul>
                  )
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Interview prep */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          🧠 Interview Preparation Guidance
        </h2>
        <Tabs defaultValue="q&a">
          <TabsList className="mb-4">
            <TabsTrigger value="q&a">💬 Q&A</TabsTrigger>
            <TabsTrigger value="strengthWeakness">
              💡 Strengths & Weaknesses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="q&a">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">
                    ❓ Likely Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  {data.interviewPreparation.likelyQuestions.map((question) => (
                    <ul key={question} className="list-disc pl-5">
                      <li>{question}</li>
                    </ul>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-yellow-600">
                    💡 Answer Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  {data.interviewPreparation.answersTips.map((tip) => (
                    <ul key={tip} className="list-disc pl-5">
                      <li>{tip}</li>
                    </ul>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="strengthWeakness">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" /> Weaknesses to
                    Handle
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  {data.interviewPreparation.weaknessesToHandle.map(
                    (weakness) => (
                      <ul key={weakness} className="list-disc pl-5">
                        <li>{weakness}</li>
                      </ul>
                    )
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" /> Strengths to
                    Highlight
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  {data.interviewPreparation.strengthsToHighlight.map(
                    (strength) => (
                      <ul key={strength} className="list-disc pl-5">
                        <li>{strength}</li>
                      </ul>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

export default RessultsPage;
