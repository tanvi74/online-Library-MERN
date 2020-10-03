import React, { Component } from 'react'
import axios from 'axios';
import './SinglePageComp.css';
import {connect} from 'react-redux';
import swal from 'sweetalert';

class SingleBookPage extends Component {
    state = {
        bookDetail: []
    }

    componentDidMount(){
        this.getdetails();
    }

    getdetails=async()=>{
        const url = `${window.apiHost}/admin/bookDetail`;
        const id = this.props.match.params.bookId
        console.log(id);
        const data = {id}
        const resp = await axios.post(url,data);
        this.setState({
            bookDetail: resp.data.bookDetail
        })
        console.log(resp.data);
    }


    sendRequest = async() => {
        const url = `${window.apiHost}/book/send-request`;
        const data = {
            status: "PENDING",
            request: "BOOK",
            id: this.props.match.params.bookId,
            name: this.props.auth.name,
            email: this.props.auth.email,
            bookName: this.state.bookDetail.title
        }
        console.log(data);
        const resp = await axios.post(url,data);
        console.log(resp.data);
        if(resp.data.status === "alreadyBooked"){
            swal({
                title : "Book Request Failed",
                text: "You can't book the same book twice.",
                icon: "error",
              })
        
        }else if(resp.data.status === "returnPending"){
            swal({
                title : "Book Request Failed",
                text: "Your return request is pending.",
                icon: "error",
              })
        }
        else if(resp.data.status === "booked"){
            swal({
                title: "Request sent to librarian",
                text: "We will notify you the update on your mail.",
                icon: "success",
              })    
        }

    }

    returnRequest = async() => {
        const url = `${window.apiHost}/book/send-request`;
        const data = {
            status: "PENDING",
            request: "RETURN",
            id: this.props.match.params.bookId,
            name: this.props.auth.name,
            email: this.props.auth.email,
            bookName: this.state.bookDetail.title
        }
        console.log(data);
        const resp = await axios.post(url,data);
        console.log(resp.data);
        if(resp.data.status === "bookRequestInQueue"){
            swal({
                title: "Return Request Failed. You don't owe the book",
                text: "Your Book request is in queue. Please wait until it is granted then you can place the return request",
                icon: "error",
              })
        
        }else if(resp.data.status === "returnRequestFailed"){
            swal({
                title: "Return Request Failed.",
                text: "either you don't owe it or your return request is pending.",
                icon: "error",
              })
        }
        else if(resp.data.status === "returnRequestSuccess"){
            swal({
                title: "Request sent to librarian",
                text: "We will notify you the update on your mail.",
                icon: "success",
              })    
        }
    }

    notAvailable = () => {
        console.log("NOT AVAILABLE")
    }
    
    render() {
        console.log(this.state.bookDetail)
        const book = this.state.bookDetail;
        return (
            <>
                <div className="defaultHero">
                    <div className="banner">
                        <h1>Book Details</h1>
                    </div>
                </div>
                <div className="content123 container" style={{marginTop: 50}}>
                    <div className="row">
                        <div className="col s12 m6 s6">
                            <div className=""><span className="heading123">Title </span>: {book.title}</div>
                            <div className=""><span className="heading123">ISBN</span> : {book.isbn}</div>
                            <div className=""><span className="heading123">Page Count</span> : {book.pageCount}</div> 
                            <div><span className="heading123">Published Date </span>: {book.publishedDate}</div> 
                            <div><span className="heading123">Status </span>: {book.status}</div> 
                            <div><span className="heading123">Authors </span>: {book.authors}</div> 
                            <div><span className="heading123">Categories </span>: {book.categories}</div> 
                            <div><span className="heading123">Price </span>: {book.price}</div>
                            <div><span className="heading123">Quantity </span>: {book.quantity}</div>
                            <div className=""><span className="heading123">Short Description</span> : {book.shortDescription}</div>
                            <br/>
                            <div>{book.longDescription}</div>

                        </div>
                        <div className="col s12 m6 s6 center">
                            <div ><img className="imageUrl" alt={book.title} src={book.thumbnailURl}/></div>
                            {this.props.auth.type === "student"
                            ? book.quantity>0
                                ?
                                <>
                                    <div className="btn-large bookingBtn" onClick={this.sendRequest}>Book Now</div>
                                    <div className="btn-large bookingBtn" onClick={this.returnRequest} style={{marginLeft: 20}}>RETURN Now</div>
                                </>
                                :
                                <>
                                     <div className="btn-large notAvailableBtn" onClick={this.notAvailable}>Sorry! Not Available</div>
                                </>
                            :
                                null
                            }
                        </div>
                    </div>
            </div>
            </>
            
        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(SingleBookPage);
