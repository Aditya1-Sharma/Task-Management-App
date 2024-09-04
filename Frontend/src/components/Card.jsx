import React from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import Task from "./Task";
const Card = ({
  id,
  title = "Selena Gomez",
  description = "Americal Singer",
  status = "To-Do",
  priority,
  deadline,
}) => {
  // Function to get status color based on the status
  const getStatusColor = (status) => {
    switch (status) {
      case "To-Do":
        return "bg-blue-500";
      case "In Progress":
        return "bg-blue-600";
      case "Under Review":
        return "bg-green-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // Function to get priority color based on the priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const { tasks } = useSelector((state) => state.user);

  const UpdateTask = async (e) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/user/getTask/${id}`,
        { withCredentials: true }
      );

      console.log(response.data);

      {
        /* title = "Selena Gomez",
                    description = "Americal Singer",
                    status = "To-Do",
                    priority,
                    deadline, */
      }
    } catch (error) {
      console.error("Error updating the task", error);
    }
  };

  const deleteTask = async (e) => {
    console.log(id);
    const response = await axios.delete("");
  };

  return (
    <div className="max-w-xs md:max-w-xs rounded overflow-hidden shadow-lg bg-white p-4">
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-base mb-4">{description}</p>

      {/* Status */}
      <div className="flex items-center mb-4">
        <span
          className={`inline-block w-3 h-3 mr-2 rounded-full ${getStatusColor(
            status
          )}`}></span>
        <p className="text-gray-600">Status: {status}</p>
      </div>

      {/* Priority */}
      <div className="flex items-center mb-4">
        <p className={`text-base font-bold ${getPriorityColor(priority)}`}>
          Priority: {priority}
        </p>
      </div>

      {/* Deadline */}
      <div>
        <p className="text-gray-600">
          Deadline: <span className="font-semibold">{deadline}</span>
        </p>
      </div>
      <div className="flex gap-2 justify-evenly">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={UpdateTask}>
          Update
        </button>
        <button
          className="px-2 py-2 bg-blue-500 text-white rounded-md"
          onClick={deleteTask}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;

//  status: ["To-Do", "In Progress", "Under Review", "Completed"]
