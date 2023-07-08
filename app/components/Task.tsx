import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

import { ITask } from "@/types/tasks";
import Modal from "./Modal";
import taskMobx from "@/api";

interface TaskProps {
    task: ITask
}

// Define a component called "Task" that takes in a prop called "task".
const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
    const [titleToEdit, setTitleToEdit] = useState<string>(task.title);
    const [descriptionToEdit, setDescriptionToEdit] = useState<string>(task.description);
    const [statusToEdit, setStatusToEdit] = useState<string>(task.status);

    // Define a function called "editSubmit" that is called when the form is submitted.
    const editSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        // Create a new task object with the updated information.
        const newtask = {
            id: task.id,
            title: titleToEdit,
            description: descriptionToEdit,
            status: statusToEdit
        }

        // Update the task in the task list.
        taskMobx.updateTodo(newtask);

        // Hide the modal and refresh the page.
        setShowModalEdit(false);
        router.refresh();
    }

    // Define a function called "deleteIt" that deletes the current task.
    const deleteIt = async () => {
        taskMobx.deleteTodo(task.id);
        setShowModalDelete(false);
        router.refresh();
    }

    return (
        <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
                {/* Render a span element with text that corresponds to the status of the task. */}
                {task.status === 'todo' && <span className='text-red-500'>TO DO</span>}
                {task.status === 'in-progress' && <span className='text-yellow-500'>PROGRESS</span>}
                {task.status === 'completed' && <span className='text-green-500'>Done</span>}
            </td>
            {/* Render an icon that opens a modal for editing the current task when clicked. */}
            <td className="flex gap-5 w-full">
                <FiEdit onClick={() => setShowModalEdit(true)} cursor='pointer' className="text-blue-500" size={25} />

                {/* Render a modal for editing the current task. */}
                <Modal showModel={showModalEdit} setShowModal={setShowModalEdit} >
                    <form onSubmit={editSubmit}>
                        <h3 className="font-bold text-lg">Edit Task</h3>
                        <div className="modal-action flex-col gap-y-4">
                            {/* Render an input field for entering the title of the task. */}
                            <input value={titleToEdit} onChange={(e) => setTitleToEdit(e.target.value)} type="text" placeholder="Title" className="input input-bordered w-full" />

                            {/* Render a textarea for entering the description of the task. */}
                            <textarea value={descriptionToEdit} onChange={(e) => setDescriptionToEdit(e.target.value)} placeholder="Description" className="input input-bordered w-full" />

                            {/* Render a dropdown menu for selecting the status of the task. */}
                            <select onChange={(e) => setStatusToEdit(e.target.value)} className="select select-bordered w-1/2 max-w-xs">
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Done</option>
                            </select>

                            {/* Render buttons for submitting and canceling the form. */}
                            <div className="modal-buttons">
                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                                <button type="button" onClick={() => setShowModalEdit(false)} className="btn btn-secondary">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>

                {/* Render an icon that opens a modal for deleting the current task when clicked. */}
                <FiTrash2 onClick={() => setShowModalDelete(true)} cursor='pointer' className="text-red-500" size={25} />
                    
                    {/* Render a modal for deleting the current task. */}   
                    <Modal showModel={showModalDelete} setShowModal={setShowModalDelete} >
                        <div className="modal-action flex-col gap-y-4">
                            <h3 className="font-bold text-lg">Are you sure you want to delete this task?</h3>
                            <div className="modal-buttons">
                                {/* Render a button that deletes the current task when clicked. */}
                                <button onClick={deleteIt} className="btn btn-primary">
                                    Yes
                                </button>
                                
                                {/* Render a button that closes the modal when clicked. */}
                                <button onClick={() => setShowModalDelete(false)} className="btn btn-secondary">
                                    No
                                </button>
                            </div>
                        </div>
                    </Modal>
            </td>
        </tr>
    )
}

export default Task;