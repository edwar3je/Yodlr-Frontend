import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

/** A navbar component that renders across all routes. */

const NavBar = () => {
    return (
        <div>
            <nav className="nav-container">
                <div className="nav-left-container">
                    <NavLink className="nav-home" exact="true" to="/" id="nav-link">Yodlr</NavLink>
                </div>
                <div className="nav-right-container">
                    <NavLink className="nav-register" to="/register" id="nav-link">Add New User</NavLink>
                    <NavLink className="nav-users" to="/users" id="nav-link">View Users</NavLink>
                    <NavLink className="nav-admin" to="/admin" id="nav-link">Admin</NavLink>
                </div>
            </nav>
        </div>
    )
};

export default NavBar;