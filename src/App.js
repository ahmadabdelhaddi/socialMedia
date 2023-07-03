import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Landing/Home";
import Nav from "./Components/Nav/Nav";
import Comment from "./Components/Comment/Comment";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":userId" element={<Home />} />
        {/* <Route path=":commentId" element={< Comment/>} /> */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
