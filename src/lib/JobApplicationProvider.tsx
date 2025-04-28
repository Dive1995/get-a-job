import React, { createContext, useContext, useReducer } from "react";
import { JobApplicationModel } from "./JobApplicationModel";

const localData = localStorage.getItem("allApplications") || "[]";
const allApplications: JobApplicationModel[] = JSON.parse(localData);

const storedCV: string | null = localStorage.getItem("existingCV") || null;

type Actions =
  | { type: "STORE_CV"; payload: string }
  | { type: "SET_AI_RESPONSE"; payload: JobApplicationModel }
  | { type: "REMOVE_APPLICATION"; payload: number }
  | { type: "UPDATE_APPLICATION"; payload: JobApplicationModel }
  | { type: "ADD_APPLICATION"; payload: JobApplicationModel };

type StateType = {
  allApplications: JobApplicationModel[];
  existingCV: string | null;
  AIresponse: JobApplicationModel | null;
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
  });

  return (
    <JobApplicationContext.Provider value={{ state, dispatch }}>
      {children}
    </JobApplicationContext.Provider>
  );
}

export { useJobApplicationContext, JobApplicationProvider };
