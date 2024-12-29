import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyInfo = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    contactPerson: "",
    country: "",
    companyPhone: "",
    address: "",
    companyWebsite: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName) newErrors.companyName = "Company Name is required.";
    if (!formData.companyEmail || !/\S+@\S+\.\S+/.test(formData.companyEmail))
      newErrors.companyEmail = "Valid Email is required.";
    if (!formData.contactPerson) newErrors.contactPerson = "Contact Person is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.companyPhone || !/^\d+$/.test(formData.companyPhone))
      newErrors.companyPhone = "Valid Phone number is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (
      formData.companyWebsite &&
      !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(formData.companyWebsite)
    )
      newErrors.companyWebsite = "Valid Website URL is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlecompanyInfo = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://backend.cloudqlobe.com/v3/api/customers",
        formData
      );
      console.log("Response:", response.data);
      // Navigate to next step or success page
      navigate("/next-step");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Failed to submit the form. Please try again." });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Company Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Company Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Company name"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Company Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            placeholder="Email"
            value={formData.companyEmail}
            onChange={(e) =>
              setFormData({ ...formData, companyEmail: e.target.value })
            }
          />
          {errors.companyEmail && (
            <p className="text-red-500 text-sm">{errors.companyEmail}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Contact Person</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Name"
            value={formData.contactPerson}
            onChange={(e) =>
              setFormData({ ...formData, contactPerson: e.target.value })
            }
          />
          {errors.contactPerson && (
            <p className="text-red-500 text-sm">{errors.contactPerson}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Country</label>
          <select
            className="w-full border rounded p-2"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          >
            <option value="">Select</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Company Phone</label>
          <input
            type="tel"
            className="w-full border rounded p-2"
            placeholder="Phone"
            value={formData.companyPhone}
            onChange={(e) =>
              setFormData({ ...formData, companyPhone: e.target.value })
            }
          />
          {errors.companyPhone && (
            <p className="text-red-500 text-sm">{errors.companyPhone}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Address</label>
          <textarea
            className="w-full border rounded p-2"
            placeholder="Address"
            rows={3}
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Company Website</label>
          <input
            type="url"
            className="w-full border rounded p-2"
            placeholder="Website"
            value={formData.companyWebsite}
            onChange={(e) =>
              setFormData({ ...formData, companyWebsite: e.target.value })
            }
          />
          {errors.companyWebsite && (
            <p className="text-red-500 text-sm">{errors.companyWebsite}</p>
          )}
        </div>
      </div>
      {errors.submit && (
        <p className="text-red-500 text-sm mt-4">{errors.submit}</p>
      )}
      <button
        onClick={handlecompanyInfo}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};

export default CompanyInfo;
