import { useState } from "react";
import Uncompleted from "./Uncompleted";

const Todo = () => {
  const [value, setValue] = useState("");
  const [task, setTask] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      alert("Please Enter task");
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

  // console.log(value.length);
  return (
    <div className="flex h-screen justify-center mt-6">
      <div className="w-8/12">
        <div className="border border-black ">
          <form onSubmit={handleSubmit}>
            <h1 className="border border-black m-4 p-6">Title</h1>
            <div className="input-task flex justify-end mb-4 relative items-center">
              <input
                type="text"
                placeholder="Enter your task"
                className="border border-black p-3 w-full mx-4"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
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

        <Uncompleted task={task} setTask={setTask} />
      </div>
    </div>
  );
};

export default Todo;
