import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

class Api {

    /** API Class
     * 
     *  A class that consists of static methods used to make appropriate requests
     *  to the Yodlr API backend.
     */
    
    static async getUsers() {
        /** Returns an array of objects containing information on every user from the Yodlr API backend.
         * 
        */
        const users = await axios.get(BASE_URL);
        return users.data
    }

    static async addUser(formData) {
        /** Adds a new user to the Yodlr API backend and returns an array of users from the Yodlr API backend.
         * 
        */
        const {email, firstName, lastName} = formData;
        await axios.post(BASE_URL, {
            'email': email,
            'firstName': firstName,
            'lastName': lastName
        });
        const updatedUsers = await Api.getUsers();
        return updatedUsers
    }

    static async updateStatus(id, formData) {
        /** Updates the status of a pending user to active on the Yodlr API backend and returns an array of users from the
         *  Yodlr API backend.
        */
        const {email, firstName, lastName} = formData;
        await axios.put(`${BASE_URL}/${id}`, {
            'id': id,
            'email': email,
            'firstName': firstName,
            'lastName': lastName,
            'state': 'active'
        });
        const updatedUsers = await Api.getUsers();
        return updatedUsers;
    }

    static async deleteUser(id) {
        /** Deletes a user on the Yodlr API backend and returns an array of users from the Yodlr API backend.
         * 
        */
        await axios.delete(`${BASE_URL}/${id}`);
        const updatedUsers = await Api.getUsers();
        return updatedUsers;
    }
}

export default Api