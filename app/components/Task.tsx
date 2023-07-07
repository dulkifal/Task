"use client";
import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, updateTodo } from "@/api";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
    const [titleToEdit, setTitleToEdit] = useState<string>(task.title);
    const [descriptionToEdit, setDescriptionToEdit] = useState<string>(task.description);
    const editSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        updateTodo({
            id: task.id,
            title: titleToEdit,
            description: descriptionToEdit,
            status: task.status
        });
        setShowModalEdit(false);
        console.log(titleToEdit, descriptionToEdit);
        router.refresh();
    }
    const updateStatus = async (statusValue:string) => {
        updateTodo({
            id: task.id,
            title: task.title,
            description: task.description,
            status:  statusValue
        });
        router.refresh();
    }


    const deleteIt  = async () => {
        
      await  deleteTodo(task.id);
        setShowModalDelete(false);

        router.refresh();
    }



    return (

        <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td> 
                <select value={task.status} onChange={(e) =>  updateStatus(e.target.value) } className={`select select-bordered w-full max-w-xs  ${task.status  == 'todo' ? 'bg-blue-500' : task.status == 'in-progress' ? 'bg-yellow-500': 'bg-green-500'} `}>
                    <option value="todo">TO DO</option>
                    <option value="in-progress">IN PROGRESS</option>
                    <option value="completed">COMPLETED</option>
                </select>

            </td>
            <td className="flex gap-5 w-full">
                <FiEdit onClick={() => setShowModalEdit(true)} cursor='pointer' className="text-blue-500" size={25} />
                <Modal showModel={showModalEdit} setShowModal={setShowModalEdit} >

                    <form onSubmit={editSubmit} >
                        <h3 className='font-bold text-lg'>Edit Task</h3>
                        <div className='modal-action flex-col'>
                            <input value={titleToEdit} onChange={(e) => setTitleToEdit(e.target.value)} type="text" placeholder="Title" className="input input-bordered w-full" />
                            <input value={descriptionToEdit} onChange={(e) => setDescriptionToEdit(e.target.value)} type="text" placeholder="Description" className="input input-bordered w-full" />
                            <button type="submit" className="btn btn-primary w-full mt-2">Edit Task</button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2 onClick={() => setShowModalDelete(true)} cursor='pointer' className="text-red-500" size={25} />
                <Modal showModel={showModalDelete} setShowModal={setShowModalDelete} >
                    <h3>Are you sure? </h3>
                    <div className='modal-action flex-col'>
                        <button onClick={()=> deleteIt()} className="btn btn-primary w-full mt-2">Yes</button>
                        <button onClick={() => setShowModalDelete(false)} className="btn btn-primary w-full mt-2">No</button>
                    </div>
                </Modal>

            </td>
        </tr>

    )
}

export default Task
