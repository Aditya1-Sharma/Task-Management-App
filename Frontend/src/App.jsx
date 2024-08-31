import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { userContext } from "./contexts/UserContexts";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Dashbord from "./components/Dashbord";
import Private from "./components/Private";

function App() {
  const [loggedUser, setloggedUser] = useState(null);
  useEffect(() => {
    console.log({ loggedUser });
    setloggedUser(JSON.parse(localStorage.getItem("Task")));
  }, [loggedUser]);
  return (
    <>
      <h1>Task Management App</h1>
      <userContext.Provider value={{ loggedUser, setloggedUser }}>
        <Routes>
          <Route path="/" element={<RegisterPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>

          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/dashboard"
            element={<Private Component={Dashbord} />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
