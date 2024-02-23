import React from "react";

const Loader = () => {
  return (
    // <div className="loading-img">
    //   <span>Loading...</span>
    //   <img src={Loading} />
    // </div>
    <div className="loader">
      <div className="loader__bar" />
      <div className="loader__bar" />
      <div className="loader__bar" />
      <div className="loader__bar" />
      <div className="loader__bar" />
      <div className="loader__ball" />
      <div className="loading-area">Loading...</div>
    </div>
  );
};

export default Loader;
