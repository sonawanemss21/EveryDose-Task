import "./App.css";
import React from "react";
import { Lists, MyNav, Home } from "./components";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <MyNav expand="sm" />
      <div className="App">
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/lists" element={<Lists />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
