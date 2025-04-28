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
import { JobApplicationModel } from "@/lib/JobApplicationModel";
import { useState } from "react";

type Props = {
  item: JobApplicationModel | null;
  title: string;
  children: React.ReactNode;
};

function TrackApplicationDialog({ item, title, children }: Props) {
  const [jobTitle, setJobTitle] = useState(
    item?.jobTrackingMeta.jobTitle || ""
  );
  const [company, setCompany] = useState(item?.jobTrackingMeta.company || "");
  const [location, setLocation] = useState(
    item?.jobTrackingMeta.location || ""
  );
  const [appliedDate, setAppliedDate] = useState("");
  const [status, setStatus] = useState("notApplied");

  const updateTrackingApplication = () => {
    console.log("Jobtitle: ", jobTitle);
    console.log("company: ", company);
    console.log("loca: ", location);
    console.log("date: ", appliedDate);
    console.log("status: ", status);
  };

  return (
    <Dialog>
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
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
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
                  <SelectItem value="call">Call Received</SelectItem>
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
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
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
