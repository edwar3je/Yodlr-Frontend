import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

/** A component that renders if a user tries to access a route that is either not explicitly defined within the main app component
 *  (App.js) or information that does not exist in routes that have dynamic url parameters (e.g. GET '/users/:user').
 */

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-message">It looks like the page does not exist.</h1>
            <button className="redirect-home-button">
                <Link className="redirect-home-link" to={'/'}>Go Home</Link>
            </button>
        </div>
    )
}

export default NotFound;