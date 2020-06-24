import React from 'react'
import { MdShare } from "react-icons/md";
import Modal from "react-bootstrap/Modal"

class Modall extends React.Component{
    constructor(props) {
        super(props);
        
      }

    render()
    {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return(
            <div>
            <MdShare onClick={handleShow}/>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                
            </Modal>
            <div/>
        )
    }
}

export default Modall