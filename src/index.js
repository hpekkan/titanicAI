
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

serviceWorker.unregister();