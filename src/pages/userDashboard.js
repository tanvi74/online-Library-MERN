import React, { Component } from 'react';
import BookPage from '../components/BookPage';

class userDashboard extends Component {
    render() {
        return (
            <>
                <div className="defaultHero userHero">
                    <div className="banner">
                        <h1>Student Dashboard</h1>
                    </div>
                </div>
                <BookPage />
            </>
            
        )
    }
}


export default userDashboard