import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import Cards from "./Components/Cards"
import './index.css'
import BounceLoader from "react-spinners/BounceLoader";
import Navigbar from "./Components/Navigbar"
import Home from "./Components/Home"
import World from "./Components/World"
import Politics from "./Components/Politics"
import Business from "./Components/Business"
import Technology from "./Components/Technology"
import Sports from "./Components/Sports"
import Bigcard from "./Components/Bigcard"
import Bookmark from "./Components/Bookmark"
import Search from "./Components/Search"
import { BrowserRouter, Route} from 'react-router-dom';


class App extends React.Component{
   
  constructor(props) {
    super(props)
    this.state={
      arg:true,
      aloha:false
    };
    this.handleToUpdate  = this.handleToUpdate.bind(this);
    this.isbigcard = this.isbigcard.bind(this);
    this.carRef=React.createRef();
    this.changestate=this.changestate.bind(this)
    
}

handleToUpdate(someArg){
        console.log("in this handle");
        console.log(someArg)
        this.setState({
          arg:JSON.parse(localStorage.getItem("news"))
        })
}  

isbigcard(){
  if(window.location.href.indexOf("bigcard")>-1)
  {
    this.setState({
      aloha:true
    })
  }
  else
  {
    this.setState({
      aloha:false
    })
  }
}
changestate()
{
  this.setState({
    arg:JSON.parse(localStorage.getItem("news"))
  })
}
  
  render(){
        console.log(this.state.arg);
        console.log(localStorage.getItem("news"))
        var g =this.state.arg;
        if(!localStorage.getItem("news"))
        {
        // if(this.state.arg===true)
        // {
        //   localStorage.setItem("news",true)
        //   console.log(localStorage.getItem("news"))
        // }
        // else
        // {
          localStorage.setItem("news",true)
          
          console.log(localStorage.getItem("news"))
        // }
        }
        
        if(this.state.arg!=(JSON.parse(localStorage.getItem("news"))))
        {
          this.changestate();
        }
        
        // const Argu = (props) => {
        //   return(
        //     <Home
        //     g={this.state.arg}
        //     {...props}
        //     />
        //   );
        // }
        console.log(window.location.href)
        console.log(this.state.arg)
        
        
        return(
            
            <main>
            <Navigbar carRef={this.carRef} abc={this.handleToUpdate} aloha={this.state.aloha} shan={this.isbigcard}/>
                
                <Route path="/" component={(props)=><Home aloha={this.state.aloha}shan={this.isbigcard}g={JSON.parse(localStorage.getItem("news"))}{...props}/>} exact />
                <Route path="/world" component={(props) => <World aloha={this.state.aloha}shan={this.isbigcard}g={JSON.parse(localStorage.getItem("news"))}{...props}/>} />
                <Route path="/politics" component={(props) => <Politics aloha={this.state.aloha}shan={this.isbigcard}g={JSON.parse(localStorage.getItem("news"))}{...props}/>} />
                <Route path="/business" component={(props) => <Business aloha={this.state.aloha}shan={this.isbigcard}g={JSON.parse(localStorage.getItem("news"))}{...props}/>} />
                <Route path="/technology" component={(props) => <Technology aloha={this.state.aloha}shan={this.isbigcard}g={JSON.parse(localStorage.getItem("news"))}{...props}/>} />
                <Route path="/sports" component={(props) => <Sports aloha={this.state.aloha}shan={this.isbigcard}g={JSON.parse(localStorage.getItem("news"))}{...props}/>} />
                <Route path='/bigcard' component={(props) => <Bigcard aloha={this.state.aloha}shan={this.isbigcard}{...props}/>} />
                <Route path='/bookmark' component={Bookmark}/>
                <Route path='/search' component={Search}/>
            </main>

        )

    }
}

export default App