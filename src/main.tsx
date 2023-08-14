import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { mainRouter } from "./routes/mainRouter";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={mainRouter} />
  </React.StrictMode>
);
