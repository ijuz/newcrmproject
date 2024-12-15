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
import SignUpFrame from "./app/modules/auth/Base/Signup/page";
import LoginFrame from "./app/modules/auth/Base/login/page";
import Dashboard from "./app/modules/customer/pages/home/page";
import ProfilePage from "./app/modules/customer/pages/profile-page/page";
import PaymentsPage from "./app/modules/customer/pages/payments_page/page";
import HomePage from "./pages/Home";
import FollowUp from "./app/modules/customer/pages/trouble_page/page";
import SettingsPage from "./app/modules/customer/pages/settings/page";
import NormalRatesPage from "./app/modules/customer/pages/rates_page/Rates/page";
import MyRates from '../src/app/modules/customer/pages/myRates/page.jsx'
import PrivateRates from '../src/app/modules/customer/pages/rates_page/PrivateRates/page.jsx'

import CliRates from '../src/app/modules/customer/pages/cliRates/page.jsx'

import SpecialRates from '../src/app/modules/customer/pages/rates_page/SpecialRates/page.jsx'

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
        <Route path="/signUp" element={<SignUpFrame />} />
        <Route path="/signIn" element={<LoginFrame />} />
        <Route path="/dash-board" element={<Dashboard/>}/>
        <Route path="/Profile_page" element={<ProfilePage/>}/>
        <Route path="/Payment_page" element={<PaymentsPage/>}/>
        <Route path="/Home_page" element={<HomePage/>}/>
        <Route path="/Support_page" element={<FollowUp/>}/>
        <Route path="/settings_page" element={<SettingsPage/>}/>
        <Route path="/CCRates_page" element={<NormalRatesPage/>}/>
        <Route path="/MyRates_page" element={<MyRates/>}/>
        <Route path="/PrivateRate_page" element={<PrivateRates/>}/>
        <Route path="/CliRates_page" element={<CliRates/>}/>
        <Route path="/SpecilaRate_page" element={<SpecialRates/>}/>
      </Routes>
  );
}

export default App;