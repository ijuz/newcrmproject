import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../layout/page';
import axios from 'axios';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('companyName');
  const [search, setSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('');
  const [activeTab, setActiveTab] = useState('leadDetails');
  const history = useHistory();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/v3/api/customers');
        const filteredCustomers = response.data.filter(
          (customer) => customer.customerType === 'CarrierLead'
        );
        setCustomers(filteredCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleSort = (field) => setSort(field);

  const handleSearch = (event) => setSearch(event.target.value);

  const handleRowClick = (customerId) => history.push(`/modules/admin/v2/Carriers/Leads/${customerId}`);

  const handleAddLead = () => history.push('/modules/admin/v2/Sales/Leads/AddLead');

  const handleLeadStatusFilter = (status) => setLeadStatusFilter(status);

  const getLeadStatusColor = (status) => {
    switch (status) {
      case 'junk':
        return 'text-red-500';
      case 'hot':
        return 'text-orange-500';
      case 'new':
        return 'text-blue-500';
      case 'active':
        return 'text-green-500';
      case 'inactive':
        return 'text-gray-500';
      default:
        return 'text-black';
    }
  };

  const filteredAndSortedCustomers = customers
    .filter((customer) =>
      (leadStatusFilter === '' || customer.leadStatus === leadStatusFilter) &&
      Object.values(customer).some((value) =>
        Array.isArray(value)
          ? value.join(', ').toLowerCase().includes(search.toLowerCase())
          : value?.toString().toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aValue = a[sort] || '';
      const bValue = b[sort] || '';
      if (typeof aValue === 'string') {
        return aValue.localeCompare(bValue);
      } else if (Array.isArray(aValue)) {
        return aValue.join(', ').localeCompare(bValue.join(', '));
      }
      return 0;
    });

  return (
    <Layout>
      <div className="p-8 text-gray-800 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-black">Carrier Lead Management</h1>
        <p className="text-gray-600 mb-6">Manage Carrier Leads here.</p>

        {/* Filter by Lead Status */}
        <div className="mb-4 flex space-x-4">
          <button
            onClick={() => handleLeadStatusFilter('')}
            className={`px-4 py-2 rounded-lg border ${
              leadStatusFilter === ''
                ? 'bg-indigo-500 text-white'
                : 'border-indigo-500 text-indigo-500 bg-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleLeadStatusFilter('new')}
            className={`px-4 py-2 rounded-lg border ${
              leadStatusFilter === 'new'
                ? 'bg-blue-500 text-white'
                : 'border-blue-500 text-blue-500 bg-white'
            }`}
          >
            New
          </button>
          <button
            onClick={() => handleLeadStatusFilter('hot')}
            className={`px-4 py-2 rounded-lg border ${
              leadStatusFilter === 'hot'
                ? 'bg-orange-500 text-white'
                : 'border-orange-500 text-orange-500 bg-white'
            }`}
          >
            Hot
          </button>
          <button
            onClick={() => handleLeadStatusFilter('active')}
            className={`px-4 py-2 rounded-lg border ${
              leadStatusFilter === 'active'
                ? 'bg-green-500 text-white'
                : 'border-green-500 text-green-500 bg-white'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => handleLeadStatusFilter('inactive')}
            className={`px-4 py-2 rounded-lg border ${
              leadStatusFilter === 'inactive'
                ? 'bg-gray-500 text-white'
                : 'border-gray-500 text-gray-500 bg-white'
            }`}
          >
            Inactive
          </button>
          <button
            onClick={() => handleLeadStatusFilter('junk')}
            className={`px-4 py-2 rounded-lg border ${
              leadStatusFilter === 'junk'
                ? 'bg-red-500 text-white'
                : 'border-red-500 text-red-500 bg-white'
            }`}
          >
            Junk
          </button>
        </div>

        {activeTab === 'leadDetails' && (
          <div>
            {/* Search bar */}
            <div className="mb-4 flex">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search by any parameter..."
                className="flex-grow bg-white text-gray-800 border border-orange-300 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => console.log('Search triggered')}
                className="bg-orange-500 text-white px-9 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
              >
                Search
              </button>
            </div>

            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th
                        className="py-3 px-4 text-left cursor-pointer"
                        onClick={() => handleSort('companyName')}
                      >
                        Company Name
                      </th>
                      <th
                        className="py-3 px-4 text-left cursor-pointer"
                        onClick={() => handleSort('contactPerson')}
                      >
                        Contact Person
                      </th>
                      <th
                        className="py-3 px-4 text-left cursor-pointer"
                        onClick={() => handleSort('userEmail')}
                      >
                        Contact Email
                      </th>
                      <th
                        className="py-3 px-4 text-left cursor-pointer"
                        onClick={() => handleSort('country')}
                      >
                        Country
                      </th>
                      <th
                        className="py-3 px-4 text-left cursor-pointer"
                        onClick={() => handleSort('leadStatus')}
                      >
                        Lead Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedCustomers.map((customer, index) => (
                      <tr
                        key={index}
                        className="border hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleRowClick(customer._id)}
                      >
                        <td className="py-2 px-4 border border-gray-300 text-gray-800">
                          {customer.companyName}
                        </td>
                        <td className="py-2 px-4 border border-gray-300 text-gray-800">
                          {customer.contactPerson}
                        </td>
                        <td className="py-2 px-4 border border-gray-300 text-gray-800">
                          {customer.userEmail}
                        </td>
                        <td className="py-2 px-4 border border-gray-300 text-gray-800">
                          {customer.country}
                        </td>
                        <td
                          className={`py-2 px-4 border border-gray-300 ${getLeadStatusColor(
                            customer.leadStatus
                          )}`}
                        >
                          {customer.leadStatus}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CustomersPage;