 'use client';
import { AiOutlinePlus } from 'react-icons/ai';
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { observer } from 'mobx-react-lite';

import taskMobx from '@/api';
import Modal from './Modal';

const AddTask = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');

  // Define a function called "handleSubmit" that is called when the form is submitted.
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Create a new task object with a unique ID.
    const newTask = {
      id: uuidv4(),
      title,
      description,
      status,
    };

    // Add the new task to the task list.
    taskMobx.addTodo(newTask);

    // Reset the form fields.
    setTitle('');
    setDescription('');

    // Hide the modal and refresh the page.
    setShowModal(false);
    router.refresh();
  };

  return (
    <div>
      {/* Render a button that opens a modal when clicked. */}
      <button onClick={() => setShowModal(true)} className="btn btn-primary w-1/2 ">
        Add New Task <AiOutlinePlus className="ml-2" size={18} />
      </button>

      {/* Render a modal that contains a form for adding a new task. */}
      <Modal showModel={showModal} setShowModal={setShowModal}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add New Task</h3>
          <div className="modal-action flex-col gap-y-4">
            {/* Render an input field for entering the title of the task. */}
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" className="input input-bordered w-full" />

            {/* Render a textarea for entering the description of the task. */}
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="input input-bordered w-full" />

            {/* Render a dropdown menu for selecting the status of the task. */}
            <select onChange={(e) => setStatus(e.target.value)} className="select select-bordered w-1/2 max-w-xs">
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            {/* Render buttons for submitting and canceling the form. */}
            <div className="modal-buttons">
              <button type="submit" className="btn btn-primary">
                Add Task
              </button>
              <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// Export the "AddTask" component as an observer.
export default observer(AddTask);
