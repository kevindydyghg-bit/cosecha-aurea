import React from "react";
import { createRoot } from "react-dom/client";
import Storefront from "../app/Storefront";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Storefront />
  </React.StrictMode>,
);
