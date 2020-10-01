import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from "react-router";
import BookPage from '../components/BookPage';

class userDashboard extends Component {
    render() {
        if(!this.props.auth.token){
            return(
                <Redirect to="/" />
            )
        }
        return (
            <div>
                <h1 style={{color:"white"}}>dashboard</h1>
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

export default connect(mapStateToProps)(userDashboard)