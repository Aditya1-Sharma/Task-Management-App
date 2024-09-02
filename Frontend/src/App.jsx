// import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { userContext } from "./contexts/UserContexts";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
// import Dashbord from "./components/Dashbord";
import Private from "./components/Private";
import UrlShortner from "./components/UrlShortner";
import Navbar from "./components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import { useSelector } from "react-redux";
function App() {
  const navigate = useNavigate();
  const [loggedUser, setloggedUser] = useState(null);

  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("Task")));

    if (loggedUser) navigate("/dashboard");
    if (!loggedUser) navigate("/login");
  }, [loggedUser]);

  return (
    <div className=" bg-pink max-w-full">
      <userContext.Provider value={{ loggedUser, setloggedUser }}>
        <Routes>
          <Route path="/" element={<RegisterPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>

          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/dashboard"
            element={<Private Component={DashboardPage} />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route
            path="/urlshortner"
            element={<Private Component={UrlShortner} />}></Route>
          <Route path="/navbar" element={<Navbar />}></Route>
        </Routes>
      </userContext.Provider>
    </div>
  );
}

export default App;
