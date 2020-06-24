import React from 'react'
import { MdShare } from "react-icons/md";
import Modal from "react-bootstrap/Modal"
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton
  } from "react-share";
  import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon
  } from "react-share";

function Modall(props){

        const [show, setShow] = React.useState(false);

        const handleClose = (event) => {
          
          setShow(false);
        }
        const handleShow = (event) => {
          setShow(true);
          event.stopPropagation();
          console.log(event.target)
          
        }
        

        return(
            <>
            <MdShare onClick={handleShow}/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{props.abcd.webTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h3>Share via</h3>
                    <FacebookShareButton className="col-md-4" url={props.abcd.weburl} quote={props.abcd.webTitle} hashtag={"#CSCI_571_NewsApp"}><FacebookIcon round={true}/></FacebookShareButton>
                    <TwitterShareButton className="col-md-4" url={props.abcd.weburl} title={props.abcd.webTitle} hashtags={["CSCI_571_NewsApp"]}><TwitterIcon round={true}/></TwitterShareButton>
                    <EmailShareButton className="col-md-4" subject={"#CSCI_571_NewsApp"} body={props.abcd.weburl}><EmailIcon round={true}/></EmailShareButton>
                </Modal.Body>
                
            </Modal>
            </>
        )
    
}

export default Modall