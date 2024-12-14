import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import { 
  User, Mail, Phone, Globe, MapPin, Calendar, Flag, Briefcase, Users, Link, FileText 
} from "lucide-react";

const LeadDetails = () => {
  const [leadData, setLeadData] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const params = useParams();
  const customerId = params.customerId;
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatedLeadInfo, setUpdatedLeadInfo] = useState({});

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await axios.get(`/v3/api/customers/${customerId}`);
        setLeadData(response.data);
      } catch (error) {
        console.error("Error fetching lead details:", error);
        setError("Failed to fetch lead details.");
      } finally {
        setLoading(false);
      }
    };
    
    if (customerId) fetchLeadData();
    
    return () => {
      setLeadData(null);
      setError(null);
      setSuccessMessage("");
    };
  }, [customerId]);

  const handleConversion = async (type) => {
    try {
      await axios.put(`/v3/api/customers/${customerId}`, { customerType: type });
      setSuccessMessage("Conversion successful");
      setLeadData((prev) => ({ ...prev, customerType: type }));
    } catch (error) {
      console.error("Error converting lead:", error);
      setError("Failed to convert lead.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLeadInfo({ ...updatedLeadInfo, [name]: value });
  };

  const handleUpdateLead = async () => {
    try {
      const response = await axios.put(`/v3/api/customers/${customerId}`, updatedLeadInfo);
      console.log("Lead updated successfully:", response.data);
      setUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  const handleStatusChange = async () => {
    try {
      await axios.put(`/v3/api/customers/${customerId}`, { leadStatus: newStatus });
      setSuccessMessage("Lead status updated");
      setNewStatus("");
      setLeadData((prev) => ({ ...prev, leadStatus: newStatus }));
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update lead status.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            {leadData?.companyName || "Company Name Not Available"}
          </h1>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
              <p className="font-bold">Success</p>
              <p>{successMessage}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Info Sections (Company Information, Contact Information, Lead Details, Technical Details) */}
            {/* Implement the InfoSection and InfoItem as reusable components */}
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lead Actions</h2>
            <div className="space-y-6">
              {/* Update and Conversion Actions */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeadDetails;
