import React, { Component } from 'react'
import CardContent from '../components/CardContent';
import axios from 'axios';
import {connect} from 'react-redux';

class history extends Component {

    state = {
        history: []
    }

    componentDidMount(){
        this.getDetails();
    }

    getDetails = async() => {
        const url = `${window.apiHost}/book/user/history`;
        const email = this.props.auth.email;
        const data = {email}
        const resp = await axios.post(url,data);
        this.setState({
            history: resp.data.history
        })
        console.log(resp.data);
    }

    render() {
        
        const historyMade = this.state.history.map((book, i) => {
            return (
                <CardContent key={i} bookName={book.bookName} request={book.request} status={book.status} type="USER"/>
            )
        })
        
        return (
            <>
                <div className="defaultHero">
                    <div className="banner">
                        <h1>History of Requests</h1>
                    </div>
                </div>
                <div className="row" style={{marginTop: 20}}>
                    {historyMade}
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

export default connect(mapStateToProps)(history);