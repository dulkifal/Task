'use client'

import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";
import { ITask } from "@/types/tasks";
import { use, useEffect, useState } from "react";


export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  useEffect(() => {

    setTasks(JSON.parse(localStorage.getItem('tasks') || '[]'));
  }, [localStorage.getItem('tasks')])


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
