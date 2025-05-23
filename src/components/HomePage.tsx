import { Dot } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import { JobApplicationModel } from "../lib/JobApplicationModel";
import { useEffect, useState } from "react";
import { useJobApplicationContext } from "@/lib/JobApplicationProvider";

function HomePage() {
  const { state } = useJobApplicationContext();
  const [data, setData] = useState<JobApplicationModel[]>([]);

  useEffect(() => {
    setData(state.allApplications);
  }, [state.allApplications]);

  return (
    <div>
      <section className="flex flex-col items-center justify-center mt-16">
        <h2 className="text-4xl font-bold">
          <span className="text-[#4fa252]">Closer with every click.</span>
        </h2>
        <div className="my-8 flex gap-4">
          <Link to={"/new"}>
            <div className="w-40 h-20 p-2 rounded-lg shadow-sm flex items-center justify-center bg-white transition duration-300 hover:shadow-lg  hover:text-gray-900 border text-gray-500 font-semibold">
              <p className="text-center">📝 New application</p>
            </div>
          </Link>
          <Link to={"/track"}>
            <div className="w-40 h-20 p-2 rounded-lg shadow-sm flex items-center justify-center bg-white transition duration-300 hover:shadow-lg  hover:text-gray-900 text-gray-500 border font-semibold">
              <p className="text-center">🧭 Track Applications</p>
            </div>
          </Link>
        </div>
      </section>

      <section>
        {data.length > 0 && (
          <h3 className="text-xl mt-8 mb-4 text-center sm:text-start font-semibold text-gray-600 my-2">
            📂 Recent applications
          </h3>
        )}

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-wrap">
          {data.map((item) => (
            <Link to={`/application/${item.id}`}>
              <Card className=" w-90 hover:shadow-md" key={item.id}>
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
        </div>
      </section>
    </div>
  );
}

export default HomePage;
