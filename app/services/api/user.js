import axios from "axios";

export default {
	login(username, password) {
		return axios.post("/api/user/login", {
			username: username,
			password: password
		});
	},
	getSession(){
		return axios.get("/api/user/session");
	},
	logout(){
		return axios.get("/api/user/logout");
	}
}

