// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewApplicationPage from "./components/NewApplicationPage.tsx";
import CVandCoverLetter from "./components/CVandCoverLetter.tsx";
import NotFound from "./components/NotFound.tsx";
import Layout from "./components/Layout.tsx";
import TrackApplicationPage from "./components/TrackApplicationPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "new", element: <NewApplicationPage /> },
      { path: "track", element: <TrackApplicationPage /> },
      { path: "application/:id", element: <CVandCoverLetter /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode> //TODO: uncomment later
  <RouterProvider router={router} />
  // </StrictMode>
);
