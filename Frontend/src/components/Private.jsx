import React, { useContext } from "react";
import { userContext } from "../contexts/UserContexts";
import { Navigate } from "react-router-dom";

function Private({ Component }) {
  const loggedData = useContext(userContext);
  console.log({ loggedData });

  function helper() {
    if (loggedData.loggedUser !== null) {
      return true;
    }
    return false;
  }
  return <>{helper() === true ? <Component /> : <Navigate to="/login" />}</>;
}

export default Private;
