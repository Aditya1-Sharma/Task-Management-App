import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Dashbord() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  return (
    <div className="max-w-full max-h-full bg-red-400 md:mx-10">
      <div className="flex h-screen">
        {/* First Div (2/5ths of the width) */}

        <div className="w-2/5 p-4 bg-blue-100  md:block">
          <img
            src={currentUser.data.user.avatar}
            className="rounded-xl"
            alt=""
          />

          <span>
            <p className="p-2 text-center">{currentUser.data.user.userName}</p>
            <p className="text-center">{currentUser.data.user.email}</p>
          </span>
          <div className="flex justify-center">
            <button className="w-2/3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300 mt-4">
              Create Task
            </button>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-gray-700"></div>

        {/* Second Div (3/5ths of the width) */}
        <div className="w-full p-4 bg-green-100">
          <div className="flex flex-col h-full">
            {/* First Div (4/6ths of the height) */}
            <div className="h-2/6 bg-green-100">
              <img
                src={currentUser.data.user.coverImage}
                alt=""
                className="rounded-lg w-full h-full object-cover bg-repeat"
              />
            </div>

            {/* Horizontal Divider */}
            <div className="h-px bg-purple-700"></div>

            {/* Second Div (2/6ths of the height) */}
            <div className="h-full max-w-full bg-green-300">
              <p>Second Div</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
