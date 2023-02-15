import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import InventoryProvider from "./store/inventory-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <InventoryProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </InventoryProvider>
);

