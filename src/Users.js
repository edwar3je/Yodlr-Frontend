import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';
import './Users.css';

/** A dynamic component that can be used to view existing Yodlr user accounts (GET '/users', GET '/admin') or handle administrative
 *  actions on existing Yodlr user accounts (GET '/admin'). Administrative actions include:
 *          1.) Changing the status of a 'pending' user's account to 'active'.
 *          2.) Deleting a user's account.
 */

const Users = ({ users, updateUser=null, deleteUser=null, admin=false }) => {

    /** A 'buffer' state that allows information from API to be gathered by the functions in useEffect and placed in the 'users' prop. 
     * 
    */
    
    const [isLoading, setIsLoading] = useState(true);
    
    /** A function used to generate HTML for each card. The HTML generated depends on two factors:
     *       1.) The length of the array (if length is not equal to 0, a UserCard component is rendered for each user)
     *       2.) The admin prop (if true, a special type of UserCard is generated with additional functionality (see above))
    */
    
    const loadUsers = (array) => {
        if(array.length !== 0){
            if(admin){
                return (
                    <div className="user-cards-container">
                        {array.map((user) => {
                            return <UserCard user={user} admin={true} update={updateUser} remove={deleteUser} key={user.id}/>
                        })}
                    </div>
                )
            }
            return (
                <div className="user-cards-container">
                    {array.map((user) => {
                        return <UserCard user={user} key={user.id}/>
                    })}
                </div>
            );
        }
        return (
            <div className="users-not-found-container">
                <h2 className="users-not-found-message">No users in the database. Why not add one?</h2>
                <button className="register-button">
                    <Link className="register-link" to={'/register'}>Add New User</Link>
                </button>
            </div>
        )
    }

    /** Ensures the component always loads with appropriate data from API. */

    useEffect(() => {
        if(users){
            setIsLoading(false)
        }
    }, [users])
    
    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    return (
        <div className="user-page-container">
            <h1 className="user-page-title">Current Users</h1>
            {loadUsers(users)}
        </div>
    )
}

export default Users;