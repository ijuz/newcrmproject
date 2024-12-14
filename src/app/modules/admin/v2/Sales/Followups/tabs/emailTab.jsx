import React from 'react';

const EmailTab = ({ sampleData }) => {
  
  const handleRowClick = (customerId) => {
    // Navigate to the detail page with the customer ID
    // For React, you can use window.location to handle navigation
    window.location.href = `/modules/admin/Support/FollowUp/detail`;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Emails</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2">Customer ID</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((item) => (
            <tr
              key={item.customerId}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRowClick(item.customerId)}
            >
              <td className="border px-4 py-2">{item.customerId}</td>
              <td className="border px-4 py-2">{item.time}</td>
              <td className="border px-4 py-2">{item.date}</td>
              <td className={`border px-4 py-2 font-bold ${
                item.status === 'Sent' ? 'text-green-500' :
                item.status === 'Pending' ? 'text-yellow-500' :
                'text-gray-500'
              }`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailTab;
