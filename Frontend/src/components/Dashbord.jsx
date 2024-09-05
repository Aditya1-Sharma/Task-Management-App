import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Task from "./Task";
import { fetchUserData } from "../redux/user/userSlice";
function Dashbord() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  console.log(tasks);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="max-w-fit max-h-full bg-red-400 md:mx-10">
      <div className="flex h-auto">
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
        <div className="w-full p-4 bg-green-100">
          <div className="flex flex-col h-full">
            {/* First Div (4/6ths of the height) */}
            <div className="h-[50vh] bg-green-100">
              <img
                src={currentUser.data.user.coverImage}
                alt=""
                className="rounded-lg w-full h-full object-cover bg-repeat"
              />
            </div>

            {/* Horizontal Divider */}
            <div className="h-px bg-purple-700"></div>

            {/* Second Div (2/6ths of the height) */}
            <div className="  h-full max-w-full bg-green-300">
              <p>Second Div</p>
              <div className="grid gap-2 grid-cols-1 sm:grid-cols-3">
                {/* title = "Selena Gomez",
                    description = "Americal Singer",
                    status = "To-Do",
                    priority,
                    deadline, */}
                {tasks &&
                  tasks.map((item) => (
                    <div key={item._id}>
                      <Card
                        title={item.title}
                        description={item.description}
                        status={item.status}
                        priority={item.priority}
                        id={item._id}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
