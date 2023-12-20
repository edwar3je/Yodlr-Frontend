import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.css';

/** A dynamic component that renders information on a given user. If the prop 'admin' is true, additional HTML is generated
 *  that provides 2 administrative actions:
 *      1.) The ability to change a 'pending' user's account to active.
 *          a.) If account is active, an 'unclickable' button is rendered in place.
 *      2.) The ability to delete a user's account.
 */

const UserCard = ({user, admin=false, update=null, remove=null}) => {
    
    /** Destructure information from user prop for easy access. */

    const {id, firstName, lastName, state} = user;

    const path = `/users/${id}`;

    /** Function that updates a user's account from 'pending' to 'active'. */
    
    const handleUpdate = e => {
        e.preventDefault();
        update(id, user);
    }

    /** Function that deletes a user's account from the Yodlr API backend. */

    const handleDelete = e => {
        e.preventDefault();
        remove(id);
    }

    const loadStatus = () => {
        
        /** If the admin prop is true, one of two buttons are generated (see below). Otherwise, a div is generated that is not
         *  displayed.
         */

        if(admin){

            /** If the user's account is 'pending', a special button is generated that allows an admin to update the account
             *  from 'pending' to active'. Otherwise, generates an 'unclickable' button with the text 'Active'. 
             */

            if(state === "pending"){
                return (
                    <div className="user-card-status-container">
                        <button className="button-pending" onClick={handleUpdate}>Pending</button>
                    </div>
                )
            }
            return (
                <div className="user-card-status-container">
                    <button className="button-active">Active</button>
                </div>
            )
        }
        return (
            <div className="no-display"></div>
        )
    }

    /** If the admin prop is true, a button is generated that allows an admin to delete the account. Otherwise, a div is generated
     *  that is not displayed.
     */

    const loadDelete = () => {
        if(admin){
            return (
                <div className="user-card-delete-container">
                    <button className="button-delete" onClick={handleDelete}>Delete</button>
                </div>
            )
        }
        return (
            <div className="no-display"></div>
        )
    }

    return (
        <div className="user-card-container">
            <div className="user-card-name-container">
                <Link className="user-card-name" to={path}>{firstName} {lastName}</Link>
            </div>
            {loadStatus()}
            {loadDelete()}
        </div>
    )
}

export default UserCard