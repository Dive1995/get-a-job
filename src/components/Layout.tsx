import NavBar from "@/NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavBar />
      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 my-4">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
