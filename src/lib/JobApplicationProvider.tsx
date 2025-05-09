import React, { createContext, useContext, useEffect, useReducer } from "react";
import { JobApplicationModel } from "./JobApplicationModel";
import { JobTrackingModel } from "./JobTrackingModel";
import { db } from "./config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

type Actions =
  | { type: "STORE_CV"; payload: { value: string; id: string } }
  | { type: "SET_AI_RESPONSE"; payload: JobApplicationModel }
  | { type: "INITIALIZE_ALL_APPLICATIONS"; payload: JobApplicationModel[] }
  | {
      type: "INITIALIZE_ALL_TRACKING_APPLICATIONS";
      payload: JobTrackingModel[];
    }
  | { type: "REMOVE_APPLICATION"; payload: number }
  | {
      type: "UPDATE_APPLICATION";
      payload: { id: string; data: JobApplicationModel };
    }
  | { type: "ADD_APPLICATION"; payload: JobApplicationModel }
  | { type: "REMOVE_APPLICATION"; payload: string }
  | { type: "REMOVE_TRACKING_APPLICATION"; payload: string }
  | { type: "TRACK_NEW_APPLICATION"; payload: JobTrackingModel }
  | {
      type: "UPDATE_TRACK_APPLICATION";
      payload: JobTrackingModel; //TODO: change this once DB is integrated
    };

type StateType = {
  allApplications: JobApplicationModel[];
  existingCV: { value: string; id: string } | null;
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
    case "INITIALIZE_ALL_APPLICATIONS":
      console.log("allPplications: ", action.payload);
      return { ...state, allApplications: action.payload };
    case "INITIALIZE_ALL_TRACKING_APPLICATIONS":
      console.log("tracking list: ", action.payload);
      return { ...state, applicationTrackingList: action.payload };
    case "ADD_APPLICATION":
      state.allApplications.push(action.payload);
      return state;
    case "REMOVE_APPLICATION": {
      const applications: JobApplicationModel[] = [];
      state.allApplications.forEach((item) => {
        if (item.id != action.payload) {
          applications.push(item);
        }
      });
      return { ...state, allApplications: applications };
    }
    case "REMOVE_TRACKING_APPLICATION": {
      const applications: JobTrackingModel[] = [];
      state.applicationTrackingList.forEach((item) => {
        if (item.id != action.payload) {
          applications.push(item);
        }
      });

      return { ...state, applicationTrackingList: applications };
    }
    case "TRACK_NEW_APPLICATION": {
      const trackingList = state.applicationTrackingList;
      trackingList.push(action.payload);
      return { ...state, applicationTrackingList: trackingList };
    }
    case "UPDATE_TRACK_APPLICATION": {
      const updatedList = state.applicationTrackingList.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

      return {
        ...state,
        applicationTrackingList: updatedList,
      };
    }
    case "UPDATE_APPLICATION": {
      const updatedList = state.allApplications.map((item) =>
        item.id === action.payload.id ? action.payload.data : item
      );

      return {
        ...state,
        allApplications: updatedList,
      };
    }
    case "STORE_CV":
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
    allApplications: [],
    existingCV: null,
    AIresponse: null,
    applicationTrackingList: [],
  });

  useEffect(() => {
    const fetchAllApplications = async () => {
      const querySnapshot = await getDocs(collection(db, "allApplications"));
      const apps: JobApplicationModel[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as JobApplicationModel),
        id: doc.id,
      }));

      dispatch({ type: "INITIALIZE_ALL_APPLICATIONS", payload: apps });
    };

    const fetchTrackingApplications = async () => {
      const querySnapshot = await getDocs(
        collection(db, "applicationTrackingList")
      );
      const apps: JobTrackingModel[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as JobTrackingModel),
        id: doc.id,
      }));

      dispatch({ type: "INITIALIZE_ALL_TRACKING_APPLICATIONS", payload: apps });
    };

    const fetchExistingCV = async () => {
      const querySnapshot = await getDocs(
        collection(db, "applicationTrackingList")
      );
      const apps: { value: string; id: string } = querySnapshot.docs.map(
        (doc) => ({
          value: doc.data().value,
          id: doc.id,
        })
      )[0];

      dispatch({ type: "STORE_CV", payload: apps });
    };

    fetchAllApplications();
    fetchTrackingApplications();
    fetchExistingCV();
  }, []);

  return (
    <JobApplicationContext.Provider value={{ state, dispatch }}>
      {children}
    </JobApplicationContext.Provider>
  );
}

export { useJobApplicationContext, JobApplicationProvider };
