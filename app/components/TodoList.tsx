import { ITask } from "@/types/tasks"
import Task from "./Task"

 
 interface TodoListProps {
     tasks : ITask[]
  }

const TodoList :  React.FC<TodoListProps> = ({
  tasks
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="text-left">Task</th>
            <th className="text-left">Description</th>
            <th className="text-left">Status</th>
            <th className="text-left"></th>
          </tr>

        </thead>
        <tbody>
          {tasks.map((task) => (
           <Task key = {task.id} task = {task} />
          ))}
        </tbody>

      </table>
    </div>
   
  )
}

export default TodoList
