import React, { Component } from 'react'
import axios from 'axios';
import './SinglePageComp.css';
import {connect} from 'react-redux';

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

    
    render() {
        console.log(this.state.bookDetail)
        const book = this.state.bookDetail;
        return (
            <div className="content123 container">
                <h1 style={{color:"white", textAlign:"center"}}>Book Details</h1>
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
                                    <div className="btn-large bookingBtn">Book Now</div>
                                </>
                                :
                                <>
                                     <div className="btn-large notAvailableBtn">Sorry! Not Available</div>
                                </>
                            :
                                null
                            }
                        </div>
                    </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(SingleBookPage);
