import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import DashboardLayout from '../dash_layout/page';
import axios from 'axios';

const MyRatesPage = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('countryCode'); // Default sort option
  const [myRatesData, setMyRatesData] = useState([]); // Initialize myRatesData as empty
  const [customerData, setCustomerData] = useState(null); // Initialize customerData as null
  const [testsData, setTestsData] = useState([]); // State to store tests data
  const [statusFilter, setStatusFilter] = useState('all'); // Status filter
  const [selectedRates, setSelectedRates] = useState([]); // Track selected rates
  const [showCheckboxes, setShowCheckboxes] = useState(false); // Controls whether checkboxes are visible
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [dataNotFound, setDataNotFound] = useState(false); // Track if no data is found
  const [rates, setRates] = useState([]);
  const [ccrates, setCCRates] = useState([]);
  const [clirates, setCLIRates] = useState([]);
  const [ccRatesModal, setCCRatesModal] = useState(true);
  const [cliRatesModal, setCLIRatesModal] = useState(false);
  const [cliRatesData, setCLIRatesData] = useState([]);
  const [currentRateType, setCurrentRateType] = useState("CCRate");
  // Fetch customer details
  useEffect(() => {
    const fetchCustomerData = async () => {
      const token = localStorage.getItem('token');
      const customerId = token ? jwtDecode(token).id : null; // Decode token to get customer ID

      if (customerId) {
        try {
          const response = await axios.get(`https://backend.cloudqlobe.com/v3/api/customers/${customerId}`);
          setCustomerData(response.data);
        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
      }
    };
    fetchCustomerData();
  }, []);

  // Fetch tests based on customer ID
  useEffect(() => {
    const fetchTests = async () => {
      if (customerData) {
        try {
          const response = await axios.get(`https://backend.cloudqlobe.com/v3/api/tests`);
          const allTests = response.data;

          const filteredTests = allTests.filter(test => test.customerId === customerData._id);
          setTestsData(filteredTests);
        } catch (error) {
          console.error('Error fetching tests:', error);
        }
      }
    };
    fetchTests();
  }, [customerData]);

  // Fetch rates based on myRatesId from customer data
  useEffect(() => {
    const fetchRates = async () => {
      if (customerData) {
        try {
          const ratesResponse = await axios.get(`https://backend.cloudqlobe.com/v3/api/myrates`);

          const ratesDataArray = ratesResponse.data.filter(rate => rate.customerId === customerData._id);
          const CCRateData = ratesResponse.data.filter(rate => rate.rate === "CC");
          const CLIRateData = ratesResponse.data.filter(rate => rate.rate === "CLI");
          setCCRates(CCRateData);
          setCLIRates(CLIRateData)
          setRates(ratesDataArray);
          console.log("ratesDataArray",ratesDataArray);
          
        } catch (error) {
          console.error('Error fetching rates:', error);
        }
      }
    };
    fetchRates();
  }, [customerData]);


  useEffect(() => {
    const fetchMyRates = async () => {
      if (rates && rates.length > 0) { // Check if rates exist and are not empty
        try {
          // Use Promise.all to handle multiple async calls
          const fetchedCCRates = await Promise.all(
            ccrates.map(async (rate) => {
              const response = await axios.get(`https://backend.cloudqlobe.com/v3/api/rates/${rate.rateId}`);
              return response.data; // Assuming each API call returns a rate object
            })
          );

          const fetchedCLIRates = await Promise.all(
            clirates.map(async (rate) => {
              const response = await axios.get(`https://backend.cloudqlobe.com/v3/api/clirates/${rate.rateId}`);
              return response.data; // Assuming each API call returns a rate object
            })
          );

          console.log("Fetched CC rates from the API:", fetchedCCRates);
          console.log("Fetched CLI rates from the API:", fetchedCLIRates);

          // Combine the fetched rates
          const combinedRates = [...fetchedCCRates,...fetchedCLIRates];
          setCLIRatesData(fetchedCLIRates)
console.log(combinedRates);

          // Save the combined rates to state
          setMyRatesData(combinedRates);
        } catch (error) {
          console.error('Error fetching rates:', error);
        }
      } else {
        console.log("No rates available to fetch");
      }
    };

    fetchMyRates();
  }, [rates, ccrates, clirates]); // Add `clirates` to dependencies if used


  // Loading state handling
  useEffect(() => {
    setLoading(!myRatesData.length && !testsData.length);
    setDataNotFound(myRatesData.length === 0 && testsData.length === 0);
  }, [myRatesData, testsData]);

  // Handle "Request Test" for selected items
  const handleRequestTest = async () => {
    try {
      const requestPromises = selectedRates.map(async (rate) => {
        const correspondingTest = testsData.find(test => test.rateCustomerId === `${customerData._id}hi${rate._id}`);

        const testStatus = correspondingTest ? correspondingTest.testStatus : rate.status;
        const testReason = 'Requested';

        return axios.post(`https://backend.cloudqlobe.com/v3/api/tests`, {
          rateId: rate._id,
          customerId: customerData._id,
          rateCustomerId: `${customerData._id}hi${rate._id}`,
          testStatus: "test requested",
          testReason: testReason,
        });
      });

      await Promise.all(requestPromises);
      alert('Tests Requested Successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error requesting tests:', error);
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (rate) => {
    if (selectedRates.some(item => item._id === rate._id)) {
      setSelectedRates(selectedRates.filter(item => item._id !== rate._id));
    } else {
      setSelectedRates([...selectedRates, rate]);
    }
  };

  // Combine rates and tests data
  const combinedData = myRatesData.map((data) => {
    const rate = data.rate
    const test = testsData.find((test) => test.customerId === `${customerData?._id}${rate._id}`);
    return {
      ...rate,
      testStatus: test ? test.testStatus : rate.status,
      testReason: test ? test.testReason : "N/A",
    };
  });

  const filteredData = !ccRatesModal ? combinedData : cliRatesData.filter(item =>
    item.country?.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === 'all' || item.testStatus === statusFilter)
  );

  const displayedData = filteredData

  // Handlers for button clicks
  const handleCCRate = () => {
    setCCRatesModal(!ccRatesModal)
    setCurrentRateType("CCRate");
  };

  const handleCLIRate = () => {
    setCLIRatesModal(!cliRatesModal)
    setCurrentRateType("CLIRate");
  };
  console.log("ccRatesModal",ccRatesModal);
  console.log("cliRatesModal",cliRatesModal);


  return (
    <DashboardLayout>
      <div className="p-6 text-gray-800">
        <div className="flex justify-between items-start w-full">
          <h2 className="text-2xl font-bold">My Rates</h2>
          {customerData && (
            <div className="flex flex-col items-end">
              <p className="text-gray-800 font-regular">
                Company Name: <span className="text-gray-600 font-bold">{customerData.companyName}</span>
              </p>
              <p className="text-gray-800 font-regular mt-1">
                Customer ID: <span className="text-gray-600 font-bold">{customerData.customerId}</span>
              </p>
            </div>
          )}
        </div>
        <p className="text-gray-600 mt-2">Manage your rates here.</p>

        {/* Title Bar with Search and Sort */}
        <div className="mt-8 flex items-center justify-between space-x-4">
          <div className="relative w-1/2 flex items-center">
            <input
              type="text"
              placeholder="Search by country name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="Test Requested">Test Requested</option>
            <option value="No Test Requested">No Test Requested</option>
          </select>

          {!showCheckboxes && (
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowCheckboxes(true)}
            >
              Select Rates
            </button>
          )}
        </div>
        <button
          style={{ background: currentRateType === "CCRate" ? "#005F73" : "black", color: "white", marginRight: "20px" }}
          onClick={handleCCRate}
        >
          CCRate
        </button>
        <button
          style={{ background: currentRateType === "CLIRate" ? "#005F73" : "black", color: "white" }}
          onClick={handleCLIRate}
        >
          CLIRate
        </button>
        {loading ? (
          <p>Loading rates...</p>
        ) : dataNotFound ? (
          <p>No data found.</p>
        ) : (

          <>
            <div >
              {/* CCRate Table */}
              <h2 className="text-lg font-bold mt-4">CC Rates</h2>
              <table className="min-w-full mt-6 rateTable border border-gray-300 shadow-md rounded-lg">
                <thead>
                  <tr className="bg-[#005F73] text-white">
                    <th className="border border-gray-300 px-4 py-2">Country Code</th>
                    <th className="border border-gray-300 px-4 py-2">Country Name</th>
                    <th className="border border-gray-300 px-4 py-2">Rate</th>
                    <th className="border border-gray-300 px-4 py-2">Quality Description</th>
                    <th className="border border-gray-300 px-4 py-2">Profile</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedData?.map((rate, index) => (
                    <tr key={index} className="text-gray-700">
                      <td className="border border-gray-300 px-4 py-2">{rate.countryCode || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{rate.country || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{rate.rate || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{rate.qualityDescription || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{rate.profile || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{rate.status || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CLIRate Table */}
            <div>
              <h2 className="text-lg font-bold mt-8">CLI Rates</h2>
              <table className="min-w-full mt-6 rateTable border border-gray-300 shadow-md rounded-lg">
                <thead>
                  <tr className="bg-[#005F73] text-white">
                    <th className="border border-gray-300 px-4 py-2">Country Code</th>
                    <th className="border border-gray-300 px-4 py-2">Country Name</th>
                    <th className="border border-gray-300 px-4 py-2">Rate</th>
                    <th className="border border-gray-300 px-4 py-2">Quality Description</th>
                    <th className="border border-gray-300 px-4 py-2">Billing Cycle</th>
                    <th className="border border-gray-300 px-4 py-2">RTP</th>
                    <th className="border border-gray-300 px-4 py-2">ASR</th>
                    <th className="border border-gray-300 px-4 py-2">ACD</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cliRatesData.map((rate, index) => (
                    <tr key={index} className="text-gray-700">
                      <td className="border border-gray-300 px-4 py-2">{rate.countryCode || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{rate.country || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{rate.rate || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{rate.qualityDescription || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{rate.billingCycle || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{rate.rtp || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{rate.asr || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{rate.acd || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{rate.status || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {showCheckboxes && (
          <div className="mt-6 flex justify-end space-x-4">
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => setShowCheckboxes(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleRequestTest}
            >
              Request Test
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyRatesPage;
