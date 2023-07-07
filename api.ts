import { ITask } from "./types/tasks";

const baseurl = "http://localhost:3001";

export const getTasks = async (): Promise<ITask[]> => {
  const response = await fetch(`${baseurl}/tasks` , {cache: "no-cache"});
  return await response.json();
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseurl}/tasks`,  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return await res.json();
};

export const updateTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseurl}/tasks/${todo.id}`,  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  
  return await res.json();
}

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${baseurl}/tasks/${id}`,  {
    method: "DELETE",
  });
}
