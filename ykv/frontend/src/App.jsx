import { Navigationbar } from "./Components/Navigationbar.jsx";
import { Login } from "./Components/login.jsx";
import { Signup } from "./Components/Signup.jsx";
import { Footer } from "./Components/Footer.jsx";
import "./App.css";
import { useState } from "react";
import { AddSport } from "./Components/addSport.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./Components/HomePage.jsx";
import { ToastContainer } from "react-toastify";
import { AdminDashboard } from "./Components/adminDashBoard.jsx";
import { UpdateSport } from "./Components/UpdateSport.jsx";
import { PrivateRoute } from "./Components/privateRoute.jsx";
import { Coaches } from "./Components/Coaches.jsx";
import { CoachAthletes } from "./Components/CoachAthletes.jsx";
import { CoachRequests } from "./Components/CoachRequests.jsx";
import { AthleteSports } from "./Components/AthleteSports.jsx";
import { AboutUs } from "./Components/AboutUs.jsx";
import { ContactUs } from "./Components/ContactUs.jsx";
import { Sports } from "./Components/Sports.jsx";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <div className="bgi">
        <Navigationbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/coaches_details" element={<Coaches/>}/>
            <Route path="/AddSport" element={<AddSport />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/AdminDashboard/:sport_id" element={<UpdateSport />} />
            <Route path="/coach-athletes" element={<CoachAthletes />} />
            <Route path="/coach-requests" element={<CoachRequests />} />
            <Route path="/athlete-sports" element={<AthleteSports />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
