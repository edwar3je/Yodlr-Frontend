import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Api from './api';
import NavBar from './NavBar';
import Home from './Home';
import RegisterForm from './RegisterForm';
import Users from './Users';
import User from './User';
import NotFound from './NotFound';
import './App.css';

const App = () => {

  /** User information should initially be empty. */

  const initialState = '';

  const [usersInfo, setUsersInfo] = useState(initialState);

  const updateInfo = (information) => {
    setUsersInfo(information);
    localStorage.setItem('usersInfo', JSON.stringify(information));
  }

  /** Uses the 'getUsers' method from the Api class to gather information on all existing users, updates 
  *  the state of 'usersInfo' to what is returned and sets 'usersInfo' in local storage to what is returned.
  */

  const getAllUserInformation = async () => {
    const information = await Api.getUsers();
    updateInfo(information);
  }

  /** Uses the 'addUser' method from the Api class to add a new user on the backend, update
   *  the state of 'usersInfo' and set 'usersInfo' in local storage to the information returned. 
   */

  const addNewUser = async (formData) => {
    const updatedUsers = await Api.addUser(formData);
    updateInfo(updatedUsers);
  }

  /** Uses the 'updateStatus' method from the Api class to update the status of a user from 'pending'
   *  to 'active', update the state of 'usersInfo' and set 'usersInfo' in local storage to the information
   *  returned.
   */

  const updateUserStatus = async (id, formData) => {
    const updatedUsers = await Api.updateStatus(id, formData);
    updateInfo(updatedUsers);
  }

  /** Uses the 'deleteUser' method from the Api class to delete a specific user on the backend, update the state 
   *  of 'usersInfo' and set 'usersInfo' in local storage to the inforamtion returned.
   */

  const deleteUser = async (id) => {
    const updatedUsers = await Api.deleteUser(id);
    updateInfo(updatedUsers);
  }

  /** Upon initial render, the state of 'usersInfo' (along with the 'usersInfo' item in local storage) will be set to 
   *  what is returned by the 'getAllUserInformation' function.
  */

  useEffect(() => {
    if(localStorage.getItem('usersInfo') === null){
      setUsersInfo(localStorage.getItem('usersInfo'))
    }
    else {
      getAllUserInformation();
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <main>
          <Routes>
            <Route exact="true" path="/" element={<Home/>}/>
            <Route exact="true" path="/register" element={<RegisterForm addUser={addNewUser}/>}/>
            <Route exact="true" path="/users" element={<Users users={usersInfo}/>}/>
            <Route path="/users/:user" element={<User users={usersInfo}/>}/>
            <Route path="/admin" element={<Users users={usersInfo} updateUser={updateUserStatus} deleteUser={deleteUser} admin={true}/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;