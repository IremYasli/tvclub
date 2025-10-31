import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import ShowDetail from "./pages/ShowDetail.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div className="container">
      <div className="nav">
        <div className="brand">
          <span>🎬</span> <span>Kampüs Film Kulübü</span>
        </div>
        <Link to="/">Ana Sayfa</Link>
      </div>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="show/:id" element={<ShowDetail />} />
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
);