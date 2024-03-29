import { FaTrashAlt } from "react-icons/fa";
const Uncompleted = ({ task, setTask }) => {
  const handleRemoveTask = (index) => {
    if (confirm("Are you sure?")) {
      const updatedArray = task.filter((item, idx) => idx !== index);
      setTask(updatedArray);
    }
  };

  const handleTaskComplete = (index) => {
    const updatedArray = task.map((item, idx) =>
      idx === index ? { ...item, status: !item.status } : item
    );
    setTask(updatedArray);
  };

  const listItems = task.map((item, index) => (
    <li
      key={index}
      className={` ${
        item.status ? "bg-slate-300 line-through" : "bg-slate-200"
      } my-2 py-2 px-4 rounded-md border border-slate-400 flex items-center justify-between text-ellipsis`}
    >
      <label className="flex items-center capitalize">
        <input
          type="checkbox"
          className="mr-2"
          onChange={() => handleTaskComplete(index)}
        />
        {item.label}
      </label>
      <button onClick={() => handleRemoveTask(index)}>
        <FaTrashAlt size={15} />
      </button>
    </li>
  ));

  return <ul className="mt-8 ">{listItems}</ul>;
};

export default Uncompleted;
