import { useState, useEffect } from "react";
import Uncompleted from "./Uncompleted";
const Todo = () => {
  const [value, setValue] = useState("");
  const [task, setTask] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.some((item) => item.label.toLowerCase() === value.toLowerCase())) {
      alert("Task already exist ");
      return;
    }

    setTask([
      ...task,
      {
        label: value,
        status: false,
      },
    ]);

    setValue("");
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);
  //   console.log(task);

  return (
    <div className="flex h-screen justify-center mt-6">
      <div className="w-8/12">
        <div className="border border-black ">
          <form onSubmit={handleAddTask}>
            <h1 className="border border-black m-4 p-6 text-lg font-semibold text-slate-600">
              Task Buddy
            </h1>
            <div className="input-task flex justify-end mb-4 relative items-center">
              <input
                type="text"
                placeholder="Enter your task"
                value={value}
                className="border border-black p-3 w-full mx-4"
                onChange={(e) => setValue(e.target.value)}
              />

              <button
                type="submit"
                disabled={value.length < 4}
                className="bg-blue-800 text-white px-7 py-2 rounded absolute mr-8"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
        {!task.length ? (
          <div className="mt-4 font-semibold text-2xl p-8 text-center">
            No tasks
          </div>
        ) : (
          <Uncompleted task={task} setTask={setTask} />
        )}
      </div>
    </div>
  );
};

export default Todo;
