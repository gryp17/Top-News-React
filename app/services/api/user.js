import axios from "axios";

export default {
	/**
	 * Logs in the user with the provided credentials
	 * @param {String} username
	 * @param {String} password
	 * @param {Boolean} rememberMe
	 * @returns {Promise}
	 */
	login(username, password, rememberMe) {
		return axios.post("/api/user/login", {
			username: username,
			password: password,
			rememberMe: rememberMe
		});
	},
	/**
	 * Returns the current user session
	 * @returns {Promise}
	 */
	getSession(){
		return axios.get("/api/user/session");
	},
	/**
	 * Logs out the user
	 * @returns {Promise}
	 */
	logout(){
		return axios.get("/api/user/logout");
	}
}

