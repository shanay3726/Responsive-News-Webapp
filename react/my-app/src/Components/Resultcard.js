import React from 'react'
import Truncate from "react-truncate";
import {Card,Button, Nav,Container} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import BounceLoader from "react-spinners/BounceLoader";
import { MdShare,MdDelete } from "react-icons/md";
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
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {Link} from "react-router-dom"

class Resultcard extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            mla:[],
            redirect: false,
            showing:false,
            book:false
        }
        this.handleShow=this.handleShow.bind(this)
        this.handleClose=this.handleClose.bind(this)
      }
      
        handleShow(event){
            console.log("in handle show open model")
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
        setRedirect = (event) => {
            console.log("Hello")
        console.log(event.target)
    
        this.setState({
        redirect: true
        })
        }

      render(){
        if (this.state.redirect) {
            console.log(this.props.abc.webTitle)
            var nyt;
            if(this.props.abc.newsid==="guardian")
            {
                nyt=true
            }
            else
            {
                nyt=false
            }
            return <Redirect push to={"/bigcard/"+this.props.abc.id+"/bin/"+nyt} />
          
        }

        if(this.state.book===true)
        {
            return(
                <div className="d-none d-md-block" style={{marginLeft:'50%',marginTop:'20%'}}>
                <BounceLoader
                size={60}
                color={"#123abc"}
                />Loading  
                </div>
            )
        }
        else
        {
        

        const seccolor={
            backgroundColor:"",
            color:""
        }
        const seccolor1={
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
        if(this.props.abc.news=="guardian")
        {
            seccolor1.backgroundColor="#14284a"
            seccolor1.color="white"
        }
        else
        {
            seccolor1.backgroundColor="#dddddd"
            seccolor1.color="black"   
        }
        
        return(
            
            <div className="col-md-3" >
            <Card className="my-3 shadow-lg" onClick={this.setRedirect}>
            <Card.Body>
            <Card.Title className="font-italic font-weight-bold"><Truncate lines={2} ellipsis={<span>...</span>}>{this.props.abc.webTitle}</Truncate><MdShare onClick={this.handleShow}/></Card.Title>
            <Card.Img className="img-thumbnail" src={this.props.abc.Image} />
            
            <Card.Text className="float-left">{this.props.abc.date.split('T')[0]}</Card.Text>
            <Card.Text className="float-right">
                <span className="badge" style={seccolor}>{this.props.abc.sectionId.toUpperCase()}</span>
                </Card.Text>
        
            </Card.Body>
            </Card>

            <Modal show={this.state.showing} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{this.props.abc.webTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <h3>Share via</h3>
                <div style={{display:"flex"}}>
                <FacebookShareButton className="col-md-4" url={this.props.abc.weburl} hashtag={"#CSCI_571_NewsApp"}><FacebookIcon round={true}/></FacebookShareButton>
                <TwitterShareButton className="col-md-4" url={this.props.abc.weburl} title={this.props.abc.webTitle} hashtags={["CSCI_571_NewsApp"]}><TwitterIcon round={true}/></TwitterShareButton>
                <EmailShareButton className="col-md-4" subject={"#CSCI_571_NewsApp"} body={this.props.abc.weburl}><EmailIcon round={true}/></EmailShareButton>
                </div>
            </Modal.Body>
            
            </Modal> 
            </div>
            
            

          )
      
    }
}

}

export default Resultcard