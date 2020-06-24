import React from 'react'
import { MdShare } from "react-icons/md";
import Truncate from "react-truncate";
import {Card,Button, ToastBody} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import BounceLoader from "react-spinners/BounceLoader";
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
import {FaRegBookmark,FaBookmark, FaBlackTie} from "react-icons/fa";
import {FaChevronDown,FaChevronUp} from "react-icons/fa";
import Commentbox from "./Commentbox"
import ReactTooltip from "react-tooltip"
import {toast, Zoom} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import '../index.css'
import { Link,animateScroll as scrolling } from "react-scroll";

class Bigcard extends React.Component{
    constructor(props) {
        super(props);
        this.state = { apiResponse: []
            ,isLoaded: false
            ,isBig:false   
            ,isbookmark:false         
    };
        this.callAPI=this.callAPI.bind(this);
        this.changetext=this.changetext.bind(this);
        this.changetext1=this.changetext1.bind(this);
        this.storedata=this.storedata.bind(this);
        this.deletedata=this.deletedata.bind(this);
        this.myRef = React.createRef();
        this.myRef1 = React.createRef();
        this.scroll=this.scroll.bind(this);
        this.scroll2=this.scroll2.bind(this);
    }
    
    callAPI() {
            
    }
   
    scroll(ref) {
        console.log(ref)
        ref.current.scrollIntoView({behavior: 'smooth'})
      }
      scroll2(ref) {
        console.log(ref)
        scrolling.scrollToTop()
        // window.scroll({
        //     top: 0, 
        //     left: 0, 
        //     behavior: 'smooth',
        //     duration:1000
        //   });
      }
    
    
    componentDidMount(){
        console.log(window.location.href)
        const elem=window.location.href.substring(window.location.href.indexOf("bigcard/")+8,(window.location.href.indexOf("bin/")-1))
        const elem1=window.location.href.substring(window.location.href.indexOf("bin/")+3)
        console.log(elem)
        console.log(elem1)
        console.log(this.props.aloha)
        if(this.props.aloha===false)
        {
            this.props.shan()
        }
        this.setState({isLoaded:false})
        if(elem1.includes("true"))
        {   console.log("in guardian")
            var urlto="https://sjsanghvhw8.appspot.com/guardian/id?id1="+elem
        }
        else
        {   console.log("in nytimes")
            var urlto="https://sjsanghvhw8.appspot.com/nytimes/id?id1="+elem
            console.log(urlto)
            
        }
        
        fetch(urlto)
      .then(res => res.json())
      .then(
        (result) => {
            
          this.setState({
            apiResponse: result,
            
            isLoaded: true
          });
        //   console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
      
     
    
    }
    changetext(){
        console.log("hy")
        if(this.state.isBig===true)
        {
            this.setState({
                isBig:false
            })
        }
        else
        {
            this.setState({
                isBig: true
            })
        }
        // this.scroll(this.myRef)
    }
    changetext1(){
        console.log("hy")
        this.scroll2(this.myRef1)
        if(this.state.isBig===true)
        {
            this.setState({
                isBig:false
            })
        }
        else
        {
            this.setState({
                isBig: true
            })
        }
        
    }
    storedata()
    {
        var testObject = this.state.apiResponse[0];
        const elem1=window.location.href.substring(window.location.href.indexOf("bin/")+3)
        if(elem1.includes("true"))
        {
            testObject.news="guardian"
        }
        else
        {
            testObject.news="nytimes"
        }
        console.log(testObject)

        // Put the object into storage
        localStorage.setItem(this.state.apiResponse[0].weburl, JSON.stringify(testObject));
        this.setState({
            isbookmark:true
        })
        toast.configure()
        toast("Saving "+this.state.apiResponse[0].webTitle,{
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar:true,
            autoClose:1500,
            transition:Zoom,
            bodyClassName:"toast-body"
        })
        console.log(localStorage)
        if(localStorage.key(0)==="https://www.nytimes.com/2020/04/07/world/coronavirus-updates-news-live.html")
        console.log("True")
        // Retrieve the object from storage
        
        
    }
    deletedata(deleteurl)
    {
        localStorage.removeItem(deleteurl);
        this.setState({
            isbookmark:false
        })
        
        toast.configure()
        toast("Removing "+this.state.apiResponse[0].webTitle,{
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar:true,
            autoClose:1500,
            transition:Zoom,
            bodyClassName:"toast-body"
        })

    }
    render(){
        // console.log(this.state.apiResponse)
        //console.log(this.props.carRef)
        console.log("hi")
        if(this.state.apiResponse.length===0)
        return (
            <div className="d-none d-md-block" style={{marginLeft:'50%',marginTop:'20%'}}>
            <BounceLoader
            size={60}
            color={"#123abc"}
            />Loading  
            </div>
        )
        else
        {   
            var aaa=""
            var bbb=""
            var ccc=""
            var ddd=""
            var liness=this.state.apiResponse[0].description
            var line=[]
            line=liness.split(". ")
            var i=0
            var full=""
            var full1=""
            while(i<4 && line[i]!=null)
            {
                full=full+line[i]+"."
                i=i+1
                // console.log(full)
            }
            while(line[i]!=null)
            {
                full1=full1+line[i]+"."
                i=i+1
            }
            aaa=<Card.Text className="float-left text-justify">
                    <div>
                    {full}
                    </div>
                    <div id="trying">
                    </div>
                    </Card.Text>
             if(this.state.isBig)
             {
                ddd=<Card.Text><div id="try2">
                    <br/>
                    {full1}
                    </div>
                    </Card.Text>

                bbb=<div><FaChevronUp  className="float-right" onClick={this.changetext1}/></div>
             }
             else
             {
                ddd=<Card.Text><div id="try2" className="hey" style={{display : "none"}} >
                
                {full1}
                </div>
                <div ref={this.myRef} className="scrollToHere" >

                </div>
                </Card.Text>
                bbb=<div><Link to="trying"
                activeClass="active"
                spy={true}
                smooth={true}
                offset={0}
                duration= {500}><FaChevronDown  className="float-right" onClick={this.changetext}/></Link></div>

             }
            
            







            // if(this.state.isBig)
            // {
            //     var liness=this.state.apiResponse[0].description
            //     var line=[]
            //     line=liness.split(". ")
            //     var i=0
            //     var full2=""
            //     var full3=""
            //     while(i<4 && line[i]!=null)
            //     {
            //         full2=full2+line[i]+"."
            //         i=i+1
            //         // console.log(full)
            //     }
            //     while(line[i]!=null)
            //     {
            //         full3=full3+line[i]+"."
            //         i=i+1
            //     }
            //     aaa=<Card.Text className="float-left text-justify">
            //         <div>
            //         {full2}
            //         </div>
            //         </Card.Text>

            //     ddd=<Card.Text><div id="try2">
            //         <br/>
            //         {full3}
            //         </div>
            //         </Card.Text>

            //     bbb=<div><FaChevronUp  className="float-right" onClick={this.changetext1}/></div>

            // }
            // else
            // {
            //     var liness=this.state.apiResponse[0].description
            //     var line=[]
            //     line=liness.split(". ")
            //     var i=0
            //     var full=""
            //     var full1=""
            //     while(i<4 && line[i]!=null)
            //     {
            //         full=full+line[i]+"."
            //         i=i+1
            //         // console.log(full)
            //     }
            //     while(line[i]!=null)
            //     {
            //         full1=full1+line[i]+"."
            //         i=i+1
            //     }
            //     // console.log(line)
            //     // aaa=<Card.Text className="float-left text-justify">{full}
            //     //     {/* <Truncate lines={6} ellipsis={<span>...</span>}>{this.state.apiResponse[0].description}</Truncate> */}
            //     //     </Card.Text>
            //     aaa=<Card.Text className="float-left text-justify">
            //     {/* {this.state.apiResponse[0].description} */}
            //     <div>
            //     {full}
            //     <br/>
            //     </div>
            //     </Card.Text>
            //     ddd=<Card.Text><div id="try2" className="hey" style={{display : "none"}} >
                
            //     {full1}
            //     </div>
            //     <div ref={this.myRef} className="scrollToHere" >

            //     </div>
            //     </Card.Text>
            //     bbb=<div><Link to="try2"><FaChevronDown  className="float-right" onClick={this.changetext}/></Link></div>
                
            // }
            if(this.state.isbookmark || localStorage.getItem(this.state.apiResponse[0].weburl))
            {
                
                ccc=<FaBookmark style={{"color":"red"}} onClick={()=>this.deletedata(this.state.apiResponse[0].weburl)} className="text-black" size={22}/>
            }
            else{
                
                ccc=<FaRegBookmark style={{"color":"red"}} onClick={this.storedata} className="text-black" size={22}/>
            }
        return(
            <div className="scrollToHere" ref={this.myRef1}>
                <div>
            <Card className="m-3 p-3 shadow-lg">
            <Card.Body>
        <Card.Title className="font-italic" style={{fontSize:"1.7rem"}}>{this.state.apiResponse[0].webTitle}</Card.Title>
            
            <Card.Text>
            <p><i>{this.state.apiResponse[0].date.split('T')[0]}</i>
            <div className="float-right">
                <a data-tip='Facebook'><FacebookShareButton url={this.state.apiResponse[0].weburl} hashtag={"#CSCI_571_NewsApp"}><FacebookIcon size={22} round={true}/></FacebookShareButton></a>
                <a data-tip='Twitter'><TwitterShareButton url={this.state.apiResponse[0].weburl} title={this.state.apiResponse[0].webTitle} hashtags={["CSCI_571_NewsApp"]}><TwitterIcon size={22} round={true}/></TwitterShareButton></a>
                <a data-tip='Email'><EmailShareButton subject={"#CSCI_571_NewsApp"} body={this.state.apiResponse[0].weburl}><EmailIcon size={22} round={true}/></EmailShareButton></a>
                
                &emsp;
                &emsp;
                <a data-tip='Bookmark'>{ccc}</a>
               
            </div>
            <ReactTooltip effect="solid"/>
            </p>
            <Card.Img src={this.state.apiResponse[0].Image} />
            {aaa}
            {ddd}
            {bbb}
            </Card.Text>
            </Card.Body>
            </Card>
            </div>
            <Commentbox id={this.state.apiResponse[0].weburl}/>
            </div>

        )
    }
}
}
export default Bigcard
