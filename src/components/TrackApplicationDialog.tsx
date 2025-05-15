import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { JobTrackingModel } from "@/lib/JobTrackingModel";
import { useJobApplicationContext } from "@/lib/JobApplicationProvider";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/config/firebaseConfig";
import { useAuth } from "@/lib/UserContext";

type Props = {
  item: JobTrackingModel | null;
  id: string | null;
  title: string;
  children: React.ReactNode;
};

function TrackApplicationDialog({ item, title, children, id = null }: Props) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(item?.position || "");
  const [company, setCompany] = useState(item?.company || "");
  const [location, setLocation] = useState(item?.location || "");
  const [language, setLanguage] = useState(item?.language || "");
  const [appliedOn, setAppliedOn] = useState(item?.appliedOn || "");
  const [status, setStatus] = useState("notApplied");
  const { user } = useAuth();

  const today = new Date().toISOString().split("T")[0];

  const { dispatch } = useJobApplicationContext();

  const updateTrackingApplication = async () => {
    const userId = user?.uid; // Replace with the actual userId from Firebase auth
    if (userId) {
      if (item && id != null) {
        const updatedTrackAppl = {
          ...item,
          status,
          position,
          company,
          location,
          language,
          appliedOn,
        };

        const jobRef = doc(db, "users", userId, "tracking", id);
        await setDoc(jobRef, updatedTrackAppl);
        dispatch({
          type: "UPDATE_TRACK_APPLICATION",
          payload: updatedTrackAppl,
        });
      } else {
        const newTrackingDocRef = doc(
          collection(db, "users", userId, "tracking")
        );

        const jobTrackingData: JobTrackingModel = {
          id: newTrackingDocRef.id,
          position,
          company,
          location,
          language,
          siteUrl: null,
          status,
          appliedOn,
          applicationId: null,
          // userId: userId, // Add userId to tracking data
        };

        await setDoc(newTrackingDocRef, jobTrackingData);
        dispatch({ type: "TRACK_NEW_APPLICATION", payload: jobTrackingData });
      }
    }

    setOpen(false);
  };

  // const updateTrackingApplication = async () => {
  //   if (item && id != null) {
  //     // update existing tracking data
  //     const updatedTrackAppl = {
  //       ...item,
  //       status,
  //       position,
  //       company,
  //       location,
  //       language,
  //       appliedOn,
  //     };

  //     const jobRef = doc(db, "applicationTrackingList", id);
  //     await setDoc(jobRef, updatedTrackAppl);
  //     dispatch({
  //       type: "UPDATE_TRACK_APPLICATION",
  //       payload: updatedTrackAppl,
  //     });
  //   } else {
  //     // new tracking data
  //     const newTrackingDocRef = doc(collection(db, "applicationTrackingList"));

  //     const jobTrackingData: JobTrackingModel = {
  //       id: newTrackingDocRef.id, // pass the created id
  //       position,
  //       company,
  //       location,
  //       language,
  //       siteUrl: null,
  //       status,
  //       appliedOn,
  //       applicationId: null,
  //     };

  //     // Write the data to Firestore
  //     await setDoc(newTrackingDocRef, jobTrackingData);
  //     dispatch({ type: "TRACK_NEW_APPLICATION", payload: jobTrackingData });
  //   }
  //   setOpen(false);
  // };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Label className="text-gray-700">📅 Applied on</Label>
              <Input
                type="date"
                value={appliedOn}
                onChange={(e) => setAppliedOn(e.target.value)}
                max={today}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700">⚪ Status</Label>
              <Select
                defaultValue="notApplied"
                value={status}
                onValueChange={(val) => setStatus(val)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notApplied">Not applied</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="callreceived">Call Received</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="selected">Selected</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">💼 Position</Label>
            <Input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">🏢 Company</Label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">📍 Location</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">🌐 Language</Label>
            <Input
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">🔗 Job post link</Label>
            <Input value="-" />
          </div>
          <Button
            onClick={updateTrackingApplication}
            className={`w-full`}
            // disabled={item == null}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TrackApplicationDialog;
