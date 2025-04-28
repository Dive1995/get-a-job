import { JobApplicationProvider } from "@/lib/JobApplicationProvider";
import NavBar from "@/NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavBar />
      <JobApplicationProvider>
        <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 my-4">
          <Outlet />
        </main>
      </JobApplicationProvider>
    </>
  );
}

export default Layout;
