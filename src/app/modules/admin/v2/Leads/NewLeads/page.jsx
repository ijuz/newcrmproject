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
import Sidebar from '../../../v2/Sidebar/page'

const NewLeads = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navbar */}
   <Sidebar/>
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


