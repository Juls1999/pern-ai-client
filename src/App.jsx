import "./App.css";
import Home from "./pages/home/Home";
import Feedback from "./pages/feedback/Feedback";
import Chat from "./pages/chat/Chat"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="feedback" element={<Feedback/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
