import React from "react";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <Sidebar />
          </div>
          <div className="col-md-9 col-lg-10">
            <h1 className="text-center">Main Content Here!</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
