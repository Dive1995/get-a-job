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
import { JobApplicationAnalysis } from "@/lib/JobApplicationAnalysis";

type Props = {
  item: JobApplicationAnalysis | null;
  title: string;
  children: React.ReactNode;
};

function TrackApplicationDialog({ item, title, children }: Props) {
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
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700">⚪ Status</Label>
              <Select defaultValue="notApplied">
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
            <Input value={item?.jobTrackingMeta.jobTitle} />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">🏢 Company</Label>
            <Input value={item?.company.name} />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">📍 Location</Label>
            <Input value={item?.company.address} />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">🔗 Job post link</Label>
            <Input value="-" />
          </div>
          <Button className={`w-full`} disabled={item == null}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TrackApplicationDialog;
