import React, { useState, useRef, useEffect } from "react";
import '../Dashboard/dashboard.css';
import { useNavigate } from "react-router-dom";
import {
  ChartBarSquareIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  LifebuoyIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  UserIcon,
  DocumentCurrencyBangladeshiIcon,

} from "@heroicons/react/24/outline";


const Topbar = () => {
const navigate = useNavigate()
  return (
    <header className="w-full p-4 bg-white shadow-xl border-b-4 border-gray-300 flex items-center justify-between">
    <nav className="flex space-x-8 items-left">
      <div>
        <ChartBarSquareIcon className="w-10 h-10 text-yellow-600 mr-14" />
      </div>
      
      {/* Leads Dropdown */}
      <div className="relative group">
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
          <ClipboardDocumentListIcon className="w-8 h-8 mr-3 text-indigo-500" />
          Leads
        </a>
        <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
          <a href="/newLeads" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">New Leads</a>
          <a href="/notification" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Follow Up</a>
          <a href="/sales_email" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Emails</a>
          <a href="/sales_Report" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Reports</a>
          <a href="/sales_message" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Messages</a>
          <a href="/sales_Assitance" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Internal Assistance</a>
        </div>
      </div>

      {/* Sales Dropdown */}
      <div className="relative group">
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
          <ChartBarIcon className="w-8 h-8 mr-3 text-blue-500" />
          Sales
        </a>
        <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
          <a href="/sales_leads" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Leads</a>
          <a href="/sales_customer" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Customers</a>
          <a href="/sales_followups" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Followups</a>
          <a href="/sales_email" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Emails</a>
          <a href="/sales_Report" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Reports</a>
          <a href="/sales_message" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Messages</a>
          <a href="/sales_Assitance" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Internal Assistance</a>
        </div>
      </div>

      {/* Carriers Dropdown */}
      <div className="relative group">
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
          <UserGroupIcon className="w-8 h-8 mr-3 text-green-500" />
          Carriers
        </a>
        <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
          <a href="/carrier_Leads" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Leads</a>
          <a href="/carrier_carrier" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Carriers</a>
          <a href="/carrier_folloup" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Followups</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Email</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Reports</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Messages</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Internal Assistance</a>
        </div>
      </div>


{/* Rates Dropdown */}
<div className="relative group">
  <a
    href="#"
    onClick={() => navigate('/rates')} // Navigate to Rates page
    className="flex items-center text-gray-600 hover:text-indigo-600 text-base"
  >
    <DocumentCurrencyBangladeshiIcon className="w-8 h-8 mr-3 text-yellow-500" />
    Accounts
  </a>
  <div className="dropdown absolute left-0 mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10 group-hover:block">
    {/* Rates Dropdown */}
    <div
      className="relative group"
      onMouseEnter={() => {
        // Show the sub-dropdown
        document.getElementById('ratesSubMenu').style.display = 'block';
      }}
      onMouseLeave={() => {
        // Hide the sub-dropdown
        document.getElementById('ratesSubMenu').style.display = 'none';
      }}
    >
      <a
        className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
      >
        Rates
      </a>
      <div
        id="ratesSubMenu"
        className="absolute right-0 mt-0 bg-white border border-orange-500 shadow-lg rounded-lg w-56 hidden"
        style={{
          right: '-100%', // Adjust the right position to show the sub-dropdown to the right side
          bottom: '-120px' // Move the sub-dropdown slightly higher
        }}
      >
        <a
          href="/admin/ccrates"
          className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
        >
          CC Rates
        </a>
        <a
          href="/admin/clirates"
          className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
        >
          CLI Rates
        </a>
        <a
          href="/admin/privaterates"
          className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
        >
          Special Rates
        </a>
        <a
          href="/admin/specialrates"
          className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
        >
          Targeted Rates
        </a>
      </div>
    </div>
    {/* Other Menu Items */}
    <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
      Recharge
    </a>
    <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
      Requests
    </a>
    <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
      Reports
    </a>
    <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
      Email
    </a>
    <a href="/admin/account/followup" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
      Followups
    </a>
    <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">
      Internal Assistance
    </a>
  </div>
</div>


      {/* Support Dropdown */}
      <div className="relative group">
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
          <LifebuoyIcon className="w-8 h-8 mr-3 text-red-500" />
          Support
        </a>
        <div className="dropdown absolute left-0 hidden mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
          <a href="/admin/support/troubleTickets" className="block px-6 py-3 text-gray-600 ">Trouble Ticket</a>
          <a href="/admin/support/testing" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Testing</a>
          <a href="/admin/support/followups" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Followups</a>
          <a href="/admin/support/task" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Tasks</a>
          <a href="/admin/support/myTickets" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">My Ticket</a>
          <a href="/admin/support/messages" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Messages</a>
          <a href="/admin/support/internalassistence" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Internal Assistance</a>
        </div>
      </div>

      {/* Communications Dropdown */}
      <div className="relative group">
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
          <EnvelopeIcon className="w-8 h-8 mr-3 text-purple-500" />
          Communications
        </a>
        <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Enquires</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">DID Numbers</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Emails</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Chat Panel</a>
        </div>
      </div>

      {/* Settings Dropdown */}
      <div className="relative group">
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
          <Cog6ToothIcon className="w-8 h-8 mr-3 text-gray-500" />
          Settings
        </a>
        <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
          <a href="/admin/settings_page" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">User Management</a>
          <a href="/customermanagement" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">CRM Management</a>
        </div>
      </div>
    </nav>

    <div className="relative group">
      <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-gray-700 text-sm">
        <UserIcon className="w-5 h-5 mr-2" />
        <span className="text-sm">SUPER ADMIN</span>
      </button>

      {/* Dropdown Menu */}
      <div className="dropdown absolute right-0 hidden group-hover:block mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-48 z-10">
        <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">ACCOUNT</a>
        <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">LOGOUT</a>
      </div>
    </div>
  </header>
  );
};

export default Topbar;