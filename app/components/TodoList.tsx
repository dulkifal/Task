import { ITask } from "@/types/tasks"
import Task from "./Task"

interface TodoListProps {
  tasks: ITask[]
}

// Define a component called "TodoList" that takes in a prop called "tasks".
const TodoList: React.FC<TodoListProps> = ({
  tasks
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {/* Render table headers for the task, description, status, and action columns. */}
            <th className="text-left">Task</th>
            <th className="text-left">Description</th>
            <th className="text-left">Status</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Render a "Task" component for each task in the task list. */}
          {tasks.map((task, index) => (
            <Task key={index} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoList
