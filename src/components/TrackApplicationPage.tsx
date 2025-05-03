import { Card, CardContent } from "./ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Plus } from "lucide-react";
import TrackApplicationDialog from "./TrackApplicationDialog";
import { Link } from "react-router-dom";
import { useJobApplicationContext } from "@/lib/JobApplicationProvider";

function TrackApplicationPage() {
  const {
    state: { applicationTrackingList: data },
  } = useJobApplicationContext();
  const [responsesReceived, setResponsesReceived] = useState(0);
  const [appliedCount, setAppliedCount] = useState(0);

  useEffect(() => {
    const count = data.reduce((prev, current) => {
      const status = current.status;
      if (status != "notApplied" && status != "applied") {
        prev++;
      }
      return prev;
    }, 0);
    setResponsesReceived(count);

    const applied = data.reduce((prev, current) => {
      const status = current.status;
      if (status == "applied") {
        prev++;
      }
      return prev;
    }, 0);
    setAppliedCount(applied);
  }, [data]);

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

      <section className="my-8 flex items-center gap-4">
        <Card className="w-50">
          <CardContent className="flex items-center justify-center flex-col">
            <p className="text-4xl font-bold text-gray-700">{data.length}</p>
            <p className=" text-gray-400 text-center">Applications</p>
          </CardContent>
        </Card>
        <Card className="w-50">
          <CardContent className="flex items-center justify-center flex-col">
            <p className="text-4xl font-bold text-gray-700">{appliedCount}</p>
            <p className=" text-gray-400 text-center">Applied</p>
          </CardContent>
        </Card>
        <Card className="w-50">
          <CardContent className="flex items-center justify-center flex-col">
            <p className="text-4xl font-bold text-gray-700">
              {responsesReceived}
            </p>
            <p className=" text-gray-400 text-center">Responses</p>
          </CardContent>
        </Card>
        {/* <Card className="w-50">
          <CardContent className="flex items-center justify-center flex-col">
            <p className="text-4xl font-bold text-gray-700">3</p>
            <p className="text-gray-400 text-center">Applied this week</p>
          </CardContent>
        </Card> */}
      </section>

      <section>
        <div className="flex justify-end my-4">
          <TrackApplicationDialog
            title="Track new application"
            item={null}
            index={null}>
            <Button variant="secondary">
              <Plus /> Track new Application
            </Button>
          </TrackApplicationDialog>
        </div>
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
              <TableHead>Status</TableHead>
              <TableHead>Applied on</TableHead>
              <TableHead>Edit</TableHead>
              {/* <TableHead className="text-right">Amount</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => {
              const status = showApplicationStatus(item.status);
              return (
                <TableRow>
                  <TableCell>
                    {item.applicationId ? (
                      <Link
                        to={`/application/${item.applicationId}`}
                        className="underline">
                        {item.position}
                      </Link>
                    ) : (
                      <p>{item.position}</p>
                    )}
                  </TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.language}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Badge className={`${status.textColor} ${status.bgColor}`}>
                      {status.value}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.appliedOn}</TableCell>
                  <TableCell>
                    {/* Edit modal */}
                    <TrackApplicationDialog
                      title="Edit Application"
                      index={index}
                      item={item}>
                      <Button variant="outline">Edit</Button>
                    </TrackApplicationDialog>
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
