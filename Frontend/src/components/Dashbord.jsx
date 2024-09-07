import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Task from "./Task";

function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex flex-grow h-full">
        {/* First Div (2/5ths of the width) */}
        <div className="w-2/5 p-4 bg-blue-100 flex flex-col items-center">
          <img
            src={currentUser.data.user.avatar}
            className="rounded-full w-32 h-32"
            alt="User Avatar"
          />
          <span className="mt-4">
            <p className="p-2 text-center font-bold text-lg">
              {currentUser.data.user.userName}
            </p>
            <p className="text-center text-gray-600">
              {currentUser.data.user.email}
            </p>
          </span>
          <div className="flex justify-center mt-4">
            {isOpen && <Task onClose={onClose} />}
            <button
              onClick={togglePopup}
              className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Create Task
            </button>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-gray-700"></div>

        {/* Second Div (3/5ths of the width) */}
        <div className="w-full p-4 bg-green-100 flex flex-col">
          {/* First Div (Cover Image Area) */}
          <div className="h-[50vh] bg-green-100">
            <img
              src={currentUser.data.user.coverImage}
              alt="Cover"
              className="rounded-lg w-full h-full object-cover bg-repeat"
            />
          </div>

          {/* Horizontal Divider */}
          <div className="h-px bg-purple-700 my-4"></div>

          {/* Second Div (Tasks Area - should grow dynamically) */}
          <div className="flex-grow bg-green-300 p-4">
            <p className="text-center text-2xl font-semibold">Tasks</p>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
              {tasks &&
                tasks.map((item) => (
                  <Card
                    key={item._id}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                    priority={item.priority}
                    id={item._id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
