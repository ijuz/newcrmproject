import React from "react";
import Home from './pages/Home'
import About from "./app/about/page";
import ContactForm from "./app/contacts/page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CC_Routes from "./app/services/CC-Routes/page";
import CLI_Voice_Termination from "./app/services/CLI-Voice-Termination/page";
import DID_Voice_Solutions from "./app/services/DID-Voice-Solutions/page";
import VoIPRates from "./app/pricing/page";
import FAQPage from "./app/faq/page";
import SignUpPage from "./app/modules/auth/Base/Signup/page";
import SignInPage from "./app/modules/auth/Base/login/page";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/services/CC-Routes" element={<CC_Routes />} />
        <Route path="/services/CLI-Voice-Termination" element={<CLI_Voice_Termination />} />
        <Route path="/services/DID-Voice-Solutions" element={<DID_Voice_Solutions />} />
        <Route path="/pricing" element={<VoIPRates />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/signIn" element={<SignInPage />} />
      </Routes>
  );
}

export default App;
