import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/index";
import Login from "./components/login";
import Register from "./components/register";
// import Logout from "./components/logout";
import Customer from "./components/customer";
import Katha from "./components/katha";
import Saved from "./components/saved";
import Home from "./components/home";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        {/* <Route path="/logout" element={<Logout/>}></Route> */}
        <Route path="/customer" element={<Customer/>}></Route>
        <Route path="/katha" element={<Katha/>}></Route>
        <Route path="/saved" element={<Saved/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
