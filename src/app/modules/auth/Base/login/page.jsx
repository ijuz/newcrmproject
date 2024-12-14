import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import SignInPage from '../../login/SignInPage'; // Make sure this path is correct

const LoginFrame = () => {
  return (
    <div className="min-h-screen text-black">
      <div>
        <Header />
        <div style={{ marginTop: '3em' }}>
          <SignInPage />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LoginFrame;
