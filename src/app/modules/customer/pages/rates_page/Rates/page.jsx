import React, { useState, useEffect } from "react";
import { PlusIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles2 from "../../../../../components/RatesNavbar.module.css";
import { faChartLine, faStar, faCheckCircle, faPlusCircle, faFilter, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../../../admin/v2/utils/axiosinstance";

const NormalRatesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [sort, setSort] = useState("countryCode");
  const [normalRatesData, setNormalRatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRates, setSelectedRates] = useState([]);
  const [customerData, setCustomerData] = useState(null);
  const [showSelectColumn, setShowSelectColumn] = useState(false);
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  // const [rates, setRates] = useState();
  const [filterMyRate, setFilterMyRate] = useState()
  const [addMyRates, setAddMyRates] = useState()
  const filterData = location.state || {};

  useEffect(() => {
    if (filterData) {
      setFilterMyRate(filterData);
    }
  }, []);

  const getCustomerIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null
    const decoded = jwtDecode(token);
    return decoded.id;
  };

  useEffect(() => {
    const fetchCustomerAndRates = async () => {
      setLoading(true);
      try {
        const customerId = getCustomerIdFromToken();
        if (customerId) {
          const customerResponse = await axios.get(`https://backend.cloudqlobe.com/v3/api/customers/${customerId}`);
          setCustomerData(customerResponse.data);
          const ratesResponse = await axios.get("https://backend.cloudqlobe.com/v3/api/rates");
          const specialRates = ratesResponse.data.filter(rate => rate.category === "specialrate");
          setNormalRatesData(specialRates);
        }
        const ratesResponse = await axios.get("https://backend.cloudqlobe.com/v3/api/rates");
        const specialRates = ratesResponse.data.filter(rate => rate.category === "specialrate");
        setNormalRatesData(specialRates);

      } catch (error) {
        console.error("Error fetching customer or rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerAndRates();
  }, []);

  const filteredData =
    Array.isArray(filterMyRate) && filterMyRate.length > 0
      ? filterMyRate
      : normalRatesData.filter((item) =>
        item.country.toLowerCase().includes(search.toLowerCase())
      );

  const sortedData = filteredData.sort((a, b) => {
    return sort === "countryName"
      ? a.country.localeCompare(b.country)
      : a.countryCode.localeCompare(b.countryCode);
  });

  const displayedData = showOnlySelected ? selectedRates : sortedData;

  // console.log(selectedRates);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-orange-300 border-solid rounded-full"
        />
      </div>
    );
  }

    // Check if a rate is disabled based on customer's data
    const isRateDisabled = (rateId) => {
      if (!customerData) return false;
      const { myRatesId, rateAddedtotest, rateTested, rateTesting } = customerData;
  
      return (
        myRatesId.includes(rateId) ||
        rateAddedtotest.includes(rateId) ||
        rateTested.includes(rateId) ||
        rateTesting.includes(rateId)
      );
    };

  const navigateToRatesPage = () => {
    navigate("/pricing");
  };

  const handleMyRates = async () => {
    if (!Array.isArray(filterData) || filterData.length === 0) {
      console.error("No rates to add.");
      return;
    }

    const customerId = getCustomerIdFromToken();
    if (!customerId) {
      console.error("Customer ID is missing.");
      navigate('/signIn')
      return;
    }

    try {
      for (const rate of filterData) {
        await axiosInstance.post("v3/api/myrates", {
          customerId,
          rateId: rate._id,
          testStatus: rate.testStatus,
          addedTime: rate.addedTime,
        });
      }
      alert("All rates added successfully.");
      filterData = ''
    } catch (error) {
      console.error("Error adding rates:", error);
    }
  };



  return (
    <>
      <Header />
      <header className={styles2.header}>
        <nav className={styles2.navbar}>
          <div className={styles2.navbarLeft}>
            <div className={styles2.navbarItem} onClick={() => navigate("/cliratestable")}>
              <div className={styles2.navbarItemIcon}>
                <FontAwesomeIcon icon={faChartLine} size="lg" />
              </div>
              <div className={`${styles2.navbarItemText} ${!customerId ? styles2.disabled : ""}`}>CLI Rates</div>
            </div>

            <div className={styles2.navbarItem} onClick={()=>navigate('/specialrates')}>
              <div className={styles2.navbarItemIcon} >
                <FontAwesomeIcon icon={faStar} size="lg" />
              </div>
              <div className={`${styles2.navbarItemText} ${!customerId ? styles2.disabled : ""}`}>Special Rates</div>
            </div>

            <div className={styles2.navbarItem} onClick={navigateToRatesPage}>
              <div className={styles2.navbarItemIcon}>
                <FontAwesomeIcon icon={faCheckCircle} size="lg" />
              </div>
              <div className={`${styles2.navbarItemText} ${!customerId ? styles2.disabled : ""}`}>Select Rates</div>
            </div>

            <div className={styles2.navbarItem} onClick={navigateToRatesPage}>
              <div className={styles2.navbarItemIcon}>
                <FontAwesomeIcon icon={faFilter} size="lg" />
              </div>
              <div className={`${styles2.navbarItemText} ${!customerId ? styles2.disabled : ""}`}>Filter Rates</div>
            </div>

            <div className={styles2.navbarItem} onClick={handleMyRates}>
              <div className={styles2.navbarItemIcon}>
                <FontAwesomeIcon icon={faPlusCircle} size="lg" />
              </div>
              <div className={`${styles2.navbarItemText} ${!customerId ? styles2.disabled : ""}`}>Add Rates</div>
            </div>

          </div>
          <div className={styles2.navbarProfile}>
            {customerId} &ensp;<FontAwesomeIcon icon={faUserCircle} size="lg" />
          </div>
        </nav>
      </header>
      <div className="p-6 bg-gray-100 text-gray-800">
        <div className="mt-6 flex items-center justify-between space-x-4">
          <div className="flex w-2/3 ml-5 space-x-2">
            <input
              type="text"
              placeholder="Search by country name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-grow bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-orange-600 text-white font-regular rounded-lg hover:bg-orange-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500">
              Search
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowSelectColumn(!showSelectColumn)}
              className="px-6 py-2 bg-green-600 text-white font-regular mr-5 rounded-lg hover:bg-orange-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {showSelectColumn ? "Hide Select Rates" : "Select Rates"}
            </button>
            <button
              style={{ marginRight: "2em" }}
              onClick={() => setShowOnlySelected(!showOnlySelected)}
              className="w-10 h-10 bg-[#005F73] text-white rounded-full hover:bg-orange-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              <FunnelIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="tableContainer overflow-x-auto py-5 rounded-lg">
          <table className="rateTable w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-[#005F73] text-white uppercase tracking-wider rounded-lg">
                {showSelectColumn && (
                  <th className="p-2 text-center border border-gray-300">Select</th>
                )}
                <th className="p-2 text-center border border-gray-300 w-1/6">Country Code</th>
                <th className="p-2 text-center border border-gray-300 w-1/4">Country Name</th>
                <th className="p-2 text-center border border-gray-300">Quality Description</th>
                <th className="p-2 text-center border border-gray-300">Rate</th>
                <th className="p-2 text-center border border-gray-300">Profile</th>
                <th className="p-2 text-center border border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr
                  key={item._id}
                  className={`${index % 2 === 0 ? "bg-[#dde0e5]" : "bg-[#FFFFFF]"
                    } hover:bg-[#b5b8bc] transition duration-200 ease-in-out`}
                >
                  {showSelectColumn && (
                    <td className="p-2 text-center border border-gray-300">
                      <input
                        type="checkbox"
                        disabled={isRateDisabled(item._id)}
                        checked={selectedRates.some((rate) => rate._id === item._id)}
                        onChange={() => {
                          if (selectedRates.some((rate) => rate._id === item._id)) {
                            setSelectedRates(
                              selectedRates.filter((rate) => rate._id !== item._id)
                            );
                          } else {
                            setSelectedRates([...selectedRates, item]);
                          }
                        }}
                      />
                    </td>
                  )}
                  <td className="p-2 text-center border border-gray-300">{item.countryCode}</td>
                  <td className="p-2 text-center border border-gray-300">{item.country}</td>
                  <td className="p-2 text-center border border-gray-300">{item.qualityDescription}</td>
                  <td className="p-2 text-center border border-gray-300">{item.rate}</td>
                  <td className="p-2 text-center border border-gray-300">{item.profile}</td>
                  <td className="p-2 text-center border border-gray-300">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default NormalRatesPage;