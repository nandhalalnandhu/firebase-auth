// ./components/Loading/Pageloading.js
import React, { useState, useEffect } from "react";
import { ThreeDot } from 'react-loading-indicators';
import "./PageLoading.css";

const Pageloading = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false); // Hide loader after 10 seconds
    }, 10000); // Updated to 10000 ms (10 seconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loading">
      {showLoader && (
        <ThreeDot
          variant="bounce"
          color="#03FDC3"
          size="medium"
          text=""
          textColor=""
        />
      )}
    </div>
  );
};

export default Pageloading;
