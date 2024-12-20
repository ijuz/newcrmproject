import React, { useState } from 'react';
import { 
  
  FunnelIcon, 
ChartBarSquareIcon,
 
  ArrowLeftStartOnRectangleIcon, 
  ChartBarIcon, 
  ClipboardDocumentListIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  LifebuoyIcon, 
  EnvelopeIcon, 
  Cog6ToothIcon, 
  UserIcon, 
  StopCircleIcon,
  UsersIcon,
  
} from '@heroicons/react/24/outline';

const NewLeads = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navbar */}
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
              <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">New Leads</a>
              <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Notifications</a>
            </div>
          </div>

          {/* Sales Dropdown */}
          <div className="relative group">
            <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
              <ChartBarIcon className="w-8 h-8 mr-3 text-blue-500" />
              Sales
            </a>
            <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
              <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Leads</a>
              <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Customers</a>
              <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Followups</a>
              <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Emails</a>
              <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Reports</a>
              <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Messages</a>
              <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Internal Assistance</a>
            </div>
          </div>

          {/* Carriers Dropdown */}
          <div className="relative group">
            <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 text-base">
              <UserGroupIcon className="w-8 h-8 mr-3 text-green-500" />
              Carriers
            </a>
            <div className="dropdown absolute left-0 hidden group-hover:block mt-2 bg-white border border-orange-500 shadow-lg rounded-lg w-56 z-10">
              <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Leads</a>
              <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Carriers</a>
              <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Followups</a>
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

Ijzz Alapuzha Developer, [12/20/2024 2:15 PM]
{/* Dropdown Menu */}
          <div className="dropdown absolute right-0 hidden group-hover:block mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-48 z-10">
            <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">ACCOUNT</a>
            <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">LOGOUT</a>
          </div>
        </div>
      </header>
{/* Lead Management Section */}
<div className="flex justify-between mt-6 px-6">
  <div className="  rounded-lg p-4 flex items-center space-x-4 max-w-sm w-full">
    {/* Icon with custom color */}
    <div className="bg-orange-500 rounded-full p-3 flex items-center justify-center">
      <ChartBarIcon className="text-white  w-8 h-8" />
    </div>

    {/* Heading */}
    <h1 className="text-xl font-bold text-gray-800">LEAD MANAGEMENT</h1>
  </div>
  <div className="flex justify-end items-center mt-6 space-x-4">
  {/* Sort By Search Bar */}
  <div className="relative group">
    <div className="flex items-center bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-300 shadow-sm w-48 hover:border-blue-500">
      <span className="text-sm"> ALL</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5 ml-auto text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 9l6 6 6-6"
        />
      </svg>
    </div>
    

    {/* Dropdown Menu for Sort By */}
    <div className="dropdown absolute top-12 left-0 hidden group-hover:block mt-2 bg-white border border-red-300 shadow-lg rounded-lg w-48 z-10">
      
      <ul className="divide-y divide-gray-200">
        
        <li>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">JUNK</button>
        </li>
        <li>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">HOT</button>
        </li>
        <li>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">NEW</button>
        </li>
        <li>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">ACTIVE</button>
        </li>
        <li>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">INACTIVE</button>
        </li>
      </ul>
    </div>
  </div>

  {/* Filter Button */}
  <div className="relative group">
    
    <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm">
      <FunnelIcon className="w-5 h-5 mr-2" />
      <span className="text-sm">FILTER</span>
    </button>
  </div>
</div>

    </div>
 
    
{/* Search Bar and Buttons */}
<div className="relative flex items-center mt-6 px-6 space-x-4">
  {/* Search Button */}
  <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm">
  <UsersIcon className="w-5 h-5 mr-2" />
    <span className="text-sm">ADD LEAD</span>
  </button>

  {/* Search Bar */}
  <div className="flex items-center bg-white border border-red-500 rounded-lg px-4 py-2 max-w-lg w-full">
    <ArrowLeftStartOnRectangleIcon className="w-6 h-6 text-blue-500" />
    <input
      type="text"
      placeholder="Search..."
      className="bg-transparent text-gray-700 focus:outline-none ml-2 w-full"
    />
  </div>

  {/* Add Lead Button */}
  <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm">
  <StopCircleIcon className="w-5 h-5 mr-2" />
    <span className="text-sm">SEARCH</span>
  </button>
</div>

Ijzz Alapuzha Developer, [12/20/2024 2:15 PM]
{/* Table Section */}
      <div className="mt-8 overflow-x-auto px-4">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-yellow-500 text-white">
            <tr>
              <th className="py-3 px-4 text-center font-semibold">COMPANY NAME</th>
              <th className="py-3 px-4 text-center font-semibold">CONTACT PERSON</th>
              <th className="py-3 px-4 text-center font-semibold">CONTACT EMAIL</th>
              <th className="py-3 px-4 text-center font-semibold">COUNTRY</th>
              <th className="py-3 px-4 text-center font-semibold">LEAD STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-3">ABC Corp</td>
              <td className="py-3 px-3">John Doe</td>
              <td className="py-3 px-3">johndoe@abccorp.com</td>
              <td className="py-3 px-3">USA</td>
              <td className="py-3 px-3">Hot</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-3">XYZ Ltd</td>
              <td className="py-3 px-3">Jane Smith</td>
              <td className="py-3 px-3">janesmith@xyzltd.com</td>
              <td className="py-3 px-3">Canada</td>
              <td className="py-3 px-3">Active</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-3">XYZ Ltd</td>
              <td className="py-3 px-3">Jane Smith</td>
              <td className="py-3 px-3">janesmith@xyzltd.com</td>
              <td className="py-3 px-3">Canada</td>
              <td className="py-3 px-3">Active</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-3">XYZ Ltd</td>
              <td className="py-3 px-3">Jane Smith</td>
              <td className="py-3 px-3">janesmith@xyzltd.com</td>
              <td className="py-3 px-3">Canada</td>
              <td className="py-3 px-3">Active</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-3">XYZ Ltd</td>
              <td className="py-3 px-3">Jane Smith</td>
              <td className="py-3 px-3">janesmith@xyzltd.com</td>
              <td className="py-3 px-3">Canada</td>
              <td className="py-3 px-3">Active</td>
            </tr>
            {/* More rows can be added here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewLeads;


