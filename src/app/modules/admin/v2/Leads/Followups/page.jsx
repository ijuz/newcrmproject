import React, { useState, useEffect } from 'react';
import Layout from '../../layout/page'; // Assuming Layout is a regular React component
import axios from 'axios';


const FollowUp = () => {
  const [activeTab, setActiveTab] = useState('calls');
  const [followUpData, setFollowUpData] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(followUpData);
console.log(customerData);


  // Navigate to the add follow-up page
  const handleAddFollowUpClick = () => {
    window.location.href = 'https://backend.cloudqlobe.com/modules/admin/v2/Leads/Followups/Addfollowup';
  };

  // Fetch follow-up data and then fetch customer data based on customerId
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch follow-up data
        const followUpsResponse = await axios.get('https://backend.cloudqlobe.com/v3/api/followups');
        setFollowUpData(followUpsResponse.data);

        // Step 2: Prepare a list of customer IDs to fetch
        const customerIds = [...new Set(followUpsResponse.data.map(item => item.customerId))];
        const validIds = customerIds.filter(id => id && id.trim() !== "");
        console.log(validIds);

        // Step 3: Fetch customer data for each customerId
        const customers = {};
        for (const customerId of validIds) {
          const response = await axios.get(`https://backend.cloudqlobe.com/v3/api/customers/${customerId}`);
          customers[customerId] = response.data;
        }
        setCustomerData(customers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderTabContent = () => {
    if (loading) {
      return <div className="text-center py-4 text-gray-600">Loading...</div>;
    }

    if (error) {
      return <div className="text-center py-4 text-gray-600">Error fetching data: {error}</div>;
    }

    // Filter follow-ups based on the active tab
    const filteredFollowUps = followUpData.filter(item => item.followupMethod === activeTab && item.followupCategory === 'Leads');

    if (filteredFollowUps.length === 0) {
      return (
        <div className="text-center py-4 text-gray-600">
          No data available for {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </div>
      );
    }

    return (
      <table className="min-w-full mt-4 bg-white border shadow-lg border-gray-300">
        <thead>
          <tr className="bg-blue-500 rounded-lg text-white">
            <th className="border px-4 py-2">Customer ID</th>
            <th className="border px-4 py-2">Company Name</th>
            <th className="border px-4 py-2">Follow-Up Type</th>
            <th className="border px-4 py-2">Follow-Up Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredFollowUps.map((followUp) => {
            const customer = customerData[followUp.customerId] || {};

            return (
              <tr
                key={followUp.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => window.location.href = `/modules/admin/v2/Leads/Followups/${followUp.id}`}
              >
                <td className="border px-4 py-2">{customer.customerId || 'N/A'}</td>
                <td className="border px-4 py-2">
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/modules/admin/v2/Leads/Followups/${followUp._id}`;
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    {customer.companyName || 'N/A'}
                  </a>
                </td>
                <td className="border px-4 py-2">{followUp.followupMethod.charAt(0).toUpperCase() + followUp.followupMethod.slice(1)}</td>
                <td className="border px-4 py-2">{followUp.followupStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <Layout>
      <div className="p-8 text-gray-900 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Follow-up</h2>
        <p className="text-gray-600 mb-6">View and manage follow-up tasks here.</p>

        {/* Add Follow-up Button */}
        <div className="mb-6">
          <button
            onClick={handleAddFollowUpClick}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-500 transition duration-300"
          >
            Add Follow-up
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-6">
          {['call', 'email', 'chat'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-1 text-center py-3 transition-colors duration-300 focus:outline-none ${
                activeTab === tab
                  ? 'text-black-600 font-bold'
                  : 'text-white-500 hover:text-orange-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}

              {/* Active Tab Indicator */}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-orange-600 rounded-t-lg transition-all duration-300"></span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="overflow-x-auto">{renderTabContent()}</div>
      </div>
    </Layout>
  );
};

export default FollowUp;
