import React, { useState } from "react";
import { 
  User, 
  ShoppingCart, 
  CreditCard, 
  HelpCircle, 
  MessageCircle 
} from "lucide-react";
import Layout from "../../../layout/page";
import ProfileTab from "./components/Profile";
import CartTab from "./components/AddedRates";
import PaymentsTab from "./components/Payments";
import SupportTab from "./components/Support";
import FollowUpTab from "./components/Followups";

const LeadDetails = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { 
      name: "profile", 
      label: "Profile", 
      icon: User, 
      color: "blue" 
    },
    { 
      name: "cart", 
      label: "Cart", 
      icon: ShoppingCart, 
      color: "green" 
    },
    { 
      name: "payments", 
      label: "Payments", 
      icon: CreditCard, 
      color: "purple" 
    },
    { 
      name: "support", 
      label: "Support", 
      icon: HelpCircle, 
      color: "orange" 
    },
    { 
      name: "followup", 
      label: "Follow Up", 
      icon: MessageCircle, 
      color: "rose" 
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen p-12 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-center space-x-6 mb-12">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`
                    flex items-center space-x-3 px-6 py-3 rounded-xl 
                    text-lg font-semibold
                    transform transition-all duration-300 ease-in-out
                    ${isActive 
                      ? `bg-${tab.color}-500 text-white scale-105 shadow-xl` 
                      : `bg-${tab.color}-100 text-${tab.color}-600 hover:bg-${tab.color}-200 hover:scale-105`}
                  `}
                >
                  <Icon size={24} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="border-2">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "cart" && <CartTab />}
            {activeTab === "payments" && <PaymentsTab />}
            {activeTab === "support" && <SupportTab />}
            {activeTab === "followup" && <FollowUpTab />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeadDetails;
