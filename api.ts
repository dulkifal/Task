 
import { ITask } from "./types/tasks";

 

export const addTodo = async (todo: ITask): Promise<ITask> => {
  //  add to local storage
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(todo);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return JSON.parse(localStorage.getItem("tasks") || "[]");
};

export const updateTodo = async (todo: ITask): Promise<ITask> => {
  //  update to local storage
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const index = tasks.findIndex((t: ITask) => t.id === todo.id);
  tasks[index] = todo;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return JSON.parse(localStorage.getItem("tasks") || "[]");

}

export const deleteTodo = async (id: string): Promise<void> => {
   
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const index = tasks.findIndex((t: ITask) => t.id === id);
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return;

}
