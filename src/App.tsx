import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import Pays from "./pages/Pays/pays";

function App() {
  return (
    <Routes>
      <Route path="/sertificate-app" element={<HomePage />} />
      <Route path="/pays" element={<Pays/>} />
    </Routes>
  );
}

export default App;
