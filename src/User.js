import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './User.css';

/** A component that renders all available information on a user (based on id provided in url). If no user is found within
 *  the usersInfo state that has an id matching the one provided in the url (or the id provided is NaN), the user is redirected
 *  to the 'Not Found' route. 
 */

const User = ({ users }) => {

    /** specificUser holds information on the given user. Initially rendered as empty, but filled by the functions in useEffect. */

    const [specificUser, setSpecificUser] = useState('');

    /** isLoading is used as a 'buffer' state to allow the functions in useEffect to either fill the specificUser state, or 
     *  redirect the user to a 'Not Found' page.
    */

    const [isLoading, setIsLoading] = useState(true);

    const { user } = useParams();
    
    const navigate = useNavigate();

    /** If the id provided in the url is NaN, or the id provided can't be found in the 'users' prop (holds information from the
     *  'usersInfo' state), the user is redirected to a 'Not Found' page. Otherwise, the 'specificUser' state is set to information
     *  that matches the corresponding user in 'users' by id.
     */

    useEffect(() => {
        if(isNaN(user)){
            return navigate('/not-found')
        }
        if(users){
            let present = false;
            for(let u of users){
                if(u.id == user){
                    present = u
                }
            }
            if(present !== false){
                setSpecificUser(present);
                setIsLoading(false);
            } else {
                return navigate('/not-found');
            }
        }
    }, [users]);

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    const {firstName, lastName, email, state} = specificUser;
    
    return (
        <div className="user-page-container">
            <div className="user-information-container">
                <div className="user-name-container">
                    <h1>{firstName} {lastName}</h1>
                </div>
                <div className="user-email-container">
                    <label htmlFor="email">Email:</label>
                    <h2 id="email">{email}</h2>
                </div>
                <div className="user-state-container">
                    <label htmlFor="state">Status:</label>
                    <h2 id="state">{state === 'pending' ? 'Pending' : 'Active'}</h2>
                </div>
            </div>
        </div>
    )
}

export default User;