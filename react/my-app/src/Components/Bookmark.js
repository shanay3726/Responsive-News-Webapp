import React from 'react'
import Truncate from "react-truncate";
import {Card,Button, Container} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import BounceLoader from "react-spinners/BounceLoader";
import Smallcard from "./Smallcard"

class Bookmark extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            bookdata:[],
            show:"eaa"
        }
        this.hello=this.hello.bind(this)
    }
    
    componentDidMount(){
        console.log(localStorage)
        let tempArray=[];
        for(var x=0;x<localStorage.length;x++)
        {
            if(localStorage.key(x)!=="news")
            {
            console.log(localStorage.key(x));
            var retrievedObject=JSON.parse(localStorage.getItem(localStorage.key(x)));
            tempArray.push(retrievedObject)
            console.log(retrievedObject);
            }
        }
        this.setState({
            bookdata:tempArray
        })
        
        // for(var x=0;x<localStorage.length;x++)
        // {
        // var retrievedObject = localStorage.getItem(x);

        // console.log('retrievedObject: ', JSON.parse(retrievedObject));
        // }
    }
    hello(al){
        this.setState({
            show:al
        })
    }

    render(){
        if(localStorage.length===1)
        {
            return(
                <h3 className="p-2 text-center">You have no saved articles.</h3>
            )
        }
        else
        {
        console.log(this.state.bookdata);
        if(this.state.bookdata.length===0)
        return (
            <h1>You have no saved articles.</h1>
        )
        else
        {
                const alala=this.state.bookdata.map(b=>
                    <Smallcard abc={b} gf={this.state.bookdata} bf={this.hello}/>
                    )
            return(
                <Container fluid>
                <h2 className="px-3 pt-3">Favorites</h2>
                <div className="row" >
                {alala}
                </div>
                </Container>
            )
        }
        }
    }
}

export default Bookmark