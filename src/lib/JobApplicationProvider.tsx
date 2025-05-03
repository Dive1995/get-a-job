import React, { createContext, useContext, useReducer } from "react";
import { JobApplicationModel } from "./JobApplicationModel";
import { JobTrackingModel } from "./JobTrackingModel";

const localData = localStorage.getItem("allApplications") || "[]";
const allApplications: JobApplicationModel[] = JSON.parse(localData);

const localTrackingList =
  localStorage.getItem("applicationTrackingList") || "[]";
const applicationTrackingList: JobTrackingModel[] =
  JSON.parse(localTrackingList);

const storedCV: string | null = localStorage.getItem("existingCV") || null;

type Actions =
  | { type: "STORE_CV"; payload: string }
  | { type: "SET_AI_RESPONSE"; payload: JobApplicationModel }
  | { type: "REMOVE_APPLICATION"; payload: number }
  | { type: "UPDATE_APPLICATION"; payload: JobApplicationModel }
  | { type: "ADD_APPLICATION"; payload: JobApplicationModel }
  | { type: "TRACK_NEW_APPLICATION"; payload: JobTrackingModel }
  | {
      type: "UPDATE_TRACK_APPLICATION";
      payload: { id: number; data: JobTrackingModel }; //TODO: change this once DB is integrated
    };

type StateType = {
  allApplications: JobApplicationModel[];
  existingCV: string | null;
  AIresponse: JobApplicationModel | null;
  applicationTrackingList: JobTrackingModel[];
};

interface JobApplicationContextType {
  state: StateType;
  dispatch: React.Dispatch<Actions>;
}

const JobApplicationContext = createContext<
  JobApplicationContextType | undefined
>(undefined);

const useJobApplicationContext = () => {
  const context = useContext(JobApplicationContext);

  if (context?.state == undefined) {
    throw new Error(
      "to use useJobApplicationContext, wrap the component inside JobApplicationProvider."
    );
  }

  return context;
};

const reducer = (state: StateType, action: Actions) => {
  switch (action.type) {
    case "ADD_APPLICATION":
      state.allApplications.push(action.payload);
      localStorage.setItem(
        "allApplications",
        JSON.stringify(state.allApplications)
      );
      return state;
    case "TRACK_NEW_APPLICATION": {
      const trackingList = state.applicationTrackingList;
      trackingList.push(action.payload);

      localStorage.setItem(
        "applicationTrackingList",
        JSON.stringify(trackingList)
      );
      return { ...state, applicationTrackingList: trackingList };
    }
    case "UPDATE_TRACK_APPLICATION": {
      const updatedList = state.applicationTrackingList.map((item, index) =>
        index === action.payload.id ? action.payload.data : item
      );
      localStorage.setItem(
        "applicationTrackingList",
        JSON.stringify(updatedList)
      );
      return {
        ...state,
        applicationTrackingList: updatedList,
      };
    }
    case "STORE_CV":
      localStorage.setItem("existingCV", action.payload);
      return { ...state, existingCV: action.payload };
    case "SET_AI_RESPONSE":
      return { ...state, AIresponse: action.payload };
    default:
      return state;
  }
};

type Props = { children: React.ReactNode };

function JobApplicationProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, {
    allApplications: allApplications,
    existingCV: storedCV,
    AIresponse: null,
    applicationTrackingList: applicationTrackingList,
  });

  return (
    <JobApplicationContext.Provider value={{ state, dispatch }}>
      {children}
    </JobApplicationContext.Provider>
  );
}

export { useJobApplicationContext, JobApplicationProvider };
