import FrontPage from "../components/FrontPage.js";
import UserDetails from "../components/UserDetails.js";
import { UserDetailsLoader, FrontPageLoader } from "../loaders/loaders.js";
import { createBrowserRouter } from "react-router-dom";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
    loader: FrontPageLoader,
  },
  { path: "users/:user", element: <UserDetails />, loader: UserDetailsLoader },
]);
