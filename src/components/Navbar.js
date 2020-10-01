import React from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import openModal from '../actions/openModal';
import Login from '../pages/login';
import logoutAction from '../actions/logoutAction';
import './navbar.css';

class Navbar extends React.Component {

    componentDidUpdate(oldProps){
        if((oldProps.auth.token !== this.props.auth.token)){
            this.props.openModal('closed', "")
        }
    }

    render(){
        
        return(
                <div className="navBar">
              
                    {/* <Link to="/" className="brand-logo">
                        <img src={Logo} alt="Netflix-logo" className="logo"/>
                    </Link> */}
                    <ul className="">
                    {this.props.auth.type==="librarian"
                                    ? <>
                                            <li className="left userEmail" style={{color:"white"}}>Hello, {this.props.auth.name}</li>
                                            <li onClick={()=>this.props.logoutAction()} className="logoutButton waves-effect waves-light btn right">Logout</li>
                                            <li className="linksOfLibrarian waves-effect waves-light btn right" ><Link to="/admin/requests" style={{color: "white"}}>Requests</Link></li>
                                            <li className="linksOfLibrarian waves-effect waves-light btn right" ><Link to="/admin/add-new-book" style={{color: "white"}}>Add new Book</Link></li>
                                      </>
                                    : 
                                    this.props.auth.type==="student"
                                      ? <>
                                            <li className="left userEmail" style={{color:"white"}}>Hello, {this.props.auth.name}</li>
                                            <li onClick={()=>this.props.logoutAction()} className="logoutButton waves-effect waves-light btn right">Logout</li>
                                        </>
                                      :
                                      <>
                                            {/* <li className="login-signup waves-effect waves-light btn homesignupbutton" onClick={()=>{this.props.openModal("open", <Signup/>)}}>Sign Up</li> */}
                                            <li className="login-signup waves-effect waves-light btn homesignupbutton right" onClick={()=>{this.props.openModal("open", <Login type="librarian"/>)}} style={{marginLeft: 15}}>Login for Librarians</li>
                                            <li className="login-signup waves-effect waves-light btn homesignupbutton right" onClick={()=>{this.props.openModal("open", <Login type="student"/>)}}  >Login for Students</li>
                                            
                                        </>
                                        
                                    
                                        
                                    }
                    </ul>
                </div>
        )
    }
   
}


function mapStateToProps(state){
    return{
        auth: state.auth,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        openModal: openModal,
        logoutAction: logoutAction
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);