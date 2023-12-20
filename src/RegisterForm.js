import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

/** A component that renders a registration form. Upon successful form submission, a new user should be created on the backend and both the
 *  state and localStorage 'usersInfo' items should be updated accordingly.
*/

const RegisterForm = ({ addUser }) => {

    /** The form data should be empty upon initial render. */
    
    const initialState = {
        email: "",
        firstName: "",
        lastName: ""
    }

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);

    /** Updates the 'formData' state based on changes made to form. */
    
    const handleChange = e => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    }

    /** Handles the form submission process. If any empty form data is submitted, an alert pops up telling the user
     *  to provide information for all fields in the form. Otherwise, the form data is submitted to the 'addUser' function
     *  from props which does the following: adds a new user to the Yodlr API backend, updates the 'usersInfo' state to include
     *  the new user and updates the 'usersInfo' item in local storage to include the new user. Afterwards, the user is redirected
     *  back to the home page.
     */

    const handleSubmit = e => {
        e.preventDefault();
        const {email, firstName, lastName} = formData;
        if(!email || !firstName || !lastName){
            alert('Please provide information on all fields.');
            return
        }
        addUser(formData);
        return navigate('/');
    }

    return (
        <div className="register-page-container">
            <div className="register-general-container">
                <h2 className="register-title">Register New User</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="register-email">
                        <label className="register-label" htmlFor="email">Email Address</label>
                        <input type="text" className="register-input" id="email" name="email" value={formData.email} onChange={handleChange}></input>
                    </div>
                    <div className="register-first-name">
                        <label className="register-label" htmlFor="firstName">First Name</label>
                        <input type="text" className="register-input" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}></input>
                    </div>
                    <div className="register-last-name">
                        <label className="register-label" htmlFor="lastName">Last Name</label>
                        <input type="text" className="register-input" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}></input>
                    </div>
                    <button className="register-submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;