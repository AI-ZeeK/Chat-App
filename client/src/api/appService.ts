import axios from "axios";

const API = axios.create({ baseURL: `http://localhost:5000/auth` });

const URL = "/";

export const AuthAPI = async (SignUpDeclare: any, RouteData: any) => {
	const { data } = await API.post(`/${SignUpDeclare}`, {
		...RouteData,
	});

	console.log(data, "new routes");

	return data;
};
