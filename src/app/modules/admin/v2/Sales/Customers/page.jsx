import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For routing
import Layout from '../../layout/page';
import axiosInstance from '../../utils/axiosinstance';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('customerId');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('leadDetails'); // Active Tab
  const navigate = useNavigate(); // Use useHistory instead of useRouter

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('v3/api/customers');
        const filteredCustomers = response.data.filter(customer => customer.customerType === 'Customer');
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

  const handleRowClick = (customerId) => navigate(`/modules/admin/v2/Sales/Customers/${customerId}`);

  const handleAddLead = () => navigate('/modules/admin/Leads/AddLead');

  const filteredAndSortedCustomers = customers
    .filter(customer =>
      Object.values(customer).some(value =>
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
      <div className="p-8 bg-gray-50 text-gray-800 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-black">Customer Management</h1>
        <p className="text-gray-600 mb-6">Manage Customers here.</p>

        {/* Add Lead Button */}
        {/* Add your add lead button here */}

        {/* Tab Navigation */}
        <div className="mb-6">
          {/* Tab navigation buttons */}
        </div>

        {/* Tab Content */}
        {activeTab === 'leadDetails' && (
          <div>
            <div className="mb-4 flex">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search by any parameter..."
                className="flex-grow bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                // eslint-disable-next-line no-unused-expressions
                onClick={() => { handleSearch }} // Update this to your search function
                className="bg-orange-500 text-white px-8 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Search
              </button>
            </div>

            {loading ? (
              <p className="text-center text-black">Loading...</p>
            ) : (
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('customerId')}>Customer ID</th>
                      <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('companyName')}>Company Name</th>
                      <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('contactPerson')}>Contact Person</th>
                      <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('country')}>Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedCustomers.map((customer, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 hover:bg-gray-100 cursor-pointer transition duration-200"
                        onClick={() => handleRowClick(customer.customerId)}
                      >
                        <td className="py-3 px-4 text-gray-800 border-r border-gray-300">{customer.customerId}</td>
                        <td className="py-3 px-4 text-gray-800 border-r border-gray-300">{customer.companyName}</td>
                        <td className="py-3 px-4 text-gray-800 border-r border-gray-300">{customer.contactPerson}</td>
                        <td className="py-3 px-4 text-gray-800">{customer.country}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'followUp' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-indigo-700">Follow-Up Actions</h2>
            <p className="text-gray-600">Here you can manage follow-up actions related to your leads.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CustomersPage;
