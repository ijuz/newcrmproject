import React, { useState } from "react";

const CompanyInfo = ({ onNext, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  console.log("Error", errors);

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = "Company Name is required.";
    if (!formData.companyEmail || !/\S+@\S+\.\S+/.test(formData.companyEmail))
      newErrors.companyEmail = "Valid email is required.";
    if (!formData.contactPerson) newErrors.contactPerson = "Contact Person is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.companyPhone || !/^\d+$/.test(formData.companyPhone))
      newErrors.companyPhone = "Valid phone number is required.";
    if (!formData.address) newErrors.address = "Address is required.";

    console.log("new", newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    // Remove the specific error for the field if it becomes valid
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (field === "companyName" && value) delete newErrors.companyName;
      if (field === "companyEmail" && /\S+@\S+\.\S+/.test(value)) delete newErrors.companyEmail;
      if (field === "contactPerson" && value) delete newErrors.contactPerson;
      if (field === "country" && value) delete newErrors.country;
      if (field === "companyPhone" && /^\d+$/.test(value)) delete newErrors.companyPhone;
      if (field === "address" && value) delete newErrors.address;
      return newErrors;
    });
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
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
            className={`w-full border rounded p-2 ${errors.companyName ? "border-red-500" : ""}`}
            placeholder="Company name"
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            required
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Company Email</label>
          <input
            type="email"
            className={`w-full border rounded p-2 ${errors.companyEmail ? "border-red-500" : ""}`}
            placeholder="Email"
            value={formData.companyEmail}
            onChange={(e) => handleInputChange("companyEmail", e.target.value)}
            required
          />
          {errors.companyEmail && (
            <p className="text-red-500 text-sm">{errors.companyEmail}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Contact Person</label>
          <input
            type="text"
            className={`w-full border rounded p-2 ${errors.contactPerson ? "border-red-500" : ""}`}
            placeholder="Name"
            value={formData.contactPerson}
            onChange={(e) => handleInputChange("contactPerson", e.target.value)}
            required
          />
          {errors.contactPerson && (
            <p className="text-red-500 text-sm">{errors.contactPerson}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Country</label>
          <select
            className={`w-full border rounded p-2 ${errors.country ? "border-red-500" : ""}`}
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="India">India</option>
            {/* Add more countries */}
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Company Phone</label>
          <input
            type="tel"
            className={`w-full border rounded p-2 ${errors.companyPhone ? "border-red-500" : ""}`}
            placeholder="Phone"
            value={formData.companyPhone}
            onChange={(e) => handleInputChange("companyPhone", e.target.value)}
            required
          />
          {errors.companyPhone && (
            <p className="text-red-500 text-sm">{errors.companyPhone}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Address</label>
          <textarea
            className={`w-full border rounded p-2 ${errors.address ? "border-red-500" : ""}`}
            placeholder="Address"
            rows={3}
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            required
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Company Website</label>
          <input
            type="url"
            placeholder="Website"
            value={formData.companyWebsite}
            onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
            required
          />
        </div>
      </div>
      <button
        onClick={handleNext}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};
export default CompanyInfo