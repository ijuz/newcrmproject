import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../utils/axiosinstance";
import axios from 'axios'

const SupportTab = ({ customerId }) => {
  const [supportRequests, setSupportRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupportRequests = async () => {
      try {
        const response = await  axios.get(`http://localhost:5000/v3/api/customers/${customerId}/support`);
        setSupportRequests(response.data);
      } catch (error) {
        console.error("Error fetching support requests:", error);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) fetchSupportRequests();
  }, [customerId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Support Requests</h2>
      {/* Render support request data */}
      {supportRequests.map(request => (
        <div key={request.id}>
          <div>{request.title} - {request.status}</div>
        </div>
      ))}
    </div>
  );
};

export default SupportTab;
