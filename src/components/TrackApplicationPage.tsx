import { JobApplicationAnalysis } from "@/lib/JobApplicationAnalysis";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

function TrackApplicationPage() {
  const localData = localStorage.getItem("allApplications") || "[]";
  const allApplications: JobApplicationAnalysis[] = JSON.parse(localData);
  const [data, setData] = useState<JobApplicationAnalysis[]>([]);

  useEffect(() => {
    setData(allApplications);
  }, []);

  const showApplicationStatus = (status: string) => {
    switch (status) {
      case "notApplied":
        return {
          value: "Not applied",
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
        };
      case "applied":
        return {
          value: "Applied",
          bgColor: "bg-blue-100",
          textColor: "text-blue-600",
        };
      case "pending":
        return {
          value: "Pending",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-600",
        };
      case "callreceived":
        return {
          value: "Call received",
          bgColor: "bg-purple-100",
          textColor: "text-purple-600",
        };
      case "interview":
        return {
          value: "Interview",
          bgColor: "bg-indigo-100",
          textColor: "text-indigo-600",
        };
      case "selected":
        return {
          value: "Selected",
          bgColor: "bg-green-100",
          textColor: "text-green-600",
        };
      case "rejected":
        return {
          value: "Rejected",
          bgColor: "bg-red-100",
          textColor: "text-red-600",
        };
      default:
        return {
          value: "Unknown",
          bgColor: "bg-gray-100",
          textColor: "text-gray-400",
        };
    }
  };

  return (
    <div>
      {/* <h2 className="text-4xl font-bold">
        <span className="mr-2">👋</span>
        <span className="bg-gradient-to-tr from-cyan-300 via-teal-400 to-green-400 bg-clip-text text-transparent">
          Hey there!
        </span>
      </h2> */}

      <section className="my-4 md:my-8 flex items-center gap-4">
        <Card className="w-50">
          <CardContent className="flex items-center justify-center flex-col">
            <p className="text-4xl font-bold text-gray-700">{data.length}</p>
            <p className=" text-gray-400">Total applied</p>
          </CardContent>
        </Card>
        <Card className="w-50">
          <CardContent className="flex items-center justify-center flex-col">
            <p className="text-4xl font-bold text-gray-700">3</p>
            <p className=" text-gray-400">Respons received</p>
          </CardContent>
        </Card>
        <Card className="w-50">
          <CardContent className="flex items-center justify-center flex-col">
            <p className="text-4xl font-bold text-gray-700">3</p>
            <p className=" text-gray-400">Applied this week</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Table>
          <TableCaption>A list of your recent applications.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              {/* className="w-[100px]" */}
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Site</TableHead>
              <TableHead>status</TableHead>
              <TableHead>applied on</TableHead>
              <TableHead>Edit</TableHead>
              {/* <TableHead className="text-right">Amount</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              const status = showApplicationStatus(
                item.jobTrackingMeta.applicationStatus
              );
              return (
                <TableRow>
                  <TableCell>{item.jobTrackingMeta.jobTitle}</TableCell>
                  <TableCell>{item.jobTrackingMeta.company}</TableCell>
                  <TableCell>{item.company.address}</TableCell>
                  <TableCell>
                    {item.jobTrackingMeta.languageRequirement}
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Badge className={`${status.textColor} ${status.bgColor}`}>
                      {status.value}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.jobTrackingMeta.appliedDate}</TableCell>
                  <TableCell>
                    {/* Edit modal */}
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="outline">Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="mb-2 text-xl">
                            Edit application
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <Label className="text-gray-700">
                                📅 Applied on
                              </Label>
                              <Input type="date" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-gray-700">⚪ Status</Label>
                              <Select defaultValue="notApplied">
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="notApplied">
                                    Not applied
                                  </SelectItem>
                                  <SelectItem value="applied">
                                    Applied
                                  </SelectItem>
                                  <SelectItem value="pending">
                                    Pending
                                  </SelectItem>
                                  <SelectItem value="call">
                                    Call Received
                                  </SelectItem>
                                  <SelectItem value="interview">
                                    Interview
                                  </SelectItem>
                                  <SelectItem value="selected">
                                    Selected
                                  </SelectItem>
                                  <SelectItem value="rejected">
                                    Rejected
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-700">💼 Position</Label>
                            <Input value={item.jobTrackingMeta.jobTitle} />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-700">🏢 Company</Label>
                            <Input value={item.company.name} />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-700">📍 Location</Label>
                            <Input value={item.company.address} />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-700">
                              🔗 Job post link
                            </Label>
                            <Input value="-" />
                          </div>
                          <Button className="w-full">Save</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  {/* <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}

export default TrackApplicationPage;
