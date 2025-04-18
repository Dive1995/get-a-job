import { Dot } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 my-4">
      <div className="flex gap-1 ">
        {/* <h2 className="font-4xl">👋</h2> */}
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Hello Dive!
        </h2>
      </div>
      <section className="my-4 flex gap-4">
        <div className="w-40 h-20 p-2 rounded-lg shadow-md flex items-center justify-center bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 text-white font-bold">
          <p className="text-center">New application</p>
        </div>
        <div className="w-40 h-20 p-2 rounded-lg shadow-md flex items-center justify-center bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 text-white font-bold">
          <p className="text-center">Track Applications</p>
        </div>
      </section>
      <section>
        <h3 className="text-xl mt-8 text-gray-500 my-2">
          📄 Recent applications
        </h3>
        {/* Make it Grid */}
        <div className="flex gap-4 flex-wrap">
          <Card className=" w-70">
            <CardHeader>
              <CardTitle>Workstudent Frontend (m/f)</CardTitle>
              <CardDescription className="flex items-center">
                Siemens <Dot /> Munich
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">12th April, 2025</p>
            </CardContent>
          </Card>
          <Card className=" w-70">
            <CardHeader>
              <CardTitle>Frontend React (m/f)</CardTitle>
              <CardDescription className="flex items-center">
                BMW <Dot /> Berlin
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
        </div>
      </section>
      {/* <Button className="bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:opacity-90 transition duration-300">
          Click me
        </Button> */}
    </div>
  );
}

export default HomePage;
