import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosinstance"; // Adjust the import to match your project structure
import DashboardLayout from "../../layout/page"; // Adjust the import to match your project structure
import axios from "axios";
import { SiVitest } from "react-icons/si";
import { SiBitcomet } from "react-icons/si";

const TestingPage = () => {
  const [testsData, setTestsData] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [ratesData, setRatesData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        const response = await axios.get("https://backend.cloudqlobe.com/v3/api/customers");
        setCustomersData(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomersData();
  }, []);

  useEffect(() => {
    const fetchTestsData = async () => {
      try {
        const response = await axios.get("https://backend.cloudqlobe.com/v3/api/tests");
        setTestsData(response.data);
      } catch (error) {
        console.error("Error fetching tests data:", error);
      }
    };

    fetchTestsData();
  }, []);

  useEffect(() => {
    const fetchRatesData = async () => {
      try {
        const response = await axios.get("https://backend.cloudqlobe.com/v3/api/rates");
        setRatesData(response.data);
      } catch (error) {
        console.error("Error fetching rates data:", error);
      }
    };

    fetchRatesData();
  }, []);

  const findTestsByCustomerId = (customerId) => {
    return testsData.filter((test) => test.customerId === customerId);
  };

  const findRateById = (rateId) => {
    return ratesData.find((rate) => rate._id === rateId) || {};
  };

  const openModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 text-gray-800">
        <div className="flex items-center mb-6">
          <SiVitest className="h-10 w-10 text-orange-500 mr-4" />
          <h2 className="text-3xl text-gray-500 bg-grey font-default">Testing Page</h2>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-[#005F73] text-white">
              <tr>
                <th className="py-2 px-4">Customer ID</th>
                <th className="py-2 px-4">Company Name</th>
                <th className="py-2 px-4">Service Engineer</th>
                <th className="py-2 px-4 text-center">Status</th> {/* Added text-center for Status */}
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {customersData.map((customer, index) => (
                <tr
                  key={customer._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="py-2 px-4">{customer.customerId}</td>
                  <td className="py-2 px-4">{customer.companyName || "N/A"}</td>
                  <td className="py-2 px-4">Not assigned</td>
                  <td className="py-2 px-4">Test Initiated</td>
                  <td className="py-2 px-4 text-right">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-2"
                      onClick={() => openModal(customer)}
                    >
                      View
                    </button>
                    <button
                      className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-500 transition"
                      onClick={() => alert(`Pickup action for ${customer.companyName}`)}
                    >
                    Pickup
                  </button>
                </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>

      {
    isModalOpen && selectedCustomer && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <SiBitcomet className="h-6 w-6 text-orange-500 mr-2" />
              <h3 className="text-xl font-default">Details for {selectedCustomer.companyName}</h3>
            </div>
            <button onClick={closeModal} className="text-gray-500 text-2xl">&times;</button>
          </div>

          <div className="max-w-screen-xl mx-auto p-5">
            <div className="min-w-full bg-white shadow-md rounded-lg">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-indigo-500 text-white">
                  <tr>
                    <th className="py-2 px-6 text-sm">Country Code</th>
                    <th className="py-2 px-6 text-sm">Country</th>
                    <th className="py-2 px-6 text-sm">Price</th>
                    <th className="py-2 px-6 text-sm">Description</th>
                    <th className="py-2 px-6 text-sm">Profile</th>
                    <th className="py-2 px-6 text-sm">Status</th>
                    <th className="py-2 px-6 text-sm">Test Status</th>
                  </tr>
                </thead>
                <tbody>
                  {findTestsByCustomerId(selectedCustomer._id).map((test, index) => {
                    const rate = findRateById(test.rateId);
                    return (
                      <tr
                        key={test._id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                      >
                        <td className="py-2 px-6 text-sm">{rate.countryCode || "N/A"}</td>
                        <td className="py-2 px-6 text-sm">{rate.country || "N/A"}</td>
                        <td className="py-2 px-6 text-sm">{rate.rate || "N/A"}</td>
                        <td className="py-2 px-6 text-sm">{rate.qualityDescription || "N/A"}</td>
                        <td className="py-2 px-6 text-sm">{rate.profile || "N/A"}</td>
                        <td className="py-2 px-6 text-sm">{rate.status || "N/A"}</td>
                        <td className="py-2 px-6 text-sm">{test.testStatus || "N/A"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    )
  }
    </DashboardLayout >
  );
};

export default TestingPage;