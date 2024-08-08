import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { tasks } from "../Models/taskModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createtask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;
  const userId = req.user?._id;
  const task = req.body;
  task.userId = userId;
  console.log(task);
  const array = [title, status];
  if (array.some((item) => item.trim() === ""))
    throw new ApiError(401, "Title and description are mandatory");
  const taskCreated = await tasks.create(task);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        taskCreated,
      },
      "User logged in successfully"
    )
  );
});

export const updateTask = asyncHandler(async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority, deadline } = req.body;
    const taskDetails = req.body;
    const userId = req.user?._id;

    if (!userId) throw new ApiError(404, "User not found");
    console.table(taskDetails);

    const task = await tasks.findById(taskId);
    console.log(task.userId);

    if (!task) {
      throw new ApiError("404", "User hasn't created any task yet");
    }

    //   Update taskDetails
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (deadline) task.deadline = deadline;

    await task.save();
    return res
      .status(200)
      .json(new ApiResponse(200, task, "Task updated successfully"));
  } catch (error) {
    console.log(error.message);

    return res
      .status(500)
      .json(new ApiError(500, "Somethingwent wrong while updating "));
  }
});

export const getAllTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new ApiError(404, "User not found");
    }
    const tasksDetails = await tasks.find({ userId });
    return res
      .status(200)
      .json(
        new ApiResponse(200, tasksDetails, "Suceessfully fetched all items")
      );
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json(
        new ApiResponse(500, error, "Something went wrong while fetching tasks")
      );
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) throw new ApiError(404, "Task not present");
  const deleteTask = await tasks.deleteOne({ _id: taskId });
  res
    .status(200)
    .json(new ApiResponse(200, deleteTask, "Task deleted successfully"));
});
