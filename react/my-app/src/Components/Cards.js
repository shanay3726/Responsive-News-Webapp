import React from 'react'
import { MdShare } from "react-icons/md";
import Truncate from "react-truncate";
import {Card} from "react-bootstrap"
import { Redirect } from 'react-router-dom'
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

class Cards extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            showing:false
          }
          this.setRedirect=this.setRedirect.bind(this)
          this.handleShow=this.handleShow.bind(this)
          this.handleClose=this.handleClose.bind(this)
      }
    setRedirect = (event) => {
            console.log("Hello")
        console.log(event.target)
       
        this.setState({
          redirect: true
        })
        

        
    }
    handleShow(event){
        console.log("in handle show opem model")
        event.stopPropagation()
        this.setState({
            showing:true
        })
    }
    handleClose(){
        this.setState({
            showing:false
        })
    }
  
    
    render(){

        const seccolor={
            backgroundColor:"",
            color:""
        }
        if(this.props.abc.sectionId==="world")
        {
            seccolor.backgroundColor="#7c4eff"
            seccolor.color="white"
        }
        else if(this.props.abc.sectionId==="politics"){
            seccolor.backgroundColor="#419488"
            seccolor.color="white"
        }
        else if(this.props.abc.sectionId==="business"){
            seccolor.backgroundColor="#4696ec"
            seccolor.color="white"
        }
        else if(this.props.abc.sectionId==="technology"){
            seccolor.backgroundColor="#cedc39"
            seccolor.color="black"
        }
        else if(this.props.abc.sectionId==="sport" || this.props.abc.sectionId==="sports"){
            seccolor.backgroundColor="#f6c244"
            seccolor.color="black"
        }
        else{
            seccolor.backgroundColor="#6e757c"
            seccolor.color="white"
        }
        if (this.state.redirect) {

            return <Redirect push to={"/bigcard/"+this.props.abc.id+"/bin/"+this.props.cd} />
          }
        else  
    return(
    <>
   
    <Card className="mx-3 mt-4 shadow" onClick={this.setRedirect}>
        <Card.Body className="row">
        <div className="col-md-3">
        <Card.Img className="img-thumbnail" src={this.props.abc.Image} />
        </div>
        <div className="col-md-9">
        <Card.Title className="font-italic font-weight-bold">{this.props.abc.webTitle}{"  "}<MdShare onClick={this.handleShow}/></Card.Title>
        <Card.Text>
            <Truncate lines={3} ellipsis={<span>...</span>}>{this.props.abc.description}</Truncate>
        </Card.Text>
        <Card.Text className="float-left"><i>{this.props.abc.date.split('T')[0]}</i></Card.Text>
        <Card.Text className="float-right"><h5><span className="badge" style={seccolor}>{this.props.abc.sectionId.toUpperCase()}</span></h5></Card.Text>
        </div>
        
        </Card.Body>
    </Card>

    <Modal show={this.state.showing} onHide={this.handleClose}>
    <Modal.Header closeButton>
    <Modal.Title><h4>{this.props.abc.webTitle}</h4></Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
        <h4>Share via</h4>
        <div style={{display:"flex"}}>
        <FacebookShareButton className="col-md-4" url={this.props.abc.weburl} hashtag={"#CSCI_571_NewsApp"}><FacebookIcon round={true}/></FacebookShareButton>
        <TwitterShareButton className="col-md-4" url={this.props.abc.weburl} title={this.props.abc.webTitle} hashtags={["CSCI_571_NewsApp"]}><TwitterIcon round={true}/></TwitterShareButton>
        <EmailShareButton className="col-md-4" subject={"#CSCI_571_NewsApp"} body={this.props.abc.weburl}><EmailIcon round={true}/></EmailShareButton>
        </div>
    </Modal.Body>
    
    </Modal>
    </>

    )
    }
}

export default Cards