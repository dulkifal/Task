 
import { ITask } from "./types/tasks";
 
import { makeAutoObservable } from "mobx";


  
//  mobx state tree actions
 
class Task {
  todos: ITask[] = [];

  constructor() {
    makeAutoObservable(this);
    
  }
  setTodos = (todos: ITask[]) => {
    this.todos = todos;
  }
  addTodo = (todo: ITask) => {
    this.todos.push(todo);
    // add to local storage
     localStorage.setItem("tasks", JSON.stringify(this.todos));

    return this.todos;
  }
  updateTodo = (todo: ITask) => {
    const index = this.todos.findIndex((t: ITask) => t.id === todo.id);
    this.todos[index] = todo;
    // update to local storage
    localStorage.setItem("tasks", JSON.stringify(this.todos));
    return this.todos;
  }
  deleteTodo = (id: string) => {
    const index = this.todos.findIndex((t: ITask) => t.id === id);
    this.todos.splice(index, 1);
    // update to local storage
    localStorage.setItem("tasks", JSON.stringify(this.todos));
    return this.todos;
  }

}

const task1 = new Task();
export default task1; 