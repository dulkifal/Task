
interface ModalProps {
  showModel: boolean;
  setShowModal : (showModel: boolean) => boolean | void;
  children: React.ReactNode;
}
const Model: React.FC<ModalProps> = ({ showModel, setShowModal, children }) => {

  return (

    <dialog id="my_modal_3" className={`modal ${showModel ? 'modal-open': ''}`} >
      <div   className="modal-box">
        <button  onClick={()=>setShowModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
       {children}
      </div>
    </dialog>
  )
}

export default Model
