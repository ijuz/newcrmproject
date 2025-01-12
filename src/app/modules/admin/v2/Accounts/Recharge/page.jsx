import React, { useState } from 'react';
import Layout from '../../layout/page';
import { RiApps2Line } from "react-icons/ri";

const RechargePage = () => {
  return (
    <Layout>
      <div className="p-6 text-gray-900">
        <h2 className="text-xl font-bold flex items-center mb-4">
          <RiApps2Line className="mr-2 text-yellow-500 text-5xl" />
          RECHARGE PAGE
        </h2>
      </div>
    </Layout>
  );
};

export default RechargePage;