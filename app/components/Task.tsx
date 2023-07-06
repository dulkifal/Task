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
        });
        setShowModalEdit(false);
        console.log(titleToEdit, descriptionToEdit);
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
