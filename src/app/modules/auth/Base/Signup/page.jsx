import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import SignUpPage from '../../signup/SignUpPage'; // Ensure the path is correct

const SignUpFrame = () => {
  return (
    <div className="min-h-screen text-black">
      <div className="bg-white">
        <Header />
        <SignUpPage />
        <Footer />
      </div>
    </div>
  );
};

export default SignUpFrame;
