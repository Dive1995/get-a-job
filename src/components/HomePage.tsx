import { Dot } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import { JobApplicationAnalysis } from "../lib/JobApplicationAnalysis";
import { useState } from "react";

function HomePage() {
  const localData = localStorage.getItem("allApplications") || "[]";
  const allApplications: JobApplicationAnalysis[] = JSON.parse(localData);
  const [data, setData] = useState<JobApplicationAnalysis[]>(allApplications);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 my-4">
      <h2 className="text-4xl font-bold">
        <span className="mr-2">👋</span>
        <span className="bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Hi Diveshan!
        </span>
      </h2>
      <section className="my-4 flex gap-4">
        <Link to={"/new"}>
          <div className="w-40 h-20 p-2 rounded-lg shadow-md flex items-center justify-center bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 text-white font-bold">
            <p className="text-center">New application</p>
          </div>
        </Link>
        <div className="w-40 h-20 p-2 rounded-lg shadow-md flex items-center justify-center bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 text-white font-bold">
          <p className="text-center">Track Applications</p>
        </div>
      </section>
      <section>
        <h3 className="text-xl mt-8 font-semibold text-gray-600 my-2">
          📄 Recent applications
        </h3>
        {/* Make it Grid */}
        <div className="flex gap-4 flex-wrap">
          {data.map((item, index) => (
            <Link to={`/application/${index}`}>
              <Card className=" w-90">
                <CardHeader>
                  <CardTitle>{item.jobTrackingMeta.jobTitle}</CardTitle>
                  <CardDescription className="flex items-center">
                    {item.jobTrackingMeta.company} <Dot />{" "}
                    {item.jobTrackingMeta.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">11th April, 2025</p>
                </CardContent>
              </Card>
            </Link>
          ))}
          {/* 
          <Card className=" w-70">
            <CardHeader>
              <CardTitle>Fullstack Developer</CardTitle>
              <CardDescription className="flex items-center">
                Regens & co. <Dot /> Frankfurt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">11th April, 2025</p>
            </CardContent>
          </Card>
          <Card className=" w-70">
            <CardHeader>
              <CardTitle>Fullstack Developer</CardTitle>
              <CardDescription className="flex items-center">
                Regens & co. <Dot /> Frankfurt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">11th April, 2025</p>
            </CardContent>
          </Card>
          <Card className=" w-70">
            <CardHeader>
              <CardTitle>Fullstack Developer</CardTitle>
              <CardDescription className="flex items-center">
                Regens & co. <Dot /> Frankfurt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">11th April, 2025</p>
            </CardContent>
          </Card> */}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
