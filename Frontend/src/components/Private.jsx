import React, { useContext } from "react";
import { userContext } from "../contexts/UserContexts";
import { Navigate } from "react-router-dom";

function Private() {
  const loggedData = useContext(userContext);
  function helper() {
    if (loggedData.loggedUser !== null) {
      return true;
    }
    return false;
  }
  return (
    <>{helper() === true ? <props.Component /> : <Navigate to="/login" />}</>
  );
}

export default Private;
