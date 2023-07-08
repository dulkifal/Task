'use client';

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import AddTask from './components/AddTask';
import TodoList from './components/TodoList';
import taskMobx from '@/api';

// Define a function component called "Home".
function Home() {
    // Load tasks from local storage if they exist.
    useEffect(() => {
        const localTasks = localStorage.getItem('tasks');
        if (localTasks) {
            taskMobx.setTodos(JSON.parse(localTasks));
        }
    }, []);

    // Get the list of tasks from the taskMobx store.
    const tasks = taskMobx.todos;

    return (
        <main className="max-w-4xl mx-auto mt-4">
            <div className="text-center my-5 flex flex-col gap-4">
                {/* Render the title of the application. */}
                <h1 className="text-2xl font-bold">Todo List App</h1>
                {/* Render the "AddTask" component. */}
                <AddTask />
                {/* Render the "TodoList" component with the list of tasks. */}
                <TodoList tasks={tasks} />
            </div>
        </main>
    );
}

// Export the "Home" component wrapped in the "observer" higher-order component.
export default observer(Home);
