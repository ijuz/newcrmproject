import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import Layout from '../layout/page';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('companyName');
  const [search, setSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('');
  const [addedByFilter, setAddedByFilter] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('v3/api/customers');
        setCustomers(response.data || []);
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

  const handleRowClick = (customerId) => history.push(`/modules/admin/v2/Leads/NewLeads/${customerId}`);

  const handleAddLead = () => history.push('/modules/admin/v2/Leads/NewLeads/AddLead');

  const handleLeadStatusFilter = (status) => setLeadStatusFilter(status);

  const handleAddedByFilter = (addedBy) => setAddedByFilter(addedBy);

  const deleteCustomer = async (customerId) => {
    try {
      await axiosInstance.delete(`v3/api/customers/${customerId}`);
      setCustomers(prev => prev.filter(customer => customer._id !== customerId));
      alert('Customer deleted successfully!');
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer.');
    }
  };

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
    .filter(customer => {
      const leadStatusMatch = leadStatusFilter === '' || customer.leadStatus === leadStatusFilter;
      const addedBy = customer.futureUseOne ? customer.futureUseOne.toLowerCase() : 'self registered';
      const searchMatch = Object.values(customer).some(value =>
        Array.isArray(value)
          ? value.join(', ').toLowerCase().includes(search.toLowerCase())
          : value?.toString().toLowerCase().includes(search.toLowerCase())
      ) || addedBy.includes(search.toLowerCase());

      return leadStatusMatch && searchMatch;
    })
    .sort((a, b) => {
      const aValue = a[sort] || '';
      const bValue = b[sort] || '';
      if (sort === 'futureUseOne') {
        const aSortValue = aValue || 'Self Registered';
        const bSortValue = bValue || 'Self Registered';
        return aSortValue.localeCompare(bSortValue);
      }
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
        <h1 className="text-3xl font-bold mb-4 text-black">Customer Management</h1>
        <p className="text-gray-600 mb-6">Manage customers and leads here.</p>

        <button
          onClick={handleAddLead}
          className="mb-4 bg-green-500 text-white px-8 py-2 rounded-lg hover:bg-blue-500"
        >
          Add Lead
        </button>

        <div className="mb-4 flex space-x-4">
          <button
            onClick={() => handleLeadStatusFilter('')}
            className={`px-4 py-2 rounded-lg border ${
              leadStatusFilter === '' ? 'bg-indigo-500 text-white' : 'border-indigo-500 text-indigo-500 bg-white'
            }`}
          >
            All
          </button>
        </div>

        <div className="mb-4 flex space-x-4">
          <button
            onClick={() => handleAddedByFilter('')}
            className={`px-4 py-2 rounded-lg border ${
              addedByFilter === '' ? 'bg-indigo-500 text-white' : 'border-indigo-500 text-indigo-500 bg-white'
            }`}
          >
            All Added By
          </button>
          <button
            onClick={() => handleAddedByFilter('Self Registered')}
            className={`px-4 py-2 rounded-lg border ${
              addedByFilter === 'Self Registered' ? 'bg-gray-500 text-white' : 'border-gray-500 text-gray-500 bg-white'
            }`}
          >
            Self Registered
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('companyName')}>
                  Company Name
                </th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('contactPerson')}>
                  Contact Person
                </th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('userEmail')}>
                  Contact Email
                </th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('country')}>
                  Country
                </th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('futureUseOne')}>
                  Added By
                </th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedCustomers.map(customer => (
                <tr key={customer._id} className="border hover:bg-gray-50">
                  <td className="py-2 px-4 border">{customer.companyName}</td>
                  <td className="py-2 px-4 border">{customer.contactPerson}</td>
                  <td className="py-2 px-4 border">{customer.userEmail}</td>
                  <td className="py-2 px-4 border">{customer.country}</td>
                  <td className="py-2 px-4 border">
                    {customer.futureUseOne ? customer.futureUseOne : 'Self Registered'}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => deleteCustomer(customer._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CustomersPage;