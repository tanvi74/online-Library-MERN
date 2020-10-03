import React,{Component} from 'react';
import Home from './pages/home';
import {connect} from 'react-redux';
import './App.css';


import {BrowserRouter as Router,Redirect,Route} from "react-router-dom";
import Modal from './components/Modal/Modal';
import LibrarianDashboard from './pages/librarianDashboard';
import Navbar from './components/Navbar';
import AddNewBook from './pages/addNewBook';
import SingleBookPage from './components/SingleBookPage';
import UserDashboard from './pages/userDashboard';
import History from './pages/history';
import Request from './pages/request';


class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">
        <Route path="/" component={Navbar} />
          <Route exact path="/" component={Home} />
          {this.props.auth.type==="librarian"
            ? 
              null
            : 
             this.props.auth.type==="user"
             ?
                null
             :
             <Redirect to="/" />
          }
          <Route exact path = "/admin-dashboard" component={LibrarianDashboard} />
            <Route exact path = "/admin/requests" component={Request} />
            <Route exact path = "/admin/add-new-book" component={AddNewBook} /> 
          <Route exact path = "/user-dashboard" component={UserDashboard} />
          <Route exact path = "/user/history" component={History} />
          <Route exact path = "/book/:bookId" component={SingleBookPage} />
          
          
          <Route path="/" component={Modal} />          
        </div>
      </Router>
    )
  }
}
function mapStateToProps(state){
  return{
      auth: state.auth
  }
}

export default connect(mapStateToProps)(App)
