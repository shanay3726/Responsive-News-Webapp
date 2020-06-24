import commentBox from "commentbox.io";
import React from 'react'

class Commentbox extends React.Component{
    constructor(props) {
        super(props);
      
    }
    componentDidMount() {

        this.removeCommentBox = commentBox('5734331951611904-proj');
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {

        return (
            <div className="commentbox" id={this.props.id}/>
        );
    }

}

export default Commentbox