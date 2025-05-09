import { useState } from "react";
import { useJobApplicationContext } from "../JobApplicationProvider";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { JobApplicationModel } from "../JobApplicationModel";
import { JobTrackingModel } from "../JobTrackingModel";
import { generateJobDetails } from "../jobDetails";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export default function useGenerateJobResponse(
  cv: string,
  jobDescription: string,
  additional: string | null = null,
  id: string | null = null
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
        const id = await saveResponse(cleanedText);
        navigate(`/application/${id}`);
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

  const saveResponse = async (response: string) => {
    if (cv) {
      if (state.existingCV == null) {
        const cvRef = doc(collection(db, "allApplications"));
        await setDoc(cvRef, {
          value: cv,
        });

        dispatch({ type: "STORE_CV", payload: { value: cv, id: cvRef.id } });
      } else {
        const cvRef = doc(db, "existingCV", state.existingCV.id);
        await setDoc(cvRef, { value: cv });
        dispatch({
          type: "STORE_CV",
          payload: { ...state.existingCV, value: cv },
        });
      }
    }
    // store application data
    const responseData: JobApplicationModel = JSON.parse(response);

    // if new generate call
    // save tracking, jobApplication
    // return new id
    if (id == null) {
      // responseData.jobTrackingMeta.id = state.applicationTrackingList.length;
      responseData.jobDescription = jobDescription;

      const newApplRef = doc(collection(db, "allApplications"));
      responseData.id = newApplRef.id;
      await setDoc(newApplRef, responseData);

      // const newDocRef = await addDoc(
      //   collection(db, "allApplications"),
      //   responseData
      // );
      dispatch({ type: "ADD_APPLICATION", payload: responseData });

      // store tracking data
      const newTrackingDocRef = doc(collection(db, "applicationTrackingList"));

      const jobTrackingData: JobTrackingModel = {
        id: newTrackingDocRef.id, // pass the created id
        position: responseData.jobTrackingMeta.jobTitle,
        company: responseData.jobTrackingMeta.company,
        location: responseData.jobTrackingMeta.location,
        language: responseData.jobTrackingMeta.languageRequirement,
        siteUrl: null,
        status: responseData.jobTrackingMeta.applicationStatus,
        appliedOn: null,
        applicationId: newApplRef.id,
      };

      // Write the data to Firestore
      await setDoc(newTrackingDocRef, jobTrackingData);
      dispatch({ type: "TRACK_NEW_APPLICATION", payload: jobTrackingData });

      return newApplRef.id;
    }

    // if regenerate
    // update jobApplication, no need to update tracking details
    // return old id
    else {
      // responseData.jobTrackingMeta.id = state.allApplications[id].jobTrackingMeta.id;
      responseData.jobDescription = jobDescription;
      const jobRef = doc(db, "allApplications", id);
      const resp = await setDoc(jobRef, responseData);
      console.log(resp);

      dispatch({
        type: "UPDATE_APPLICATION",
        payload: { id: id, data: responseData },
      });
      return id;
    }
  };

  return { generateJobApplication, loading };
}
