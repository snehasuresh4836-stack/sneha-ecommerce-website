import { useState } from "react";
import Home from "./components/Home";
//Some code missing here!!!
import Navbar from "./components/Navbar";
import Add from "./components/Add";
import { Route, Routes } from "react-router-dom";
import Update from "./components/Update";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
         <Route path="/update/:id" element={<Update />} />

      </Routes>
    </>
  );
}

export default App;
