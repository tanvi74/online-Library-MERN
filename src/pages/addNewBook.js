import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';

class addNewBook extends Component {

    state = {
        title: "",
        isbn: "",
        pageCount: 0,
        publishedDate: "",
        thumbnailUrl: "",
        shortDesc: "",
        longDesc: "",
        status: "",
        authors: "",
        categories: "",
        price: 0,
        quantity: 0
    }

    submitLogin = async(e) =>{
        e.preventDefault();
        const url = `${window.apiHost}/admin/addBook`;
        const data = {
            title: this.state.title, 
            isbn: this.state.isbn, 
            pageCount: this.state.pageCount, 
            publishedDate: this.state.publishedDate, 
            thumbnailUrl: this.state.thumbnailUrl, 
            shortDesc: this.state.shortDesc, 
            longDesc: this.state.longDesc, 
            status: this.state.status, 
            authors: this.state.authors,
            categories: this.state.categories, 
            price: this.state.price, 
            quantity: this.state.quantity
        }
        console.log(data);
        const resp = await axios.post(url,data);
        console.log(resp.data);
        if(resp.data.status === "bookExist"){
            swal({
                title: "Book is already present in database.",
                icon: "error",
              }).then(function(){ 
                window.location.reload();
            })
        
        }
        // -- badPass
        else if(resp.data.status === "success"){
            swal({
                title: "Success!",
                icon: "success",
              }).then(function(){ 
                window.location.reload();
            })
        }
    }

    render() {
        console.log(this.props.auth)
        return (
            <>
                <div className="defaultHero">
                    <div className="banner">
                        <h1>Add New Book</h1>
                    </div>
                </div>
                <div className="container">
                     <div className="row ">
                            {/* <div className="col l3" style={{backgroundColor:"black"}}>dagfshngxmgnfhgdfzdgfxgngfz</div> */}
                                    <div className="col s12" >
                                    
                                <div className="card card-login" style={{marginTop: 43}}>
                                    <div className="card-content">
                                        
                                        <form onSubmit={this.submitLogin}>

                                        <div className="input-field signupinput">
                                            <input id="name" type="text" className="validate" onChange={(e)=>{this.setState({title: e.target.value})}}/>
                                            <label htmlFor="name" id="name" className="">Title</label>
                                        </div>

                                        <div className="input-field signupinput">
                                            <input id="isbn" type="text" className="validate" onChange={(e)=>{this.setState({isbn: e.target.value})}}/>
                                            <label htmlFor="isbn" id="isbn" className="">ISBN</label>
                                        </div>

                                        <div className="input-field signupinput">
                                            <input id="pageCount" type="number" className="validate" onChange={(e)=>{this.setState({pageCount: e.target.value})}}/>
                                            <label htmlFor="pageCount" id="pageCount" className="">Page Count</label>
                                        </div>

                                        <div className="input-field signupinput">
                                            <input id="publishedDate" type="date" className="validate" onChange={(e)=>{this.setState({publishedDate: e.target.value})}}/>
                                            <label htmlFor="publishedDate" id="publishedDate" className="">Published Date</label>
                                        </div>

                                        <div className="input-field signupinput">
                                            <input id="imageurl" type="text" className="validate" onChange={(e)=>{this.setState({thumbnailUrl: e.target.value})}}/>
                                            <label htmlFor="imageurl" id="imageurl" className="">Thumb Nail URL</label>
                                        </div>

                                        <div className="input-field signupinput">
                                            <input id="shortDesc" type="text" className="validate" onChange={(e)=>{this.setState({shortDesc: e.target.value})}}/>
                                            <label htmlFor="shortDesc" id="shortDesc" className="">Short Description</label>
                                        </div>

                                        <div className="input-field signupinput">
                                            <input id="longDesc" type="text" className="validate" onChange={(e)=>{this.setState({longDesc: e.target.value})}}/>
                                            <label htmlFor="longDesc" id="longDesc" className="">Long Description</label>
                                        </div>

                                        <div className="input-field signupinput">
                                            <input id="status" type="text" className="validate" onChange={(e)=>{this.setState({status: e.target.value})}}/>
                                            <label htmlFor="status" id="status" className="">Status</label>
                                        </div>

                                        <div className="input-field signupinput">
                                            <input id="authors" type="text" className="validate" onChange={(e)=>{this.setState({authors: e.target.value})}}/>
                                            <label htmlFor="authors" id="authors" className="">Authors</label>
                                        </div>

                                        <div className="input-field signupinput">
                                            <input id="categories" type="text" className="validate" onChange={(e)=>{this.setState({categories: e.target.value})}}/>
                                            <label htmlFor="categories" id="categories" className="">Categories</label>
                                        </div>

                                        <div className="input-field signupinput">
                                            <input id="price" type="number" className="validate" onChange={(e)=>{this.setState({price: e.target.value})}}/>
                                            <label htmlFor="price" id="price" className="">price</label>
                                        </div>

                                        <div className="input-field signupinput">
                                            <input id="quantity" type="number" className="validate" onChange={(e)=>{this.setState({quantity: e.target.value})}}/>
                                            <label htmlFor="quantity" id="quantity" className="">Quantity</label>
                                        </div>

                                            <button className="waves-effect waves-light btn sign-page-button" >submit</button>
                                        </form>

                                        
                                    
                                    </div>
                                </div>
                            </div>
                 
                            </div>
            </div>
            </>
           
        )
    }
}

function mapStateToProps(state){
    return{
        auth : state.auth
    }
}

export default connect(mapStateToProps)(addNewBook)