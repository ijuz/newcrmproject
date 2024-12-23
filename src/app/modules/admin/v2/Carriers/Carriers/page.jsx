import React, { useState, useEffect } from 'react';
import Layout from '../../layout/page';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarriersPage = () => {
  const [carriers, setCarriers] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const [activeTab, setActiveTab] = useState('details');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/v3/api/customers');
        const data = await response.data;
        setCarriers(data);
      } catch (error) {
        console.error('Error fetching carriers:', error);
      }
    };

    fetchCarriers();
  }, []);

  const filteredCarriers = carriers
    .filter(carrier => carrier.customerType === 'Carrier')
    .filter(carrier =>
      carrier.userFirstname.toLowerCase().includes(search.toLowerCase()) ||
      carrier.companyName.toLowerCase().includes(search.toLowerCase())
    );

  const sortedCarriers = filteredCarriers.sort((a, b) => {
    if (sort === 'name') {
      return a.userFirstname.localeCompare(b.userFirstname);
    } else if (sort === 'company') {
      return a.companyName.localeCompare(b.companyName);
    } else {
      return a.customerStatus.localeCompare(b.customerStatus);
    }
  });

  const handleCarrierClick = (id) => {
    navigate(`/modules/admin/v2/Carriers/Carriers/${id}`);
  };

  return (
    <Layout>
      <div className="p-8 bg-gray-50 text-gray-800 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">Carriers Management</h1>
        <p className="text-gray-600 mb-6">Manage and configure carriers here.</p>

        <div className="mt-4 mb-6 flex items-center justify-between space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by carrier or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={() => console.log('Search triggered')}
            className="bg-orange-500 text-white px-7 py-2 rounded-lg hover:bg-orange-600 focus:outline-none"
          >
            Search
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="name">Sort by Name</option>
            <option value="company">Sort by Company</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

        {activeTab === 'details' ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full">
              <thead>
                <tr className="bg-blue-500 text-white rounded-t-lg">
                  <th className="py-2 px-4 text-left">Carrier ID</th>
                  <th className="py-2 px-4 text-left">Company</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedCarriers.map((carrier) => (
                  <tr
                    key={carrier._id}
                    className="hover:bg-gray-50 border-b border-gray-200 cursor-pointer"
                    onClick={() => handleCarrierClick(carrier._id)}
                  >
                    <td className="py-2 px-4">{carrier.userFirstname} {carrier.userLastname}</td>
                    <td className="py-2 px-4">{carrier.companyName}</td>
                    <td className={`py-2 px-4 ${carrier.customerStatus === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                      {carrier.customerStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Follow-Up Information</h2>
            <p>No follow-up data available yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CarriersPage;
