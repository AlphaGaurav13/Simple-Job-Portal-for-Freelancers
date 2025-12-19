import { BrowserRouter, Routes, Route } from "react-router-dom";
import FreelancersPage from "./pages/FreelancersPage";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FreelancersPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/header" element={<headers />} />
     


    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
