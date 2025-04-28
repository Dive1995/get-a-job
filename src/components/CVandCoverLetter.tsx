import { useParams } from "react-router-dom";
import { JobApplicationModel } from "../lib/JobApplicationModel";
import RessultsPage from "./RessultsPage";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import { useJobApplicationContext } from "@/lib/JobApplicationProvider";

function CVandCoverLetter() {
  const { id } = useParams();

  const { state } = useJobApplicationContext();
  const [data, setData] = useState<JobApplicationModel | null>();

  useEffect(() => {
    console.log("id: ", id);
    if (id) {
      const index = parseInt(id, 10);
      const found = state.allApplications[index];
      setData(found);
    }
  }, [id]);

  if (!data) {
    return <NotFound />;
  }

  return (
    <div className="px-4 py-6 space-y-12">
      <Tabs
        className="flex items-center justify-center"
        defaultValue="analysis">
        <TabsList>
          <TabsTrigger value="analysis">🔍 Analysis</TabsTrigger>
          <TabsTrigger value="coverletter">✉️ Cover Letter</TabsTrigger>
          <TabsTrigger value="cv">📄 Resume</TabsTrigger>
        </TabsList>
        <TabsContent value="coverletter">
          <div className="md:flex gap-4 mt-4">
            <div className="space-y-2 flex-1">
              <p className="text-lg font-bold">🏢 About the compony</p>
              <p className="font-bold text-gray-800">{data.company.name}</p>
              {data.company.address && (
                <p className="text-gray-700 text-sm">
                  Location: {data.company.address}
                </p>
              )}
              {data.company.highlights &&
                data.company.highlights.map((item) => (
                  <ul className="list-disc pl-5">
                    <li className="text-gray-600">{item}</li>
                  </ul>
                ))}
            </div>
            <div className="flex-2">
              <p className="text-lg font-bold my-4 sm:mt-0 sm:mb-2">
                ✨ Cover Letter
              </p>

              <ScrollArea className="h-[700px]">
                <div className="flex items-center justify-center">
                  <Card className="w-full max-w-4xl">
                    <CardContent className="p-6">
                      <p className="whitespace-pre-wrap leading-relaxed text-gray-800">
                        {data.coverLetter}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="cv">
          <div className="md:flex gap-4 mt-4">
            <div className="space-y-2 flex-1">
              <p className="text-lg font-bold">💡 CV Improvement suggestions</p>
              {data.resumeOptimization.cvImprovementSuggestions.map((item) => (
                <ul className="list-disc pl-5">
                  <li className="text-gray-600">{item}</li>
                </ul>
              ))}
            </div>
            <div className="flex-2 my-4 md:my-0">
              <p className="text-lg font-bold my-4 sm:mt-0 sm:mb-2">
                ✨ Optimized Resume
              </p>
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
          <RessultsPage data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CVandCoverLetter;
