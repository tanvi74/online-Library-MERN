import React, { Component } from 'react'
import { Redirect } from "react-router";
import {connect} from 'react-redux';
import BookPage from '../components/BookPage';

class home extends Component {
    render() {
        if(this.props.auth.type==="librarian")
        {
            return(
                <Redirect to="/admin-dashboard" />
            )
        }else if(this.props.auth.type==="student")
        {
            return <Redirect to="/user-dashboard" />
        }
        return (
            <div>
                <h1 style={{color: "white"}}>HomePage</h1>
                    <BookPage />
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(home);
