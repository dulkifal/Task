'use client'

import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
 
import { ITask } from "@/types/tasks";
import { use, useEffect, useState } from "react";
import task1 from "@/api";
import { observer } from "mobx-react-lite";


  function Home() {
  // const [tasks, setTasks] = useState<ITask[]>([]);
  useEffect(() => {
//  load from local storage
const localTasks = localStorage.getItem('tasks')
if(localTasks){
  task1.setTodos(JSON.parse(localTasks))
}
  }, [ ])
  const tasks = task1.todos


  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App </h1>
        <AddTask />
        <TodoList tasks={tasks} />

      </div>


    </main>
  )
}

export default observer(Home)
