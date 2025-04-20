import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="border-b border-gray-200  bg-opacity-80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:justify-between">
              <Link to={"/"}>
                <div className="flex-shrink-0">
                  {/* <div className="relative inline-block">
                    <div className="absolute inset-0 -z-10 blur-lg opacity-40 rounded-full bg-gradient-to-tr from-cyan-300 to-green-400"></div>
                    <span className="text-xl font-bold text-green-600">
                      Get a Job
                    </span>
                  </div> */}
                  <span className="relative text-2xl font-bold text-green-700">
                    <span className="absolute bottom-0 left-0 w-full h-2 bg-green-200 z-[-1] rounded-md"></span>
                    Get a Job
                  </span>

                  {/* <div className="relative inline-block">
                    <div className="absolute -top-2 -left-3 w-10 h-10 bg-green-100 rounded-full -z-10"></div>
                    <span className="font-bold text-xl text-gray-800">
                      JobHuntly
                    </span>
                  </div> */}
                </div>
              </Link>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4 text-green-500">
                  <Link
                    to={"/"}
                    className="transition duration-300 ease-in-out hover:bg-green-100 px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page">
                    Home
                  </Link>
                  <Link
                    to={"/"}
                    className="transition duration-300 ease-in-out hover:bg-green-100 px-3 py-2 rounded-md text-sm font-medium">
                    About
                  </Link>
                  <Link
                    to={"/"}
                    className="transition duration-300 ease-in-out hover:bg-green-100 px-3 py-2 rounded-md text-sm font-medium">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
