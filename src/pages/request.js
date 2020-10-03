import React, { Component } from 'react'
import CardContent from '../components/CardContent';
import axios from 'axios';


class request extends Component {

    state = {
        requests: []
    }

    componentDidMount(){
        this.getDetails();
       
    }

    getDetails = async() => {
        const url = `${window.apiHost}/book/admin/requests`;
        const apiKey = "asdfghjkl1234567890";
        const data = {apiKey}
        const resp = await axios.post(url,data);
        this.setState({
            requests: resp.data.requests
        })
        console.log(resp.data);
    }

    render() {

        const requestsMade = this.state.requests.map((book, i) => {
            return (
                <CardContent key={i} name={book.name} bookName={book.bookName} request={book.request} bookId={book.bookId} email={book.email} type="ADMIN"/>
            )
        })
        return (
            <>
                <div className="defaultHero">
                    <div className="banner">
                        <h1>Pending Requests</h1>
                    </div>
                </div>
                <div className="row"  style={{marginTop: 20}}>
                    {requestsMade}
                </div>
            </>
        )
    }
}


export default request;
