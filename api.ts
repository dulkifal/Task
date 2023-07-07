 
import { ITask } from "./types/tasks";
 
import { makeAutoObservable } from "mobx";


 

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

//  mobx state tree actions
 
class Task {
  todos: ITask[] = [];

  constructor() {
    makeAutoObservable(this);
    
  }
  addTodo = (todo: ITask) => {
    this.todos.push(todo);
    return this.todos;
  }
  updateTodo = (todo: ITask) => {
    const index = this.todos.findIndex((t: ITask) => t.id === todo.id);
    this.todos[index] = todo;
    return this.todos;
  }
  deleteTodo = (id: string) => {
    const index = this.todos.findIndex((t: ITask) => t.id === id);
    this.todos.splice(index, 1);
    return this.todos;
  }

}

const task1 = new Task();
export default task1; 