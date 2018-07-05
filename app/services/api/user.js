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
	 * Signs up and logs in the user
	 * @param {String} username
	 * @param {String} email
	 * @param {String} password
	 * @param {String} repeatPassword
	 * @returns {Promise}
	 */
	signUp(username, email, password, repeatPassword) {
		return axios.post("/api/user", {
			username: username,
			email: email,
			password: password,
			repeatPassword: repeatPassword
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

