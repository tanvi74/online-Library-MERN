import React, { Component } from 'react';
import axios from 'axios';
import Spinner from "./Spinner";
import {Link} from 'react-router-dom';
import './BookPage.css'

export default class BookPage extends Component {

    state={
        bookData: []
    }
    componentDidMount(){
        this.getdetails();
    }

    getdetails=async()=>{
        const url = `${window.apiHost}/admin/bookData`;
        const apiKey = "asdfghjkl1234567890";
        const data = {apiKey}
        const resp = await axios.post(url,data);
        this.setState({
            bookData: resp.data.bookDetails
        })
    }

    render() {
        console.log(this.state.bookData)

        if(this.state.bookData.length===0){
            return <Spinner />
        }

        const bookImagesUrl = this.state.bookData.map((book, i) => {
            return (
                <div className="col s12 l3 m6 center" key={i}>
                    <Link to={`/book/${book._id}`}>
                        <div className="container1">
                                <img src={`${book.thumbnailURl}`} alt={book.title} className="image" />
                                <div className="overlay">
                                    <div className="text"><span className="heading">Title:</span> {book.title}<br/><span className="heading">Price: </span>{book.price}<br/><span className="heading">Quantity: </span>{book.quantity}</div>
                                    {/* <div className="text">{book.price}</div> */}
                                    {/* <div className="text"></div> */}
                                </div>
                        </div>
                        {/* <img className="homeImages" alt={book.title} src =  /> */}
                    </Link>
                </div>
            )
        })
        return (
                <div style={{color:"white", marginTop: 40}} className="row">
                        {bookImagesUrl}
                </div>
            
        )
    }
}
