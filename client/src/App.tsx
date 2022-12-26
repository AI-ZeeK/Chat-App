import { useEffect, useState } from "react";
import "./App.scss";
import "stream-chat-react/dist/css/index.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import {
	ChannelListContainer,
	ChannelContainer,
	Auth,
} from "./components/Index";
const cookies = new Cookies();

const apiKey = "4d5hkue3bpwf";

const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
	client.connectUser(
		{
			id: cookies.get("userId"),
			name: cookies.get("username"),
			fullName: cookies.get("fullName"),
			image: cookies.get("avatarURL"),
			hashedPassword: cookies.get("hashedPassword"),
			phoneNumber: cookies.get("phoneNumber"),
		},
		authToken
	);
}

function App() {
	const navigate = useNavigate();
	useEffect(() => {
		if (authToken) {
			return navigate("/auth");
		}
	}, []);
	// if (!authToken) return <Auth />;
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={!authToken ? <Auth /> : <Navigate to="/auth" />}
				/>
				<Route
					path="/auth"
					element={
						authToken ? (
							<div className="text-white bg-emerald-900 app__wrapper">
								<Chat client={client} theme="team light">
									<ChannelListContainer />
									<ChannelContainer />
								</Chat>
							</div>
						) : (
							<Navigate to="/" />
						)
					}
				/>
			</Routes>
		</>
	);
}

export default App;
