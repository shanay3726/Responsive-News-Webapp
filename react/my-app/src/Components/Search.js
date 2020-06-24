import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import BounceLoader from "react-spinners/BounceLoader";
import {Card,Button, Container} from "react-bootstrap"
import Resultcard from "./Resultcard";

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = { apiResponse: []
            ,isLoaded: false,
            apiResponse1: [] ,
            isLoaded1:false,
            keyword:""            
    };
        this.callAPI=this.callAPI.bind(this);
    }
    
    callAPI() {
      this.setState({isLoaded:false})
      
      var searchword = window.location.href.substring(window.location.href.indexOf("search/")+7)
      this.setState({keyword:searchword})
      var urlto1,urlto2
      
        urlto1="https://sjsanghvhw8.appspot.com/guardian/search?search="+searchword
      
        urlto2="https://sjsanghvhw8.appspot.com/search?search='hello'"+searchword
      console.log(urlto1)
      console.log(urlto2)
      
      fetch(urlto1)
    .then(res => res.json())
    .then(
      (result) => {
          
        this.setState({
          apiResponse: result,
          
          isLoaded: true
        });
        console.log(result);
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
    fetch(urlto2)
    .then(res => res.json())
    .then(
      (result) => {
          
        this.setState({
          apiResponse1: result,
          
          isLoaded1: true
        });
        console.log(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded1: false,
          error
        });
      }
    )
    }
    componentDidMount() {
          
          this.callAPI()
      }
    componentDidUpdate(prevProps,prevState){
      if(prevState.keyword!==(window.location.href.substring(window.location.href.indexOf("search/")+7)))
      {
        this.callAPI()
      }

    }
      render(){
        console.log("Hey")
        if(this.state.apiResponse.length===0 && this.state.apiResponse1.length===0)
        {
            return (
            <div className="d-none d-md-block" style={{marginLeft:'50%',marginTop:'20%'}}>
            <BounceLoader
            size={60}
            color={"#123abc"}
            />Loading  
            </div>
            )
        }
        else{
            console.log(this.state.apiResponse)
            console.log(this.state.apiResponse1)
            if(this.state.apiResponse.length===0 && this.state.apiResponse1.length===0)
            {
              return(
                <h1>There are no such articles</h1>
              )
            }
            const dataa=this.state.apiResponse.map(b=>
                <Resultcard abc={b}/>
                )
            const dataaa=this.state.apiResponse1.map(c=>
                <Resultcard abc={c}/>
                )
                
          return(
                
              <Container fluid>
                  <h2>Results</h2>
              <div className="row" >
              {dataa}
              {dataaa}
              </div>
              </Container>

          )
        }
      }
}
export default Search