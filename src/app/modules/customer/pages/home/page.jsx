import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  ChevronUp,
  Bell,
  Settings,
  Building2,
  Edit,
  ExternalLink,
  Hash,
  Mail,
  Users, 
  Network,
  Globe,
  Activity,
  Signal,
  Trophy
} from 'lucide-react';
import DashboardLayout from '../dash_layout/page';
import Ticker from '../../../../components/Ticker';
// import axiosInstance from '@/app/modules/admin/utils/axiosinstance';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/v3/api/clirates');
        setTickerData(response.data);
      } catch (error) {
        console.error("Error fetching ticker data:", error);
      }
    };

    fetchTickerData();
  }, []);

  const stats = [
    { icon: Users, label: 'Active Users', value: '500', trend: '+12%' },
    { icon: Trophy, label: 'Success Ratio', value: '98%', trend: '+1%' },
    { icon: Globe, label: 'Destinations', value: '50', trend: '+8%' },
    { icon: Activity, label: 'Carriers Interconnections', value: '250+', trend: '+2%' }
  ];

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const customerId = decoded.id;
          const response = await axios.get(`http://localhost:5000/v3/api/customers/${customerId}`);
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const company = {
    id: profileData?.customerId || "NA",
    name: profileData?.companyName || "NA",
    email: profileData?.companyEmail || "NA",
    country: profileData?.country || "NA"
  };

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const [sortConfig, setSortConfig] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://cloudqlobe-server.onrender.com/v3/api/rates");
      if (!response.ok) throw new Error("Failed to fetch data");

      const fetchedData = await response.json();
      const filteredData = fetchedData.filter(rate => rate.category === "specialrate");
      setData(filteredData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  };

  const scrollerRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    if (scrollerRef.current) {
      setScrollWidth(scrollerRef.current.offsetWidth);
    }
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = getSortedData().slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full">
        <div className="flex flex-col bg-white items-center space-y-8 px-4 py-4 mx-auto" style={{ width: "80em" }}>
          <div className="flex bg-gray-200 rounded-lg shadow-lg p-6 gap-6">
            {/* Welcome Section */}
            <div className="w-1/3 flex flex-col justify-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="text-orange-600" size={28} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome back to our<br />
                dashboard 👋
              </h1>
              <p className="text-gray-500">Stay updated with our latest Updates</p>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px bg-gray-100" />

            {/* Company Details Section */}
            <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Hash size={18} className="text-orange-600" />
                  <span className="text-sm font-medium text-gray-500">Customer ID</span>
                </div>
                <p className="text-gray-800 font-medium pl-7">{company.id}</p>
              </div>

              <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Building2 size={18} className="text-orange-600" />
                  <span className="text-sm font-medium text-gray-500">Company Name</span>
                </div>
                <p className="text-gray-800 font-medium pl-7">{company.name}</p>
              </div>

              <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Mail size={18} className="text-orange-600" />
                  <span className="text-sm font-medium text-gray-500">Contact Email</span>
                </div>
                <p className="text-gray-800 font-medium pl-7">{company.email}</p>
              </div>

              <div className="group bg-orange-50/50 hover:bg-orange-50 rounded-lg p-4 transition-all duration-200">
                <div className="flex items-center space-x-3 mb-2">
                  <Globe size={18} className="text-orange-600" />
                  <span className="text-sm font-medium text-gray-500">Country</span>
                </div>
                <p className="text-gray-800 font-medium pl-7">{company.country}</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-lg">
            {/* Ticker Section */}
            <div className="relative w-full">
              <div className="mt-4 mb-4"> <Ticker /> </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const backgroundColors = [
                'bg-green-500',
                'bg-orange-400',
                'bg-blue-400',
                'bg-rose-500'
              ];

              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${selectedCard === index ? 'ring-2 ring-white-500' : ''} ${backgroundColors[index % backgroundColors.length]}`}
                  onClick={() => setSelectedCard(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Icon className="text-orange-600" size={24} />
                    </div>
                    <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-white' : 'text-red-500'}`}>
                      {stat.trend}
                    </span>
                  </div>
                  <div className="mt-4 text-white font-semibold text-xl">{stat.value}</div>
                  <div className="text-white text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Data Table */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <table className="w-full table-auto">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-2 px-4 cursor-pointer" onClick={() => sortData('company')}>Company</th>
                  <th className="text-left py-2 px-4 cursor-pointer" onClick={() => sortData('rate')}>Rate</th>
                  <th className="text-left py-2 px-4">Date</th>
                  <th className="text-left py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-4 text-center">Loading...</td>
                  </tr>
                ) : currentRows.length > 0 ? (
                  currentRows.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{row.company}</td>
                      <td className="py-2 px-4">{row.rate}</td>
                      <td className="py-2 px-4">{row.date}</td>
                      <td className="py-2 px-4">{row.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                {[...Array(totalPages).keys()].map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number + 1)}
                    className={`py-2 px-4 rounded-full text-sm ${currentPage === number + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
