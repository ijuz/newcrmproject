import React from "react";
import Home from './pages/Home.jsx'
import About from "./app/about/page.jsx";
import ContactForm from "./app/contacts/page.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CC_Routes from "./app/services/CC-Routes/page.jsx";
import CLI_Voice_Termination from "./app/services/CLI-Voice-Termination/page.jsx";
import DID_Voice_Solutions from "./app/services/DID-Voice-Solutions/page.jsx";
import VoIPRates from "./app/pricing/page.jsx";
import FAQPage from "./app/faq/page.jsx";
import SignUpFrame from "./app/modules/auth/Base/Signup/page.jsx";
import LoginFrame from "./app/modules/auth/Base/login/page.jsx";
import Dashboard from "./app/modules/customer/pages/home/page.jsx";
import ProfilePage from "./app/modules/customer/pages/profile-page/page.jsx";
import PaymentsPage from "./app/modules/customer/pages/payments_page/page.jsx";
import HomePage from "./pages/Home.jsx";
import FollowUp from "./app/modules/customer/pages/trouble_page/page.jsx";
import NormalRatesPage from "./app/modules/customer/pages/rates_page/Rates/page.jsx";
import MyRates from './app/modules/customer/pages/myRates/page.jsx'
import PrivateRates from './app/modules/customer/pages/rates_page/PrivateRates/page.jsx'
import CliRates from './app/modules/customer/pages/cliRates/page.jsx'
import AdminDahboard from './app/modules/admin/v2/Dashboard/page.jsx'
import SpecialRates from './app/modules/customer/pages/rates_page/SpecialRates/page.jsx'
import Newleads from '../src/app/modules/admin/v2/Leads/NewLeads/page'
import Notification from '../src/./app/modules/admin/v2/Leads/Followups/page'
import Leads from '../src/app/modules/admin/v2/Sales/Leads/page'
import Customer from '../src/app/modules/admin/v2/Sales/Customers/page'
import Followups from '../src/app/modules/admin/v2/Sales/Followups/page'
import Emails from '../src/app/modules/admin/v2/Sales/Emails/page'
import Report from '../src/app/modules/admin/v2/Sales/Reports/page'
import Message from '../src/app/modules/admin/v2/Sales/Messages/page'
import Assistance from '../src/app/modules/admin/v2/Sales/internalAssistance/page'
import Carrier from '../src/app/modules/admin/v2/Carriers/Leads/page'
import Carriers from '../src/app/modules/admin/v2/Carriers/Carriers/page'
import CFollowups from '../src/app/modules/admin/v2/Carriers/Followups/page'
import CnewLeads from '../src/app/modules/admin/v2/Leads/NewLeads/[customerId]/page.jsx'
import AddLead from '../src/app/modules/admin/v2/Leads/NewLeads/AddLead/page'
import LeadDetails from "./app/modules/admin/v2/Carriers/Leads/[customerId]/page.jsx";
import SaleLead from "./app/modules/admin/v2/Sales/Leads/[customerId]/page.jsx";
import CustomersPage from "./app/modules/admin/v2/CustomerManagement/page.jsx";
import SettingsPage from "./app/modules/admin/v2/Settings/page.jsx";
import RatesPage from "./app/modules/admin/v2/Rates/CCRates/page.jsx";
import AdminCli from "./app/modules/admin/v2/Rates/CLIRates/page.jsx";
import AdminPrivateRates from "./app/modules/admin/v2/Rates/PrivateRates/page.jsx";
import AdminSpecialRates from "./app/modules/admin/v2/Rates/SpecialRates/page.jsx";
import TroubleTickets from "./app/modules/admin/v2/Support/TroubleTickets/page.jsx";
import AdminFollowUp from "./app/modules/admin/v2/Support/FollowUps/page.jsx";
import TestingPage from "./app/modules/admin/v2/Support/Testing/page.jsx";
import Admintask from "./app/modules/admin/v2/Support/Tasks/page.jsx";
import PageUnderDevelopment from "./app/modules/admin/v2/Support/Messages/page.jsx";
import InternalAssistence from "./app/modules/admin/v2/Support/InternalAssistance/page.jsx";
import CSettingsPage from '../src/app/modules/customer/pages/settings/page'
import RateTableCli from "./app/clirates/page.jsx";
import RateTableSpecial from "./app/modules/customer/pages/rates_page/Rates/page.jsx";
import RateTableAdd from "./app/modules/customer/pages/rates_page/Rates/page.jsx";


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
        <Route path="/admin/settings_page" element={<SettingsPage/>}/>
        <Route path="/CCRates_page" element={<NormalRatesPage/>}/>
        <Route path="/MyRates_page" element={<MyRates/>}/>
        <Route path="/PrivateRate_page" element={<PrivateRates/>}/>
        <Route path="/CliRates_page" element={<CliRates/>}/>
        <Route path="/SpecilaRate_page" element={<SpecialRates/>}/>
        <Route path="/admin_dashboard" element={<AdminDahboard/>}/>
        <Route path="/newLeads" element={<Newleads/>}/>
        <Route path="/notification" element={<Notification/>}/>
        <Route path="/sales_leads" element={<Leads/>}/>
        <Route path="/sales_customer" element={<Customer/>}/>
        <Route path="/sales_followups" element={<Followups/>}/>
        <Route path="/sales_email" element={<Emails/>}/>
        <Route path="/sales_Report" element={<Report/>}/>
        <Route path="/sales_message" element={<Message/>}/>
        <Route path="/sales_Assitance" element={<Assistance/>}/>
        <Route path="/carrier_Leads" element={<Carrier/>}/>
        <Route path="/carrier_carrier" element={<Carriers/>}/>
        <Route path="/carrier_folloup" element={<CFollowups/>}/>
        <Route path="/NewLeads/:customerId" element={<CnewLeads/>}/>
        <Route path="/Addlead" element={<AddLead/>}/>
        <Route path="/customer/lead-details/:customerId" element={<LeadDetails />} />
        <Route path="/SaleLead/:customerId" element={<SaleLead/>}/>
        <Route path="/customermanagement" element={<CustomersPage/>}/>
        <Route path="/settings_page" element={<CSettingsPage/>}/>
        <Route path="/admin/ccrates" element={<RatesPage/>}/>
        <Route path="/admin/clirates" element={<AdminCli/>}/>
        <Route path="/admin/privaterates" element={<AdminPrivateRates/>}/>
        <Route path="/admin/specialrates" element={<AdminSpecialRates/>}/>
        <Route path="/admin/support/troubleTickets" element={<TroubleTickets/>}/>
        <Route path="/admin/support/followups" element={<AdminFollowUp/>}/>
        <Route path="/admin/support/testing" element={<TestingPage/>}/>
        <Route path="/admin/support/task" element={<Admintask/>}/>
        <Route path="/admin/support/messages" element={<PageUnderDevelopment/>}/>
        <Route path="/admin/support/internalassistence" element={<InternalAssistence/>}/>
        <Route path="/cliratestable" element={<RateTableCli/>}/>
        <Route path="/specialrates" element={<RateTableSpecial/>}/>
        <Route path="/addrates" element={<RateTableAdd/>}/>
      </Routes>
  );
}

export default App;