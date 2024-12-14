import { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosinstance';
import Layout from '../../layout/page';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchInquiries = async () => {
    try {
      const { data } = await axiosInstance.get('/v3/api/inquiries');
      setInquiries(data);
      setFilteredInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleFilterChange = () => {
    const filtered = inquiries
      .filter(inquiry => (filterType ? inquiry.type === filterType : true))
      .filter(inquiry => (statusFilter ? inquiry.status === statusFilter : true));
    setFilteredInquiries(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [filterType, statusFilter, inquiries]);

  const handleStatusUpdate = async (id, newStatus) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/v3/api/inquiries/${id}`, { status: newStatus });
      fetchInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Ongoing':
        return 'bg-blue-500';
      case 'Contacted':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-4">Received Inquiries</h1>

        <div className="flex gap-4 mb-4">
          <select onChange={e => setFilterType(e.target.value)} className="border p-2">
            <option value="">All Types</option>
            <option value="freetest">Free Test</option>
            <option value="inquiry">Inquiry</option>
            <option value="contact">Contact</option>
          </select>

          <select onChange={e => setStatusFilter(e.target.value)} className="border p-2">
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Contacted">Contacted</option>
          </select>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Company</th>
                <th className="px-4 py-2 border">Contact Number</th>
                <th className="px-4 py-2 border">Notes</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map(inquiry => (
                <tr key={inquiry._id}>
                  <td className="px-4 py-2 border">{inquiry.type || 'N/A'}</td>
                  <td className="px-4 py-2 border">{inquiry.name || 'N/A'}</td>
                  <td className="px-4 py-2 border">{inquiry.email || 'N/A'}</td>
                  <td className="px-4 py-2 border">{inquiry.companyName || 'N/A'}</td>
                  <td className="px-4 py-2 border">{inquiry.contactNumber || 'N/A'}</td>
                  <td className="px-4 py-2 border">{inquiry.notes || 'N/A'}</td>
                  <td className="px-4 py-2 border">
                    {loading ? (
                      <div className="flex items-center">
                        <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full text-blue-500" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <select 
                        value={inquiry.status} 
                        onChange={(e) => handleStatusUpdate(inquiry._id, e.target.value)} 
                        className={`p-2 border rounded ${getStatusColor(inquiry.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Contacted">Contacted</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
