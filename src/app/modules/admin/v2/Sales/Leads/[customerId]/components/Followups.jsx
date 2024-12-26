import { DatabaseZapIcon,FileStack } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaHistory } from "react-icons/fa"; // Import icons

const FollowUpTab = ({ setActiveTab }) => {
  const [followups, setFollowups] = useState([]);
  const [newFollowUp, setNewFollowUp] = useState("");

  useEffect(() => {
    const fetchFollowups = async () => {
      try {
        const response = await fetch("http://localhost:5000/v3/api/followups");
        const data = await response.json();
        setFollowups(data);
      } catch (error) {
        console.error("Error fetching followups:", error);
      }
    };

    fetchFollowups();
  }, []);

  const handleAddFollowUp = async () => {
    if (!newFollowUp.trim()) return;

    const newFollowUpObj = {
      followupDescription: [newFollowUp],
      followupTime: new Date(),
    };

    const response = await fetch("http://localhost:5000/v3/api/followups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFollowUpObj),
    });

    if (response.ok) {
      setFollowups((prevFollowups) => [...prevFollowups, newFollowUpObj]);
      setNewFollowUp(""); // Clear the input field after adding
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6 relative">
      {/* Header Section with Icon and Button */}
      <div className="w-full max-w-4xl bg-white rounded-lg overflow-hidden mb-4 p-6">
        <div className="flex justify-between items-center border-b-2 border-gray-200 mb-4">
          {/* History Icon in a Circle */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-500 rounded-full">
              <FileStack  className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">FOLLOW-UP HISTORY</h2>
          </div>

          {/* Button to Navigate to Follow-Up Form */}
          <button
            onClick={() => setActiveTab("formfollow")}
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-xl hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out transform hover:scale-110"
          >
            <DatabaseZapIcon className="text-xl" />
            <span>Add Follow-Up</span>
          </button>
        </div>
      </div>

      {/* Main Follow-Up Box */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden mb-14">
        {/* Chat-like Follow-Up Notes */}
        <div className="p-6 max-h-[500px] overflow-y-auto space-y-4 bg-gray-50 border-b-2 border-gray-200">
          {followups.length > 0 ? (
            followups.map((followup, index) => (
              <div
                key={followup._id}
                className={`flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`p-4 ${
                    index % 2 === 0
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-400 text-orange-800"
                  } rounded-lg shadow-md max-w-xs`}
                >
                  <p className="font-medium">
                    {followup.followupDescription?.join(", ")}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(followup.followupTime).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No follow-ups available</div>
          )}
        </div>

        {/* Chat Bar to Add Follow-Up */}
        <div className="w-full bg-white flex items-center p-4 shadow-md rounded-lg space-x-4">
          <textarea
            value={newFollowUp}
            onChange={(e) => setNewFollowUp(e.target.value)}
            placeholder="Type your follow-up..."
            className="w-full p-3 bg-gray-100 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            onClick={handleAddFollowUp}
            className="bg-gradient-to-r from-green-400 to-green-400 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-500 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpTab;
