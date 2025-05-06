import { useState } from "react";
import { useJobApplicationContext } from "../JobApplicationProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { JobApplicationModel } from "../JobApplicationModel";
import { JobTrackingModel } from "../JobTrackingModel";
import { generateJobDetails } from "../jobDetails";

export default function useGenerateJobResponse(
  cv: string,
  jobDescription: string,
  additional: string | null = null,
  index: number | null = null
) {
  const { state, dispatch } = useJobApplicationContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const prompt = `CV: ${cv}, Job description: ${jobDescription} ${
    additional && "more information: " + additional
  }`;

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
        const cleanedText = sanitizeJson(response.text);
        dispatch({
          type: "SET_AI_RESPONSE",
          payload: JSON.parse(cleanedText),
        });
        const index = saveResponse(cleanedText);
        navigate(`/application/${index}`);
      } else {
        toast("Failed to Generate response, try again!!");
      }
    } catch (e) {
      toast("Failed to Generate response, try again later!!");
      console.log(e);
    }
  };

  function sanitizeJson(jsonString: string) {
    return (
      jsonString
        // Remove unescaped control characters except \n, \t (e.g. \u0000 - \u001F, \u007F)
        // eslint-disable-next-line no-control-regex
        .replace(/[\u0000-\u0019\u007F]/g, "")
        // Replace raw newlines inside strings with escaped \n
        .replace(/\r?\n/g, "\\n")
    );
  }

  const saveResponse = (response: string) => {
    if (cv) {
      dispatch({ type: "STORE_CV", payload: cv });
    }
    // store application data
    const responseData: JobApplicationModel = JSON.parse(response);

    // if new generate call
    // save tracking, jobApplication
    // return new index
    if (index == null) {
      responseData.jobTrackingMeta.id = state.applicationTrackingList.length;
      responseData.jobDescription = jobDescription;
      dispatch({ type: "ADD_APPLICATION", payload: responseData });

      // store tracking data
      const jobTrackingData: JobTrackingModel = {
        position: responseData.jobTrackingMeta.jobTitle,
        company: responseData.jobTrackingMeta.company,
        location: responseData.jobTrackingMeta.location,
        language: responseData.jobTrackingMeta.languageRequirement,
        siteUrl: null,
        status: responseData.jobTrackingMeta.applicationStatus,
        appliedOn: null,
        applicationId: state.allApplications.length, //TODO: double check, whether allApplication was alread updated or not
        trackingId: state.applicationTrackingList.length,
      };
      dispatch({ type: "TRACK_NEW_APPLICATION", payload: jobTrackingData });

      return state.allApplications.length;
    }

    // if regenerate
    // update jobApplication, no need to update tracking details
    // return old index
    else {
      responseData.jobTrackingMeta.id =
        state.allApplications[index].jobTrackingMeta.id;
      responseData.jobDescription = jobDescription;
      dispatch({
        type: "UPDATE_APPLICATION",
        payload: { id: index, data: responseData },
      });
      return index;
    }
  };

  return { generateJobApplication, loading };
}
