import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import BounceLoader from "react-spinners/BounceLoader";
import Cards from "./Cards"

class Technology extends React.Component{
    constructor(props) {
        super(props);
        this.state = { apiResponse: []
            ,isLoaded: false             
    };
        this.callAPI=this.callAPI.bind(this);
    }
    callAPI(){}
    componentDidMount() {
      if(this.props.aloha===true)
        {
          this.props.shan()
        }
        this.setState({isLoaded:false})
        var urlto
        if(this.props.g)
        {
          urlto="https://sjsanghvhw8.appspot.com/guardian/sectionName?sec=technology"
        }
        else
        {
          urlto="https://sjsanghvhw8.appspot.com/nytimes/sectionName?sec=technology"
        }
        fetch(urlto)
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
        
    }
    render(){
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
            const aaa=this.state.apiResponse.map(a=>
                <Cards abc={a} cd={this.props.g}/> 
                )
            return(
                <div>
                    {/* <Cards abc={this.state.apiResponse[0]}/> */}
                    <div>
                        {aaa}
                    </div>

                    
                </div>
            )
    }
    }
}
export default Technology