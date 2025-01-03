import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosinstance';
import Layout from '../../layout/page';
import axios from 'axios';

const Modal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [newLead, setNewLead] = useState(initialData || {
    countryCode: '',
    country: '',
    qualityDescription: '',
    status: 'inactive',
    profile: {
      Outbound: '',
      IVR: '',
    },
    category: '',
    specialRate: false,
    addToTicker: false,
  });  

  useEffect(() => {
    if (initialData) {
      setNewLead(initialData);
    } else {
      setNewLead({
        countryCode: '',
        country: '',
        qualityDescription: '',
        status: 'inactive',
        profile: {
          Outbound: '',
          IVR: '',
        },
        category:'',
        specialRate: false,
        addToTicker: false,
      });
    }
  }, [initialData]);


  const handleInputChange = (profileType, value) => {
    setNewLead((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [profileType]: value, // Update the corresponding profile type
      },
    }));
  };


  const handleAddLead = async (e) => {
    e.preventDefault();

    const leadData = { ...newLead };
    
    if (leadData.specialRate) {
      leadData.category = 'specialrate';
    } else {
      leadData.category = newLead.category;
    }
    console.log(leadData);

    await onSubmit(leadData);
    console.log(leadData);
    

    // If "Add to Ticker" is selected, update the cct API with this rate's ID
    if (leadData.addToTicker) {
      try {
        await axiosInstance.post('/v3/api/cct', leadData);
        console.log("Added to ticker");
      } catch (error) {
        console.error("Failed to add rate to ticker:", error);
      }
    }

    setNewLead({
      countryCode: '',
      country: '',
      qualityDescription: '',
      status: 'inactive',
      profile: {
        Outbound: '',
        IVR: '',
      },
      category:'',
      specialRate: false,
      addToTicker: false,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">{initialData ? 'Update Rate' : 'Add New Rate'}</h3>
        <form onSubmit={handleAddLead}>
          <input
            type="text"
            placeholder="Country Code"
            value={newLead.countryCode}
            onChange={(e) => setNewLead({ ...newLead, countryCode: e.target.value })}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Country"
            value={newLead.country}
            onChange={(e) => setNewLead({ ...newLead, country: e.target.value })}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Quality Description"
            value={newLead.qualityDescription}
            onChange={(e) => setNewLead({ ...newLead, qualityDescription: e.target.value })}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Enter OutBound value"
            value={newLead.profile.Outbound}
            onChange={(e) => handleInputChange("Outbound", e.target.value)}
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            
          />
        <input
          type="text"
          placeholder="Enter IVR value"
          value={newLead.profile.IVR}
          onChange={(e) => handleInputChange("IVR", e.target.value)}
          className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
          
        />

          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={newLead.specialRate}
              onChange={(e) => setNewLead({ ...newLead, specialRate: e.target.checked })}
              className="mr-2"
            />
            Special Rate
          </label>
          <label className="flex items-center mb-4">
            <span className="mr-2">Status:</span>
            <select
              value={newLead.status}
              onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
              className="border border-gray-300 rounded-lg px-2 py-1"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={newLead.addToTicker}
              onChange={(e) => setNewLead({ ...newLead, addToTicker: e.target.checked })}
              className="mr-2"
            />
            Add to Ticker
          </label>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {initialData ? 'Update Rate' : 'Add Rate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RatesPage = () => {
  const [rateData, setRateData] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('country');
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentRate, setCurrentRate] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
console.log(rateData);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('https://backend.cloudqlobe.com/v3/api/rates');
        setRateData(response.data);
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };
    fetchRates();
  }, []);

  const handleAddLead = async (leadData) => {
    
    try {
      let response;
      if (isUpdateMode) {
        response = await axiosInstance.put(`v3/api/rates/${currentRate._id}`, leadData);
      } else {
        response = await axiosInstance.post('v3/api/rates', leadData);
      }
      setRateData((prev) =>
        isUpdateMode
          ? prev.map(rate => (rate._id === currentRate._id ? response.data : rate))
          : [...prev, response.data]
      );
      setSuccessMessage(isUpdateMode ? 'Rate updated successfully!' : 'Lead added successfully!');
      setErrorMessage('');
      setModalOpen(false);
      setIsUpdateMode(false);
      setCurrentRate(null);
    } catch (error) {
      console.error('Error adding/updating lead:', error);
      setErrorMessage('Failed to add/update lead. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleUpdateClick = (rate) => {
    setCurrentRate(rate);
    setIsUpdateMode(true);
    setModalOpen(true);
  };

  const handleDeleteClick = async (rateId) => {
    try {
      await axiosInstance.delete(`v3/api/rates/${rateId}`);
      setRateData(rateData.filter((rate) => rate._id !== rateId));
      setSuccessMessage('Rate deleted successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting rate:', error);
      setErrorMessage('Failed to delete rate. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-semibold">Rates Management</h1>
        {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}

        <div className="flex justify-between mt-4">
          <input
            type="text"
            placeholder="Search by Country or Profile"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="country">Sort by Country</option>
            <option value="rate">Sort by Rate</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>

        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            setIsUpdateMode(false);
            setCurrentRate(null);
            setModalOpen(true);
          }}
        >
          Add Rate
        </button>

        <table className="min-w-full bg-white shadow-lg border mt-4">
          <thead>
            <tr className="bg-[#005F73] text-white">
              <th className="py-2 px-4 border">Country Code</th>
              <th className="py-2 px-4 border">Country</th>
              <th className="py-2 px-4 border">Quality Description</th>
              {/* <th className="py-2 px-4 border">Rate</th> */}
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Profile</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
  {rateData
    .filter((rate) =>
      rate.country.toLowerCase().includes(search.toLowerCase()) ||
      Object.values(rate.profile).some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sort === 'country') return a.country.localeCompare(b.country);
      if (sort === 'rate') return a.rate - b.rate;
      if (sort === 'status') return a.status.localeCompare(b.status);
      return 0;
    })
    .map((rate) => (
      <tr key={rate._id}>
        <td className="py-2 px-4 border">{rate.countryCode}</td>
        <td className="py-2 px-4 border">{rate.country}</td>
        <td className="py-2 px-4 border">{rate.qualityDescription}</td>
        {/* <td className="py-2 px-4 border">{rate.rate}</td> */}
        <td className="py-2 px-4 border">{rate.status}</td>
        <td className="py-2 px-4 border">
          {`Outbound: ${rate.profile?.Outbound || 'N/A'}, IVR: ${rate.profile?.IVR || 'N/A'}`}
        </td>
        <td className="py-2 px-4 border">
          <button
            onClick={() => handleUpdateClick(rate)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(rate._id)}
            className="text-red-500 hover:text-red-700 ml-2"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
</tbody>

        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddLead}
        initialData={isUpdateMode ? currentRate : null}
      />
    </Layout>
  );
};

export default RatesPage;
