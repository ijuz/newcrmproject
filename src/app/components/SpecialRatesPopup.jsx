import React, { useState, useEffect } from "react";
import { Sparkles, Crown, DollarSign } from "lucide-react";

const CountryRatesTable = ({ isVisible }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 6;
  const [sortConfig, setSortConfig] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/v3/api/rates");
      if (!response.ok) throw new Error("Failed to fetch data");
      const fetchedData = await response.json();
      setData(fetchedData.filter((rate) => rate.category === "specialrate"));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortData = (key) => {
    const direction = sortConfig?.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  };

  const paginatedData = sortedData().slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className={`bg-transparent mx-auto p-1 rounded-lg transition-transform duration-300 ${isVisible ? "slide-in-right" : "translate-x-full"}`}>
      <style>{`
        .slide-in-right {
          animation: slide-in-right 0.5s forwards;
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {loading ? (
        <div className="flex items-center justify-center h-20 text-orange-500">
          Loading...
        </div>
      ) : (
        <div className="bg-white shadow-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-amber-500">
                {['Country', 'Quality', 'Rate'].map((header, index) => (
                  <th
                    key={index}
                    onClick={() => sortData(header.toLowerCase())}
                    className="py-4 px-6 text-white cursor-pointer hover:bg-amber-600"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-3">{item.country}</td>
                  <td className="px-6 py-3 text-sm text-blue-500">{item.qualityDescription}</td>
                  <td className="px-6 py-3">${item.rate.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center p-4">
            <button
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {Math.ceil(data.length / rowsPerPage)}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300"
              disabled={currentPage === Math.ceil(data.length / rowsPerPage)}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(data.length / rowsPerPage)))}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const FloatingButton = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <div className="fixed right-5 top-1/3">
      <button
        className="flex justify-center items-center w-16 h-16 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600"
        onClick={() => setIsCardOpen(!isCardOpen)}
      >
        <DollarSign className="w-8 h-8" />
      </button>
      {isCardOpen && <CountryRatesTable isVisible={isCardOpen} />}
    </div>
  );
};

export default FloatingButton;
