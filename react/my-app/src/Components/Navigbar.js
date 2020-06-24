import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,Form,FormControl,Button,NavDropdown,Card} from 'react-bootstrap'
import { render } from '@testing-library/react';
import {FaRegBookmark,FaBookmark} from "react-icons/fa";
import Switch from "react-switch"
import Select from "react-select";
import Cards from "./Cards"
import '../index.css'
import {Link} from "react-router-dom"
import AsyncSelect from "react-select/async"
import _ from "lodash";
import SelectedResult from "./SelectedResult";
import { Redirect } from "react-router-dom";
import ReactTooltip from "react-tooltip"

class Navigbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = { checked: JSON.parse(localStorage.getItem("news")) ,
            results: [], 
            selectedResult: null,
            redirect:false,
            option:"",
            navtype:0
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSearchChange=this.handleSearchChange.bind(this)
        this.handleResultSelect=this.handleResultSelect.bind(this)
        this.setRedirect=this.setRedirect.bind(this)
        this.getresult=this.getresult.bind(this)
        this.setnav=this.setnav.bind(this)
        this.setnav2=this.setnav2.bind(this)
        this.trybig=this.trybig.bind(this)
        this.setfalse=this.setfalse.bind(this)
      }

      componentDidMount(){
        if(this.props.aloha)
        {
          this.setState(
            {
              navtype:3
            }
          )
        }
      }

      handleChange() {
          console.log("Hi");
          // console.log(checked);
          if(this.state.checked===true)
          {
            this.setState({
              checked:false
            })
          }
          else{
            this.setState({
              checked:true
            })
          }
        // this.setState({ checked });
        this.props.abc(this.state.checked);
        
        console.log(JSON.parse(localStorage.getItem("news")))
        // console.log(this.props.abc)
      }

      setfalse(){
        this.props.shan()
      }
      setnav(){
        this.setState({
          navtype:1
        })
        this.setState(
          {
            option:""
          }
        )
        this.props.shan()
      }

      setnav2(){
        this.setState({
          navtype:2
        })
        this.setState(
          {
            option:""
          }
        )
        this.props.shan()
      }

      trybig(){
        console.log(window.location.href)
        if(window.location.href.indexOf("bigcard")>-1)
        {
        this.setState({
          navtype:5
        })
        }
        this.setState(
          {
            option:""
          }
        )
      }

      handleSearchChange = async ( inputValue ) => {
        try {
          const response = await fetch(
            'https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q='+inputValue,
            {
              headers: {
                "Ocp-Apim-Subscription-Key": "5daca5f245184a0cb6e269d948c788e9"
              }
            }
          );
          const data = await response.json();
          const resultsRaw = data.suggestionGroups[0].searchSuggestions;
          const results = resultsRaw.map(result => ({ label: result.displayText, url: result.url }));
          this.setState({ results });
          return results
        } catch (error) {
          console.error(`Error fetching search ${inputValue}`);
        }
      };

      handleResultSelect = ({ result }) =>{
    this.setState({ selectedResult: result });
        console.log(this.state.selectedResult)
    }

    setRedirect = (event) => {
        console.log("Hello")
        console.log(event.target)
        
        this.setState({
          redirect: true
        })   
    }


    getresult(opt)
    {
      console.log(opt.label)
      this.setState(
        {
          option:opt.label
        }
      )
      this.setState({
        redirect:true
      })
      this.setState({
        navtype:0
      })
    }
    
    render(){
        console.log(this.state.results)
        if(window.location.href.indexOf("bigcard")>-1 && this.state.navtype!=5)
        {this.trybig()}
        if(this.state.checked===true)
        {
          localStorage.setItem("news",true)
        }
        else
        {
          localStorage.setItem("news",false)
        }

        let homestyle
        let worldstyle
        let politicsstyle
        let businessstyle
        let technologystyle
        let sportsstyle
        let defaultstyle
        defaultstyle=
        {
            // color:"#8d9bb2",
        }
        if(window.location.href.indexOf("world")>-1)
        {
          worldstyle=
          {
            color:"white"
          }
        }
        else if(window.location.href.indexOf("politics")>-1)
        {
          politicsstyle=
          {
            color:"white"
          }
        }
        else if(window.location.href.indexOf("business")>-1)
        {
          businessstyle=
          {
            color:"white"
          }
        }
        else if(window.location.href.indexOf("technology")>-1)
        {
          technologystyle=
          {
            color:"white"
          }
        }
        else if(window.location.href.indexOf("sports")>-1)
        {
          sportsstyle=
          {
            color:"white"
          }
        }
        else
        {
          homestyle={
            color:"white"
          }
        }

        

        console.log(this.state.navtype)
        if ((this.state.redirect && this.state.navtype===0)) {
            console.log("In 1st consition")
            return (
            <>
            <>
                <Navbar variant="dark" expand="lg" className="navv ">  
                    <Form inline>
                            
                        <div style={{"width":"15rem","color":"black"}}>
                        <AsyncSelect
                            placeholder="Enter keyword .."   
                            defaultInputValue={this.state.option}                     
                            loadOptions={_.debounce(this.handleSearchChange, 1000, {
                                leading: true
                            })}
                            results={this.state.results}
                            onChange={opt=>this.getresult(opt)}
                            />
                        </div>                                
                    </Form>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
                    
                    <Navbar.Collapse id="responsive-navbar-nav">
                        
                        
                        <Nav className="mr-auto">
                        <Nav.Link onClick={this.setnav} as={Link} to="/" href="/">Home</Nav.Link>
                        <Nav.Link onClick={this.setnav} as={Link} to="/world" href="/world">World</Nav.Link>
                        <Nav.Link onClick={this.setnav} as={Link} to="/politics" href="/politics">Politics</Nav.Link>
                        <Nav.Link onClick={this.setnav} as={Link} to="/business" href="/business">Business</Nav.Link>
                        <Nav.Link onClick={this.setnav} as={Link} to="/technology"  href="/technology">Technology</Nav.Link>
                        <Nav.Link onClick={this.setnav} as={Link} to="/sports" href="/sports">Sports</Nav.Link>
                        </Nav>
                        <Nav.Link onClick={this.setnav2} as={Link} to="/Bookmark" href="/bookmark"><a data-tip="Bookmark"><FaRegBookmark className="text-white"/></a></Nav.Link>
                        {/* <Navbar.Brand className="text-light px-3" href="#home">NYTimes</Navbar.Brand>
                        <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon={false} checkedIcon={false} onColor={"#4696ec"} offColor={"#dddddd"}/>
                        <Navbar.Brand className="text-light px-2" href="#home">Guardian</Navbar.Brand>  */}
                        <ReactTooltip effect="solid" place="bottom"/>
                    </Navbar.Collapse>
                        
                </Navbar>
            </>
            <>
            <Redirect push to={"/search/"+this.state.option}/>
            </>
            </>
            )
          }
        else if(this.state.navtype===2)
        {
          return(
            <>
        <Navbar variant="dark" expand="lg" className="navv ">  
            <Form inline>
                    
                <div style={{"width":"15rem","color":"black"}}>
                <AsyncSelect
                    placeholder="Enter keyword .."
                    defaultInputValue={this.state.option}   
                    loadOptions={_.debounce(this.handleSearchChange, 1000, {
                        leading: true
                    })}
                    results={this.state.results}
                    onChange={opt=>this.getresult(opt)}
                    />
                </div>                                
            </Form>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            
            <Navbar.Collapse id="responsive-navbar-nav">
                
                
                <Nav className="mr-auto">
                <Nav.Link onClick={this.setnav} as={Link} to="/" href="/">Home</Nav.Link>
                <Nav.Link onClick={this.setnav} as={Link} to="/world" href="/world">World</Nav.Link>
                <Nav.Link onClick={this.setnav} as={Link} to="/politics" href="/politics">Politics</Nav.Link>
                <Nav.Link onClick={this.setnav} as={Link} to="/business" href="/business">Business</Nav.Link>
                <Nav.Link onClick={this.setnav} as={Link} to="/technology"  href="/technology">Technology</Nav.Link>
                <Nav.Link onClick={this.setnav} as={Link} to="/sports" href="/sports">Sports</Nav.Link>
                </Nav>
                <Nav.Link as={Link} to="/bookmark" href="/bookmark" data-tip="Bookmark"><FaBookmark className="text-white"/></Nav.Link>
                <ReactTooltip effect="solid" place="bottom"/>
                {/* <Navbar.Brand className="text-light px-3" href="#home">NYTimes</Navbar.Brand>
                <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon={false} checkedIcon={false} onColor={"#4696ec"} offColor={"#dddddd"}/>
                <Navbar.Brand className="text-light px-2" href="#home">Guardian</Navbar.Brand>  */}
            </Navbar.Collapse>
                
        </Navbar>
        </>
          )
        }
        else if(this.state.navtype===5)
        {
          return(
            <>
            <>
                <Navbar id="gotonav" variant="dark" expand="lg" className="navv ">  
                    <Form inline>
                            
                        <div style={{"width":"15rem","color":"black"}}>
                        <AsyncSelect
                            placeholder="Enter keyword .."   
                            defaultInputValue={this.state.option}                        
                            loadOptions={_.debounce(this.handleSearchChange, 1000, {
                                leading: true
                            })}
                            results={this.state.results}
                            onChange={opt=>this.getresult(opt)}
                            />
                        </div>                                
                    </Form>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
                    
                    <Navbar.Collapse id="responsive-navbar-nav">
                        
                        
                        <Nav className="mr-auto">
                        <Nav.Link onClick={this.setnav} as={Link} to="/" href="/">Home</Nav.Link>
                        <Nav.Link onClick={this.setnav} as={Link} to="/world" href="/world">World</Nav.Link>
                        <Nav.Link onClick={this.setnav} as={Link} to="/politics" href="/politics">Politics</Nav.Link>
                        <Nav.Link onClick={this.setnav} as={Link} to="/business" href="/business">Business</Nav.Link>
                        <Nav.Link onClick={this.setnav} as={Link} to="/technology"  href="/technology">Technology</Nav.Link>
                        <Nav.Link onClick={this.setnav} as={Link} to="/sports" href="/sports">Sports</Nav.Link>
                        </Nav>
                        <Nav.Link onClick={this.setnav2} as={Link} to="/bookmark" href="/bookmark" data-tip="Bookmark"><FaRegBookmark className="text-white"/></Nav.Link>
                        <ReactTooltip effect="solid" place="bottom"/>
                        {/* <Navbar.Brand className="text-light px-3" href="#home">NYTimes</Navbar.Brand>
                        <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon={false} checkedIcon={false} onColor={"#4696ec"} offColor={"#dddddd"}/>
                        <Navbar.Brand className="text-light px-2" href="#home">Guardian</Navbar.Brand>  */}
                    </Navbar.Collapse>
                        
                </Navbar>
            </>
            </>
          )
        }
        else 
        {
          console.log("In 4th condition")
          console.log(typeof(this.state.checked))
          console.log(typeof(localStorage.getItem("news")))
        return(
            <>
              {console.log(this.state.checked)}
        <Navbar variant="dark" expand="lg" className="navv ">  
            <Form inline>
                    
                <div style={{"width":"15rem","color":"black"}}>
                <AsyncSelect
                    placeholder="Enter keyword .."
                    defaultInputValue={this.state.option}   
                    loadOptions={_.debounce(this.handleSearchChange, 1000, {
                        leading: true
                    })}
                    results={this.state.results}
                    onChange={opt=>this.getresult(opt)}
                    />
                </div>                                
            </Form>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            
            <Navbar.Collapse id="responsive-navbar-nav">
                
                
                <Nav className="mr-auto">
                  
                <Nav.Link onClick={this.setfalse} style={homestyle} as={Link} to="/" href="/">Home</Nav.Link>
                <Nav.Link onClick={this.setfalse} style={worldstyle} as={Link} to="/world" href="/world">World</Nav.Link>
                <Nav.Link onClick={this.setfalse} style={politicsstyle} as={Link} to="/politics" href="/politics">Politics</Nav.Link>
                <Nav.Link onClick={this.setfalse} style={businessstyle} as={Link} to="/business" href="/business">Business</Nav.Link>
                <Nav.Link onClick={this.setfalse} style={technologystyle} as={Link} to="/technology"  href="/technology">Technology</Nav.Link>
                <Nav.Link onClick={this.setfalse} style={sportsstyle} as={Link} to="/sports" href="/sports">Sports</Nav.Link>
                  </Nav>
                  <Nav>
                <Nav.Link onClick={this.setnav2} as={Link} to="/bookmark" href="/bookmark" data-tip="Bookmark"><FaRegBookmark className="text-white"/></Nav.Link>
                <Navbar.Brand className="text-light ohmy" ref={this.props.carRef}>NYTimes</Navbar.Brand>
                <Navbar.Brand><Switch className="ohmy" onChange={this.handleChange} checked={this.state.checked} uncheckedIcon={false} checkedIcon={false} onColor={"#4696ec"} offColor={"#dddddd"}/></Navbar.Brand>
                <Navbar.Brand className="text-light ohmy">Guardian</Navbar.Brand>
                <ReactTooltip effect="solid" place="bottom"/>
                  </Nav>
                 
            </Navbar.Collapse>
                
        </Navbar>
        </>
        
    )}
    }
}

export default Navigbar