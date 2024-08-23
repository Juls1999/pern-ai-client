import React from "react";
import Sidebar from "../../components/Sidebar";
import ChatBox from "../../components/ChatBox";

const Chat = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <Sidebar />
          </div>
          <div className="col-md-9 col-lg-10">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
