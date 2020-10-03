import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './CardContent.css';

export default class CardContent extends Component {

    accepted = async()=>{
        const url = `${window.apiHost}/book/update-status`;
        const data = {
            email: this.props.email,
            bookId: this.props.bookId,
            request: this.props.request,
            status: "ACCEPT"
        }
        const resp = await axios.post(url,data);
        console.log(resp.data);
        if(resp.data.status==="ACCEPTED")
        {
            swal({
                title: "ACCEPTED REQUEST",
                icon: "success",
              }).then(()=>{
                window.location.reload()
            })  
        }
    }

    declined = async()=>{
        const url = `${window.apiHost}/book/update-status`;
        const data = {
            email: this.props.email,
            bookId: this.props.bookId,
            request: this.props.request,
            status: "DECLINE"
        }
        const resp = await axios.post(url,data);
        console.log(resp.data);
        if(resp.data.status==="DECLINED")
        {
            swal({
                title: "DECLINED REQUEST",
                icon: "success",
              }).then(()=>{
                  window.location.reload()
              }) 
        }
    }

    render() {
        return (
                <>
                    <div className="col l4 m6 s12">
                        <div className="card card-login">
                            <div className="card-content">
                                {this.props.type==="ADMIN"
                                    ?
                                    <>
                                            <div><span className="title">Book Name : </span><span className="history-bookName">{this.props.bookName}</span></div>
                                            <div><span className="title">Name : </span><span className="history-bookName">{this.props.name}</span></div>
                                            <div><span className="title">Request : </span><span className="history-request">{this.props.request}</span></div>
                                            <hr />
                                            <button className="waves-effect waves-light btn-large sign-page-button acceptBtn" onClick={this.accepted}>ACCEPT</button>
                                            <button className="waves-effect waves-light btn-large sign-page-button declineBtn" onClick={this.declined}>DECLINE</button>
                                    </>
                                    :
                                    <>  
                                            <div><span className="title">Book Name : </span><span className="history-bookName">{this.props.bookName}</span></div>
                                            <div><span className="title">Request : </span><span className="history-request">{this.props.request}</span></div>
                                            <hr />
                                            {this.props.status==="ACCEPT"
                                                ? <div><span className="history-status" style={{color:"green"}}>{this.props.status}</span></div>
                                                : <div><span className="history-status" style={{color:"red"}}>{this.props.status}</span></div>
                                            }
                                            
                                    </>

                                }
                            </div>
                        </div>
                    </div>
                   
            </>
        )
    }
}
