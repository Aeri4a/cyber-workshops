import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<h1>Page not found!</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
