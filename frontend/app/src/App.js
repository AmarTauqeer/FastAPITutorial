import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Home from "./components/pages/Home";
import Index from "./components/pages/user/Index";

function App() {
  const [body, setBody] = useState("");

  //   useEffect(() => {
  //     axios
  //       .get("http://127.0.0.1:8001/get_data")
  //       .then((response) => {
  //         const data = response.data;
  //         setBody(data["body"]);
  //       })
  //       .catch((e) => {
  //         // Placeholder
  //       });
  //   }, []);

  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user" element={<Index />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
