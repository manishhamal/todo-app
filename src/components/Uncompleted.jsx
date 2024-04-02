import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";

const Uncompleted = ({ task, setTask }) => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(null);
  const [updateItem, setUpdateItem] = useState("");

  useEffect(() => {
    if (edit) {
      setUpdateItem(task?.find((item) => item.id === edit)?.label);
    }
  }, [edit]);

  const handleRemove = (id) => {
    if (!confirm("Are you sure?")) return;
    const updatedArray = task.filter((item) => item.id !== id);
    setTask(updatedArray);
  };

  const handleEditTask = (id) => {
    setEdit(id);
  };

  const handleComplete = (id) => {
    const updatedArray = task.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );

    setTask(updatedArray);
  };

  const handleClear = () => {
    setTask([]);

    console.log(task);
  };

  const handleSaveTask = () => {
    if (!updateItem) {
      alert("task can't be empty");
      return;
    }

    if (
      task.some((item) => item.label.toLowerCase() === updateItem.toLowerCase())
    ) {
      alert("Task already exist ");
      return;
    }
    const updatedTask = task.map((item) =>
      item.id === edit ? { ...item, label: updateItem } : item
    );
    setTask(updatedTask);
    setEdit(null);
  };

  console.log(task);

  const listItems = task
    .filter((item) =>
      filter === "u" ? !item.status : filter === "c" ? item.status : item
    )
    .filter((item) => item.label.toLowerCase().includes(search.toLowerCase()))
    .map((item) => (
      <li
        key={item.id}
        className={` ${
          item.status ? "bg-slate-400 line-through" : "bg-slate-200"
        } my-2 px-4 py-2 rounded-md flex justify-between items-center`}
      >
        <label className="flex gap-3 capitalize justify-center items-center">
          <input
            type="checkbox"
            className="size-4"
            checked={item.status}
            onChange={() => handleComplete(item.id)}
          />
          {edit !== item.id ? (
            <span>{item.label}</span>
          ) : (
            <input
              type="text"
              value={updateItem}
              onChange={(e) => setUpdateItem(e.target.value)}
              className="border border-gray-600 bg-transparent  px-3 py-1 text-sm outline-none"
            />
          )}
        </label>

        <div>
          {edit === item.id ? (
            <button className="mr-3" onClick={handleSaveTask}>
              <FaRegSave size={20} />
            </button>
          ) : (
            <button className="mr-3" onClick={() => handleEditTask(item.id)}>
              <FaRegEdit size={20} />
            </button>
          )}
          <button onClick={() => handleRemove(item.id)}>
            <FiTrash2 size={20} />
          </button>
        </div>
      </li>
    ));

  return (
    <>
      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-6 items-center">
          <div>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="border border-black rounded px-2 py-1 outline-none"
              placeholder="Search...."
            />
          </div>
          <div>
            <select
              className="border border-black p-1 rounded bg-slate-100"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="a">All</option>
              <option value="u">Uncompleted</option>
              <option value="c">Completed</option>
            </select>
          </div>
          <h1>
            UnCompleted Tasks:
            {task.filter((item) => !item.status).length}
          </h1>
          <h1>Completed Tasks: {task.filter((item) => item.status).length} </h1>
        </div>

        <button
          className="bg-blue-800 text-white px-6 py-1 rounded"
          onClick={() => handleClear()}
        >
          clear All
        </button>
      </div>
      {listItems.length ? (
        <ul className="mt-8">{listItems}</ul>
      ) : (
        <div className="mt-4 font-semibold text-2xl p-8 text-center">
          No tasks
        </div>
      )}
    </>
  );
};
export default Uncompleted;
