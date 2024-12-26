import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  FaUser,
  FaCreditCard,
  FaQuestionCircle,
  FaCommentDots,
  FaDollarSign,
  FaChevronDown,
} from "react-icons/fa";
import clsx from "clsx";
import Layout from "../../../layout/page";
import ProfileTab from "./components/Profile";
import PaymentsTab from "./components/Payments";
import SupportTab from "./components/Support";
import FollowUpTab from "./components/Followups";
import Rates from "./components/Rates";
import PrivateRates from "./components/PrivateRates";
import FormFollowUpTab from "./components/Formfollow";

const tabs = [
  {
    id: "profile",
    label: "Profile",
    icon: FaUser,
    color: "rose",
  },
  {
    id: "rates",
    label: "Rates",
    icon: FaDollarSign,
    color: "blue",
    submenu: [
      { id: "rates1", label: "Base Rates", path: "Rates" },
      { id: "rates2", label: "Private Rates", path: "PrivateRates" },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    icon: FaCreditCard,
    color: "amber",
  },
  {
    id: "support",
    label: "Support",
    icon: FaQuestionCircle,
    color: "purple",
  },
  {
    id: "followup",
    label: "Follow-Ups",
    icon: FaCommentDots,
    color: "slate",
  },
];

const LeadDetails = () => {
  const { customerId } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleTabClick = (tab) => {
    if (tab.submenu) {
      setDropdownOpen((prev) => (prev === tab.id ? null : tab.id));
    } else {
      setActiveTab(tab.id);
      setDropdownOpen(null);
    }
  };

  const handleSubItemClick = (subItem) => {
    setActiveTab(subItem.id);
    setDropdownOpen(null);
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 bg-gray-50">
        {/* Tabs Navigation */}
        <div className="flex justify-center space-x-8 mb-10">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative">
              <motion.button
                className={clsx(
                  "flex items-center p-3 rounded-lg transition-all space-x-2",
                  activeTab === tab.id
                    ? `bg-${tab.color}-100 text-${tab.color}-600`
                    : "hover:bg-gray-200 text-gray-600"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabClick(tab)}
              >
                <tab.icon
                  size={24}
                  className={
                    activeTab === tab.id
                      ? `text-${tab.color}-600`
                      : "text-gray-500"
                  }
                />
                <span className="font-medium text-md">{tab.label}</span>
                {tab.submenu && (
                  <FaChevronDown
                    className={clsx(
                      "ml-2 transition-transform",
                      dropdownOpen === tab.id ? "rotate-180" : ""
                    )}
                    size={14}
                  />
                )}
              </motion.button>
              {tab.submenu && dropdownOpen === tab.id && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-20">
                  {tab.submenu.map((subItem) => (
                    <motion.button
                      key={subItem.id}
                      className="block w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSubItemClick(subItem)}
                    >
                      {subItem.label}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          {activeTab === "profile" && <ProfileTab customerId={customerId} />}
          {activeTab === "rates1" && <Rates customerId={customerId} />}
          {activeTab === "rates2" && <PrivateRates customerId={customerId} />}
          {activeTab === "payments" && <PaymentsTab customerId={customerId} />}
          {activeTab === "support" && <SupportTab customerId={customerId} />}
          {activeTab === "followup" && (
            <FollowUpTab setActiveTab={setActiveTab} customerId={customerId} />
          )}
          {activeTab === "formfollow" && (
            <FormFollowUpTab setActiveTab={setActiveTab} customerId={customerId} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LeadDetails;
