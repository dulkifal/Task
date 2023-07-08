"use client";
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import {  FormEvent, FormEventHandler, useState } from 'react'
 
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import task1 from "@/api";
import { observer } from "mobx-react-lite";



const AddTask = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit : FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newtask = {
      id: uuidv4(),
      title: title,
      description: description,
      status: 'todo'
    }
    task1.addTodo(newtask)
    setShowModal(false);
    
    router.refresh();
  }
  return (
    <div >
        <button onClick={()=>{
          setShowModal(true)
        }} className='btn btn-primary w-1/2 '>Add new task 
        <AiOutlinePlus className='ml-2' size={18}/>
        </button>
        <Modal showModel={showModal} setShowModal={setShowModal} >  
        
        <form onSubmit={handleSubmit} >
          <h3 className='font-bold text-lg'>Add New Task</h3>
          <div className='modal-action flex-col gap-y-4'>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Title" className="input input-bordered w-full" />
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)}  placeholder="Description" className="input input-bordered w-full" />
          <button type="submit" className="btn btn-primary w-full mt-2">Add Task</button>
          </div>
        </form>
        </Modal>
      
    </div>
  )
}

export default observer(AddTask)
