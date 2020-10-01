import React,{Component} from 'react';
import Home from './pages/home';
import './App.css';


import {BrowserRouter as Router,Route} from "react-router-dom";
import Modal from './components/Modal/Modal';
import LibrarianDashboard from './pages/librarianDashboard';
import Navbar from './components/Navbar';
import AddNewBook from './pages/addNewBook';
import SingleBookPage from './components/SingleBookPage';
import UserDashboard from './pages/userDashboard';


class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">
        <Route path="/" component={Navbar} />
          <Route exact path="/" component={Home} />
          <Route exact path = "/admin-dashboard" component={LibrarianDashboard} />
          <Route exact path = "/user-dashboard" component={UserDashboard} />
          <Route exact path = "/admin/add-new-book" component={AddNewBook} /> 
          <Route exact path = "/book/:bookId" component={SingleBookPage} />
          <Route path="/" component={Modal} />          
        </div>
      </Router>
    )
  }
}

export default App;
