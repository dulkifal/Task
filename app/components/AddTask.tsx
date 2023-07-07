"use client";
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import {  FormEvent, FormEventHandler, useState } from 'react'
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
const AddTask = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit : FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({
      title,
      description,
      id: uuidv4(),
      status: ''
    });
    setShowModal(false);
    console.log(title, description);
    router.refresh();
  }
  return (
    <div >
        <button onClick={()=>{
          setShowModal(true)
        }} className='btn btn-primary w-full '>Add new task 
        <AiOutlinePlus className='ml-2' size={18}/>
        </button>
        <Modal showModel={showModal} setShowModal={setShowModal} >  
        
        <form onSubmit={handleSubmit} >
          <h3 className='font-bold text-lg'>Add New Task</h3>
          <div className='modal-action flex-col'>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Title" className="input input-bordered w-full" />
          <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" placeholder="Description" className="input input-bordered w-full" />
          <button type="submit" className="btn btn-primary w-full mt-2">Add Task</button>
          </div>
        </form>
        </Modal>
      
    </div>
  )
}

export default AddTask
