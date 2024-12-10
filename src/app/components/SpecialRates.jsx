import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ticker from "./Ticker";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { generateSchema } from '../schemaGenerator';
import {
  faChartLine,
  faStar,
  faCheckCircle,
  faPlusCircle,
  faFilter,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./RateTable.module.css";
import styles2 from "./RatesNavbar.module.css";

const RateTable = ({ className }) => {
  const history = useHistory();
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRates, setFilteredRates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const rowsPerPage = 7;
  const [customerId, setCustomerId] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectingRates, setSelectingRates] = useState(false);
  const [selectedRates, setSelectedRates] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("https://cloudqlobe-server.onrender.com/v3/api/rates");
        if (!response.ok) throw new Error("Failed to fetch rates");
        const data = await response.json();
        setRates(data);
        setFilteredRates(data);

        const uniqueCountries = Array.from(new Set(data.map((rate) => rate.country)));
        setCountryOptions(["All", ...uniqueCountries]);
      } catch (err) {
        setError("Error fetching rates.");
      } finally {
        setLoading(false);
      }
    };
    const id = getCustomerIdFromToken();
    setCustomerId(id);
    fetchRates();
  }, []);

  const getCustomerIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        return decoded.customerId || "Guest";
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
    return "Not signed in";
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRates.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRates.length / rowsPerPage);

  const handleFilter = () => {
    const countryFilteredRates = selectedCountry === "All"
      ? rates
      : rates.filter(rate => rate.country === selectedCountry);

    const selectedRatesFilter = Object.keys(selectedRates)
      .filter(id => selectedRates[id])
      .map(id => countryFilteredRates.find(rate => rate._id === id))
      .filter(Boolean);

    setFilteredRates(selectedRatesFilter.length ? selectedRatesFilter : countryFilteredRates);
    setCurrentPage(1);
  };

  const toggleRateSelection = (id) => {
    setSelectedRates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectRatesClick = () => {
    setSelectingRates(prev => !prev);
  };

  const navigateToRatesPage = () => {
    history.push('/modules/customer/pages/rates_page/Rates');
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const structuredData = generateSchema("ItemList", {
    items: rates.map(rate => ({
      name: rate.qualityDescription,
      url: "https://www.cloudqlobe.com/pricing",
    })),
  });

  return (
    <>
      <header className={styles2.header}>
        <nav className={styles2.navbar}>
          <div className={styles2.navbarLeft}>
            <div className={styles2.navbarItem} onClick={() => history.push('/clirates')}>
              <div className={styles2.navbarItemIcon}>
                <FontAwesomeIcon icon={faChartLine} size="lg" />
              </div>
              <div className={`${styles2.navbarItemText} ${!customerId ? styles2.disabled : ''}`}>CLI Rates</div>
            </div>
            <div className={styles2.navbarItem} onClick={navigateToRatesPage}>
              <div className={styles2.navbarItemIcon}>
                <FontAwesomeIcon icon={faStar} size="lg" />
              </div>
              <div className={`${styles2.navbarItemText} ${!customerId ? styles2.disabled : ''}`}>Special Rates</div>
            </div>
            <div className={styles2.navbarItem} onClick={navigateToRatesPage}>
              <div className={styles2.navbarItemIcon}>
                <FontAwesomeIcon icon={faCheckCircle} size="lg" />
              </div>
              <div className={`${styles2.navbarItemText} ${!customerId ? styles2.disabled : ''}`}>Select Rates</div>
            </div>
            <div className={styles2.navbarItem} onClick={navigateToRatesPage}>
              <div className={styles2.navbarItemIcon}>
                <FontAwesomeIcon icon={faPlusCircle} size="lg" />
              </div>
              <div className={`${styles2.navbarItemText} ${!customerId ? styles2.disabled : ''}`}>Add Rates</div>
            </div>
            <div className={styles2.navbarItem} onClick={navigateToRatesPage}>
              <div className={styles2.navbarItemIcon}>
                <FontAwesomeIcon icon={faFilter} size="lg" />
              </div>
              <div className={`${styles2.navbarItemText} ${!customerId ? styles2.disabled : ''}`}>Filter Rates</div>
            </div>
          </div>
          <div className={styles2.navbarProfile}>
            {customerId} &ensp;<FontAwesomeIcon icon={faUserCircle} size="lg" />
          </div>
        </nav>
      </header>

      <div className={styles.container}>
        {error && <div className={styles.errorNotification}><p>{error}</p></div>}
        <Ticker />

        <div className={styles.container} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="flex items-center" style={{ marginLeft: "3.5em" }}>
            <div className="bg-orange-500 text-2xl rounded-lg text-white p-2 mr-2" style={{ paddingTop: ".25em", paddingLeft: ".8em", paddingRight: ".8em", paddingBottom: ".25em" }}>
              $
            </div>
            <div className="flex items-center p-2 py-2 rounded-lg bg-blue-500">
              <h1 className="text-lg font-regular text-white mb-0">Premium CC Routes</h1>
            </div>
          </div>

          <div className={styles.searchArea} style={{ display: "flex", alignItems: "center", marginRight: "3em" }}>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {countryOptions.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <button
              className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-md shadow"
              onClick={handleFilter}
            >
              Filter
            </button>
          </div>
        </div>

        {/* Display rates table and pagination */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Rate</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((rate) => (
                <tr key={rate._id}>
                  <td>{rate.qualityDescription}</td>
                  <td>{rate.details}</td>
                  <td>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => toggleRateSelection(rate._id)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default RateTable
