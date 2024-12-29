import axios from "axios";
import { useState } from "react";

const TechnicalInfo = () => {
  const [formData, setFormData] = useState({
    supportEmail: "",
    sipSupport: "",
    switchIps: [],
    codex: "",
    userFirstname: "",
    userLastname: "",
  });

  const [ips, setIps] = useState(formData.switchIps || []);
  const [currentIp, setCurrentIp] = useState("");
  const [error, setError] = useState("");

  const validateIp = (ip) => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const handleAddIp = () => {
    if (currentIp && validateIp(currentIp) && !ips.includes(currentIp) && ips.length < 30) {
      setIps([...ips, currentIp]);
      setCurrentIp("");
      setError("");
    } else {
      setError("Please enter a valid, unique IP address.");
    }
  };

  const handleRemoveIp = (ipToRemove) => {
    setIps(ips.filter((ip) => ip !== ipToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      handleAddIp();
    }
  };

  const handleTechniqalInfo = async () => {
    try {
      const response = await axios.post(
        "https://backend.cloudqlobe.com/v3/api/customers",
        { ...formData, switchIps: ips }
      );
      console.log("Data submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Technical Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Support Email</label>
          <input
            type="email"
            className="w-full border rounded p-2"
            placeholder="Support email"
            value={formData.supportEmail}
            onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-2">SIP Port</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="SIP port"
            value={formData.sipSupport}
            onChange={(e) => setFormData({ ...formData, sipSupport: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Switch IP</label>
          <div className="flex items-center">
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter Switch IP"
              value={currentIp}
              onChange={(e) => setCurrentIp(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleAddIp}
            >
              Add IP
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="mt-2 flex flex-wrap">
            {ips.map((ip, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2 flex items-center"
              >
                {ip}
                <button
                  type="button"
                  onClick={() => handleRemoveIp(ip)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-2">Codex</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Codex"
            value={formData.codex}
            onChange={(e) => setFormData({ ...formData, codex: e.target.value })}
          />
        </div>
      </div>
      <button
        onClick={handleTechniqalInfo}
        className="mt-6 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Next
      </button>
    </div>
  );
};

export default TechnicalInfo;
