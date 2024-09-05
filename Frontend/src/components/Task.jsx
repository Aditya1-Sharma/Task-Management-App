import React, {
  useState,
  useContext,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { userContext } from "../contexts/UserContexts";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../redux/user/userSlice";

const priorities = ["Low", "Medium", "High"];
const statuses = ["To-do", "In Progress", "Under Review", "Completed"];
const Task = forwardRef(
  (
    {
      title = "",
      description = "",
      status,
      priority,
      onClose,
      isUpdate = false,
      id,
    },
    ref
  ) => {
    const { tasks } = useSelector((state) => state.user);
    // console.log(tasks);
    console.log(id);

    // if (!title && !description && !status && !priority) return null;

    const { register, handleSubmit, reset } = useForm();
    const [errors, setErrors] = useState("");

    const loggedData = useContext(userContext);
    const dispatch = useDispatch();

    const onSubmit = async (formData) => {
      console.log(isUpdate);

      if (isUpdate) {
        await dispatch(updateTask({ taskData: formData, taskId: id }))
          .unwrap()
          .then((res) => {
            if (!res.error) {
              console.log("Task Updated");
              reset();
            } else {
              console.error("Erorr creating task", res.error);
            }
          });
      } else {
        await dispatch(createTask(formData))
          .unwrap()
          .then((res) => {
            if (!res.error) {
              console.log("Task Created");
              reset();
            } else {
              console.error("Erorr creating task", res.error);
            }
          });
      }
    };

    return (
      <div className="relative">
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={onClose}
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
                  defaultValue={title}
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
                  defaultValue={description}
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
                    defaultValue={status}
                    name="status"
                    id="status"
                    {...register("status", {
                      required: "status is required",
                    })}>
                    {statuses.map((item) => (
                      <option
                        key={item}
                        value={item}
                        // selected={item == status}
                        defaultChecked={status}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    id="select">
                    Priority
                  </label>
                  <select
                    name="select"
                    id="select"
                    defaultValue={priority}
                    {...register("priority")}>
                    {priorities.map((item) => (
                      <option
                        key={item}
                        value={item}
                        // selected={item == priority}
                        defaultChecked={priority}>
                        {item}
                      </option>
                    ))}
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
      </div>
    );
  }
);

export default Task;
