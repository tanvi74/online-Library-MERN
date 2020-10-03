import React from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import openModal from '../actions/openModal';
import Login from '../pages/login';
import logoutAction from '../actions/logoutAction';
// import './navbar.css';
import {FaAlignRight} from 'react-icons/fa';
// import { withRouter } from 'react-router-dom';

class Navbar extends React.Component {
    state = {
        isOpen:false
    }
    handleToggle = () =>{
        this.setState({isOpen:!this.state.isOpen});
    }

    componentDidUpdate(oldProps){
        if((oldProps.auth.token !== this.props.auth.token)){
            this.props.openModal('closed', "")
        }
    }

     handleLogout = () => {
            this.props.logoutAction();
            const { history } = this.props;
            if(history) history.push('/');
            window.location.reload()
      };

    render(){
        
        return(
            <nav className="navbar">
            <div className="nav-center">
                <div className="nav-header">
                    
                    <button 
                    type="button" 
                    className="nav-btn" 
                    onClick={this.handleToggle}>
                        <FaAlignRight className="nav-icon" />
                    </button>
                </div>
                <ul id="navbarUL" className={this.state.isOpen?"nav-links show-nav":"nav-links"}>
                {this.props.auth.type==="librarian"
                                                ? <>
                                                        <li className="left userEmail"><Link className="userEmail" to="/admin-dashboard">Hello, {this.props.auth.name}</Link></li>
                                                        <li onClick={this.handleLogout} className="logoutButton homesignupbutton waves-effect waves-light btn-large right" style={{fontWeight: "bold"}}>Logout</li>
                                                        <li className="linksOfLibrarian waves-effect waves-light homesignupbutton btn-large right" ><Link className="linksOfLibrarian" to="/admin/requests" style={{color: "white"}}>Requests</Link></li>
                                                        <li className="linksOfLibrarian waves-effect waves-light homesignupbutton btn-large right" ><Link className="linksOfLibrarian" to="/admin/add-new-book" style={{color: "white"}}>Add new Book</Link></li>
                                                  </>
                                                : 
                                                this.props.auth.type==="student"
                                                  ? <>
                                                        <li className="left userEmail"><Link className="userEmail" to="/user-dashboard">Hello, {this.props.auth.name}</Link></li>
                                                        <li onClick={this.handleLogout} className="logoutButton waves-effect waves-light btn-large homesignupbutton right">Logout</li>
                                                        <li className=" logoutButton waves-effect waves-light btn-large homesignupbutton right"><Link className="linksOfLibrarian" to="/user/history" style={{color: "white"}}>History</Link></li>
                                                    </>
                                                  :
                                                  <>
                                                        {/* <li className="login-signup waves-effect waves-light btn homesignupbutton" onClick={()=>{this.props.openModal("open", <Signup/>)}}>Sign Up</li> */}
                                                        <li className="login-signup waves-effect waves-light btn-large homesignupbutton right" onClick={()=>{this.props.openModal("open", <Login type="librarian"/>)}} style={{marginLeft: 15}}>Login for Librarians</li>
                                                        <li className="login-signup waves-effect waves-light btn-large homesignupbutton right" onClick={()=>{this.props.openModal("open", <Login type="student"/>)}}  >Login for Students</li>
                                                        
                                                    </>
                                                    
                                                
                                                    
                                                }
                </ul>
            </div>
            </nav>
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




