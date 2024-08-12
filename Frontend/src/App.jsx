import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { userContext } from "./contexts/UserContexts";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Dashbord from "./components/Dashbord";

function App() {
  const [loggedUser, setloggedUser] = useState(
    JSON.parse(localStorage.getItem("Task"))
  );
  useEffect(() => {
    console.log(loggedUser);
  }, []);
  return (
    <>
      <h1>Task Management App</h1>
      <userContext.Provider value={{ loggedUser, setloggedUser }}>
        <Routes>
          <Route path="/" element={<RegisterPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>

          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/dashboard" element={<Dashbord />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
