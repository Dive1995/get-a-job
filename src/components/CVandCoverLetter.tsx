import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate, useParams } from "react-router-dom";
import { JobApplicationModel } from "../lib/JobApplicationModel";
import RessultsPage from "./RessultsPage";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";
import { useJobApplicationContext } from "@/lib/JobApplicationProvider";
import { Button } from "./ui/button";
import RegenerateResponseDialog from "./RegenerateResponseDialog";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "@/lib/config/firebaseConfig";
import { useAuth } from "@/lib/UserContext";

function CVandCoverLetter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useJobApplicationContext();
  const [data, setData] = useState<JobApplicationModel | null>();

  useEffect(() => {
    if (id) {
      const found = state.allApplications.find((item) => (item.id = id));
      setData(found);
      setLoading(false);
    }
  }, [id, state]);

  const removeTrackingApplication = async () => {
    if (id != null && user?.uid != null) {
      const jobRef = doc(db, "allApplications", id);
      await deleteDoc(jobRef);
      dispatch({ type: "REMOVE_APPLICATION", payload: id });

      const trackingItem = state.applicationTrackingList.find(
        (item) => item.applicationId == id
      );

      if (trackingItem) {
        // const trackingRef = doc(db, "applicationTrackingList", trackingItem.id);
        const trackingRef = doc(
          db,
          "users",
          user.uid,
          "tracking",
          trackingItem.id
        );

        await deleteDoc(trackingRef);
        dispatch({
          type: "REMOVE_TRACKING_APPLICATION",
          payload: trackingItem.id,
        });
      }
      navigate(`/applications`);
    }
  };

  if (!data) {
    return <NotFound />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <span className="text-6xl animate-ping">✨</span>
      </div>
    );
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
      <div className="flex flex-col sm:flex-row space-y-2 space-x-2">
        <RegenerateResponseDialog
          cv={state.existingCV?.value ?? ""}
          jobDescription={data.jobDescription!}
          setLoading={setLoading}
          id={id!}>
          <Button
            className={`w-full sm:w-auto bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 text-white font-semibold py-2 px-4  shadow-md hover:opacity-90 transition duration-300 disabled:cursor-not-allowed`}>
            Regenerate
          </Button>
        </RegenerateResponseDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full sm:w-auto  hover:bg-red-500 hover:text-white">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                response.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={removeTrackingApplication}
                className="bg-red-500 hover:bg-red-600 text-white">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default CVandCoverLetter;
