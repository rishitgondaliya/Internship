import { useState } from 'react'
import '../Todo.css'
import Modal from './Modal'
import Backdrop from './Backdrop'

export default function Todo(props) {
  const [showModal, setShowModal] = useState(false)
  function deleteHandler() {
    setShowModal(true)
  }

  function closeModalHandler() {
    setShowModal(false)
  }
  return (
    <div className="card">
      <h2>{props.title}</h2>
      <div className="actions">
        <button className="btn" onClick={deleteHandler}>Delete</button>
      </div>
      {/* {showModal ? <Modal /> : null} */}
      {showModal && <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler} />}

      {showModal && <Backdrop onCancel={closeModalHandler} />}
    </div>
  )
}
