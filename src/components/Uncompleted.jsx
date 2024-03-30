import { FiTrash2 } from "react-icons/fi";

const Uncompleted = ({ task, setTask }) => {
  const handleRemove = (idx) => {
    if (!confirm("Are you sure?")) return;
    const updatedArray = task.filter((item, index) => index !== idx);
    setTask(updatedArray);
  };

  const handleComplete = (idx) => {
    const updatedArray = task.map((item, index) =>
      index === idx ? { ...item, status: !item.status } : item
    );

    setTask(updatedArray);
  };

  console.log(task);

  const listItems = task.map((item, idx) => (
    <li
      key={idx}
      className={` ${
        item.status ? "bg-slate-400 line-through" : "bg-slate-200"
      } my-2 px-4 py-2 rounded-md flex justify-between items-center`}
    >
      <label className="flex gap-3 capitalize justify-center items-center">
        <input
          type="checkbox"
          className="size-4"
          checked={item.status}
          onChange={() => handleComplete(idx)}
        />
        {item.label}
      </label>

      <button onClick={() => handleRemove(idx)}>
        <FiTrash2 size={20} />
      </button>
    </li>
  ));

  return <ul className="mt-8">{listItems}</ul>;
};
export default Uncompleted;
