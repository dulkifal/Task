interface ModalProps {
  showModel: boolean;
  setShowModal : (showModel: boolean) => boolean | void;
  children: React.ReactNode;
}

// Define a component called "Modal" that takes in three props: "showModel", "setShowModal", and "children".
const Modal: React.FC<ModalProps> = ({ showModel, setShowModal, children }) => {
  return (
    // Render a dialog element with an ID of "my_modal_3" and a class of "modal".
    <dialog id="my_modal_3" className={`modal ${showModel ? 'modal-open': ''}`} >
      {/* Render a div element with a class of "modal-box". */}
      <div className="modal-box">
        {/* Render a button element that closes the modal when clicked. */}
        <button onClick={() => setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        {/* Render the children of the component. */}
        {children}
      </div>
    </dialog>
  )
};

// Export the "Modal" component.
export default Modal;
