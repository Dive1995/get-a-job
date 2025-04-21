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

function TrackApplicationPage() {
  const localData = localStorage.getItem("allApplications") || "[]";
  const allApplications: JobApplicationAnalysis[] = JSON.parse(localData);
  const [data, setData] = useState<JobApplicationAnalysis[]>([]);

  useEffect(() => {
    setData(allApplications);
  }, []);

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
              <TableHead>German req</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>status</TableHead>
              <TableHead>applied on</TableHead>
              <TableHead>Edit</TableHead>
              {/* <TableHead className="text-right">Amount</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow>
                <TableCell>{item.jobTrackingMeta.jobTitle}</TableCell>
                <TableCell>{item.jobTrackingMeta.company}</TableCell>
                <TableCell>{item.company.address}</TableCell>
                <TableCell>
                  {item.jobTrackingMeta.languageRequirement}
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>{item.jobTrackingMeta.applicationStatus}</TableCell>
                <TableCell>{item.jobTrackingMeta.appliedDate}</TableCell>
                <TableCell>
                  {/* Edit modal */}
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="outline">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit application</DialogTitle>
                      </DialogHeader>
                      <div>
                        <div>
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="notApplied">
                                Not applied
                              </SelectItem>
                              <SelectItem value="applied">Applied</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="call">
                                Call Received
                              </SelectItem>
                              <SelectItem value="interview">
                                Interview
                              </SelectItem>
                              <SelectItem value="selected">Selected</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                {/* <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}

export default TrackApplicationPage;
