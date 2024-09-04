import React, {
  useState,
  useContext,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { userContext } from "../contexts/UserContexts";
import { useForm } from "react-hook-form";
import axios from "axios";

const Task = forwardRef(
  (
    { title = "Selena", description = "", status = "To-Do", priority = "High" },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [errors, setErrors] = useState("");

    const loggedData = useContext(userContext);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    };

    useImperativeHandle(ref, () => ({
      openPopup() {
        togglePopup();
      },
    }));

    const onSubmit = async (formData) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/user/create",
          {
            title: formData.title,
            description: formData.description,
            status: formData.status,
            priority: formData.priority,
          },
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          console.log("Task Created successfully");
          reset();
        } else {
          setErrors(response.data.message);
        }
      } catch (error) {
        console.log("Error Creating task", error);
      }
    };

    return (
      <div className="relative">
        <button
          onClick={togglePopup}
          className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Create Task
        </button>

        {isOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                onClick={togglePopup}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                X
              </button>
              <h2 className="text-2xl font-bold mb-4">Create Task</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    {...register("title", { required: "This is required" })}
                    id="title"
                    name="title"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    {...register("description")}
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter your message"></textarea>
                </div>

                <div className="flex justify-evenly md:flex-row gap-2">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      id="select"
                      htmlFor="status">
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      {...register("status", {
                        required: "status is required",
                      })}>
                      <option value="To-Do">To-Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      id="select">
                      Priority
                    </label>
                    <select name="select" id="select" {...register("priority")}>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default Task;
