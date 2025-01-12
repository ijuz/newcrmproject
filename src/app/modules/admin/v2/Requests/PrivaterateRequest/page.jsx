import React, { useState } from 'react';
import Layout from '../../layout/page';
import { FaFilter } from 'react-icons/fa';
import { LuBadgeDollarSign } from "react-icons/lu";


const PrivateRateRequestPage = () => {
  const [activeTab, setActiveTab] = useState('ccroutes');
  const [ccRequests, setCcRequests] = useState([
    { id: 1, countryCode: 'IN', countryName: 'India', qualityDescription: 'High Quality', rate: 200, status: 'Pending' },
    { id: 2, countryCode: 'US', countryName: 'USA', qualityDescription: 'Moderate Quality', rate: 150, status: 'Approved' },
    { id: 3, countryCode: 'UK', countryName: 'UK', qualityDescription: 'Low Quality', rate: 100, status: 'Denied' },
  ]);

  const [cliRequests, setCliRequests] = useState([
    { id: 1, countryCode: 'IN', countryName: 'India', qualityDescription: 'Premium Quality', rtp: 98, asr: 92, acd: 180, rate: 180, status: 'Pending' },
    { id: 2, countryCode: 'US', countryName: 'USA', qualityDescription: 'Standard Quality', rtp: 95, asr: 85, acd: 220, rate: 120, status: 'Approved' },
    { id: 3, countryCode: 'CA', countryName: 'Canada', qualityDescription: 'Basic Quality', rtp: 90, asr: 80, acd: 240, rate: 95, status: 'Denied' },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showFilter, setShowFilter] = useState(false);

  const handleTabSwitch = (tab) => setActiveTab(tab);

  const handlePickupClick = (request) => {
    setSelectedRequest(request);
    setNewStatus(request.status);
    setShowStatusModal(true);
  };

  const handleStatusUpdate = () => {
    const updateRequests = (requests) =>
      requests.map((request) =>
        request.id === selectedRequest.id ? { ...request, status: newStatus } : request
      );

    activeTab === 'ccroutes'
      ? setCcRequests(updateRequests(ccRequests))
      : setCliRequests(updateRequests(cliRequests));

    setShowStatusModal(false);
  };

  const handleFilterChange = (e) => setFilterStatus(e.target.value);

  const filteredCcRequests = filterStatus === 'All' ? ccRequests : ccRequests.filter((request) => request.status === filterStatus);
  const filteredCliRequests = filterStatus === 'All' ? cliRequests : cliRequests.filter((request) => request.status === filterStatus);

  return (
    <Layout>
      <div className="p-6 text-gray-600">
      <div className="flex items-center mb-4">
          <LuBadgeDollarSign className="mr-2 text-yellow-500 text-5xl" />
          <h2 className="text-3xl font-semibold">Private Rate Requests</h2>
        </div>
        <div className="flex mb-6 space-x-4">
          <button
            onClick={() => handleTabSwitch('ccroutes')}
            className={`px-6 py-2 rounded-md ${activeTab === 'ccroutes' ? 'bg-green-400 text-white' : 'bg-green-4s00 text-black'}`}
          >
            CCRoutes
          </button>
          <button
            onClick={() => handleTabSwitch('cliroutes')}
            className={`px-6 py-2 rounded-md ${activeTab === 'cliroutes' ? 'bg-yellow-400 text-white' : 'bg-yellow-400 text-black'}`}
          >
            CLIRoutes
          </button>
        </div>

        <div className="flex justify-end mb-6">
          <div className="flex items-center">
            <select
              value={filterStatus}
              onChange={handleFilterChange}
              className="p-2 border rounded-md bg-white mr-2"
            >
              <option value="All">All</option>
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
              <option value="Pending">Pending</option>
            </select>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="px-4 py-2 bg-orange-500 text-white flex items-center rounded-md"
            >
              <FaFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        {activeTab === 'ccroutes' && (
          <table className="min-w-full border-collapse mb-6">
            <thead className="bg-[#005F73] text-white">
              <tr>
                <th className="p-2">Country Code</th>
                <th className="p-2">Country</th>
                <th className="p-2">Quality Description</th>
                <th className="p-2">Rate</th>
                <th className="p-2">Status</th>
                <th className="p-2">Profile</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCcRequests.map((request, index) => (
                <tr key={request.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="p-2">{request.countryCode}</td>
                  <td className="p-2">{request.countryName}</td>
                  <td className="p-2">{request.qualityDescription}</td>
                  <td className="p-2">{request.rate}</td>
                  <td className="p-2">{request.status}</td>
                  <td className="p-2">Profile Info</td>
                  <td className="p-2 flex justify-end">
                    <button
                      onClick={() => handlePickupClick(request)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Pickup
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'cliroutes' && (
          <table className="min-w-full border-collapse mb-6">
            <thead className="bg-[#005F73] text-white">
              <tr>
                <th className="p-2">Country Code</th>
                <th className="p-2">Country</th>
                <th className="p-2">Quality Description</th>
                <th className="p-2">RTP</th>
                <th className="p-2">ASR</th>
                <th className="p-2">ACD</th>
                <th className="p-2">Rate ($)</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCliRequests.map((request, index) => (
                <tr key={request.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="p-2">{request.countryCode}</td>
                  <td className="p-2">{request.countryName}</td>
                  <td className="p-2">{request.qualityDescription}</td>
                  <td className="p-2">{request.rtp}</td>
                  <td className="p-2">{request.asr}</td>
                  <td className="p-2">{request.acd}</td>
                  <td className="p-2">{request.rate}</td>
                  <td className="p-2">{request.status}</td>
                  <td className="p-2 flex justify-end">
                    <button
                      onClick={() => handlePickupClick(request)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Pickup
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showStatusModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white rounded-md p-6 w-1/3">
              <h3 className="text-lg font-semibold mb-4">Change Status</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="p-2 border rounded-md w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Denied">Denied</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusUpdate}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PrivateRateRequestPage;