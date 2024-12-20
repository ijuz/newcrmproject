import React, { useState, useRef, useEffect } from "react";
import '../Dashboard/dashboard.css';
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

} from "@heroicons/react/24/outline";


const Topbar = () => {

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
          <a href="/notification" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Notifications</a>
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
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
          <CurrencyDollarIcon className="w-8 h-8 mr-3 text-yellow-500" />
          Rates
        </a>
        <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">CC Rates</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">CLI Rates</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Special Rates</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Private Rates</a>
        </div>
      </div>

      {/* Support Dropdown */}
      <div className="relative group">
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
          <LifebuoyIcon className="w-8 h-8 mr-3 text-red-500" />
          Support
        </a>
        <div className="dropdown absolute left-0 hidden mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
          <a href="#" className="block px-6 py-3 text-gray-600 ">Trouble Ticket</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Testing</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Followups</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Tasks</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Messages</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Internal Assistance</a>
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
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Profile</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Account</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Preferences</a>
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