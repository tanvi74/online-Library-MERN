import React, { Component } from 'react';
import BookPage from '../components/BookPage';

class librarianDashboard extends Component {
    render() {
        
        return (
            <>
                <div className="defaultHero">
                    <div className="banner">
                        <h1>Librarian Dashboard</h1>
                    </div>
                </div>
                <BookPage />
            </>
            
        )
    }
}


export default librarianDashboard
