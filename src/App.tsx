import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent,  TooltipTrigger } from "./components/ui/tooltip";

function App() {
  // awalnya kosong
  const [tasks, setTasks] = useState<{ text: string; done: boolean }[]>([]);
  const [newTask, setNewTask] = useState("");

  function handleChangeInput(e: any) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { text: newTask, done: false }]);
      setNewTask("");
    }
  }

  function deleteTask(index: number) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function moveUp(index: any) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }
  function moveDown(index: any) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function handleDone(index: number) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      )
    );
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-md px-6 lg:max-w-3xl">
      <h1 className="text-xl text-amber-50 flex justify-center font-bold mt-30 text-center">
        To Do List
      </h1>

      <div className="mt-5 flex gap-2">
        <Input
          type="textarea"
          placeholder="Enter a task..."
          onChange={handleChangeInput}
          value={newTask}
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>

      <ol className="mt-5 flex flex-col gap-3">
        {tasks.map((task, index) => (
          <li key={index} className="flex gap-2">
            <div
              className={`w-full bg-zinc-900 px-3 py-2 rounded-lg grid grid-cols-[1fr_auto] justify-between border-[1px] border-zinc-900 hover:border-white smooth ${
                task.done ? "opacity-40" : ""
              }`}
            >
              <div className="overflow-hidden break-words">
                <h3 className="text-xl font-semibold">{task.text}</h3>
                <p>Description</p>
              </div>

              <div className="flex items-center gap-2 w-full">
                <Button onClick={() => moveUp(index)}>
                  <ChevronUp />
                </Button>
                <Button onClick={() => moveDown(index)}>
                  <ChevronDown />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDone(index)}
                  className=""
                >
                  {task.done ? "Undo" : "Mark As Done"}
                </Button>
              </div>
            </div>
            <div className="relative group flex ">
              <a
                className="flex items-center cursor-pointer"
                onClick={() => deleteTask(index)}
              >
                <Tooltip>
                  <TooltipTrigger><Trash2/></TooltipTrigger>
                  <TooltipContent>
                    <p>Delete Task</p>
                  </TooltipContent>
                </Tooltip>
              </a>
                
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
