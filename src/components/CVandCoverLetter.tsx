import { useParams } from "react-router-dom";
import { JobApplicationAnalysis } from "../lib/JobApplicationAnalysis";
import RessultsPage from "./RessultsPage";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";

function CVandCoverLetter() {
  const { id } = useParams();

  const localData = localStorage.getItem("allApplications") || "[]";
  const allApplications: JobApplicationAnalysis[] = JSON.parse(localData);
  const [data, setData] = useState<JobApplicationAnalysis | null>();

  useEffect(() => {
    console.log("id: ", id);
    if (id) {
      const index = parseInt(id, 10);
      console.log(index);
      console.log(allApplications);
      const found = allApplications[index];
      console.log(found);
      setData(found);
    }
  }, [id]);

  if (!data) {
    return <NotFound />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      <Tabs
        className="flex items-center justify-center"
        defaultValue="analysis">
        <TabsList>
          <TabsTrigger value="analysis">🔍 Analysis</TabsTrigger>
          <TabsTrigger value="coverletter">✉️ Cover Letter</TabsTrigger>
          <TabsTrigger value="cv">📄 Resume</TabsTrigger>
        </TabsList>
        <TabsContent value="coverletter">
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-4xl">
              <CardContent className="p-6">
                <p className="whitespace-pre-wrap leading-relaxed text-gray-800">
                  {data.coverLetter}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="cv">
          <div className="flex gap-4 mt-4">
            <div className="space-y-2">
              <p className="text-lg font-bold">💡 CV Improvement suggestions</p>
              {data.resumeOptimization.cvImprovementSuggestions.map((item) => (
                <ul className="list-disc pl-5">
                  <li className="text-gray-600">{item}</li>
                </ul>
              ))}
            </div>
            <div>
              <p className="text-lg font-bold mb-2">✨ Optimized Resume</p>
              <ScrollArea className="h-[700px]">
                <Card className="w-full max-w-4xl">
                  <CardContent className="flex aspect-auto p-6">
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-800">
                      {data.resumeOptimization.optimizedResume}
                    </p>
                  </CardContent>
                </Card>
              </ScrollArea>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="analysis">
          <RessultsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CVandCoverLetter;
