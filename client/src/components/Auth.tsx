import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";

import { CiLogin } from "react-icons/ci";
import { useState } from "react";
import myImage from "../assets/water.jpg";
import { useSelector, useDispatch } from "react-redux";
import { AuthAPIRoute, setForm, setIsSignUp } from "../Features/AppSlice";
import { useNavigate } from "react-router-dom";
type Props = {};
const cookies = new Cookies();

const Auth = (props: Props) => {
	const { isSignUp, form, responseData } = useSelector(
		(store: any) => store.app
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const switchMode = () => {
		dispatch(setIsSignUp());
	};

	const handleChange = (e: any) => {
		dispatch(setForm({ ...form, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const signUpDeclare: string = isSignUp ? "signup" : "signin";
		const { fullName, username, password, phoneNumber, avatarURL } = form;

		// const {
		// 	data: { token, userId, hashedPassword },
		// }: any = await axios.post(`${URL}/${signUpDeclare}`, {
		// 	fullName,
		// 	username,
		// 	password,
		// 	phoneNumber,
		// 	avatarURL,
		// });
		// console.log(signUpDeclare);

		const { token, userId, hashedPassword } = responseData;

		dispatch<any>(AuthAPIRoute([signUpDeclare, form]));

		cookies.set("token", token);
		cookies.set("username", username);
		cookies.set("fullName", fullName);
		cookies.set("userId", userId);

		if (isSignUp) {
			cookies.set("phoneNumber", phoneNumber);
			cookies.set("avatarURL", avatarURL);
			cookies.set("hashedPassword", hashedPassword);
		}

		navigate("/auth");

		// window.location.reload();
	};
	return (
		<div className="auth__form-container ">
			<div className="auth__form-container_fields bg-emerald-900 ">
				<div className="auth__form-container_fields bg-emerald-800">
					<div className="auth__form-container_fields-content my-grad-pos grad-bg">
						<p className="my-text-dark">{isSignUp ? "Sign Up" : "Sign In"}</p>
						<form action="" onSubmit={handleSubmit}>
							{isSignUp && (
								<div className="auth__form-container_fields-content_input">
									<label htmlFor="fullName">Full Name</label>
									<input
										type="text"
										name="fullName"
										placeholder="Full Name"
										onChange={handleChange}
										required
									/>
								</div>
							)}
							<div className="auth__form-container_fields-content_input">
								<label htmlFor="username">User Name</label>
								<input
									type="text"
									name="username"
									placeholder="Username"
									onChange={handleChange}
									required
								/>
							</div>
							{isSignUp && (
								<div className="auth__form-container_fields-content_input">
									<label htmlFor="phoneNumber">Phone Number</label>
									<input
										type="tel"
										name="phoneNumber"
										placeholder="Phone Number"
										onChange={handleChange}
										required
									/>
								</div>
							)}
							{isSignUp && (
								<div className="auth__form-container_fields-content_input">
									<label htmlFor="avatarURL">Avatar URL</label>
									<input
										type="text"
										name="avatarURL"
										placeholder="Avatar URL"
										onChange={handleChange}
										required
									/>
								</div>
							)}
							<div className="auth__form-container_fields-content_input">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									name="password"
									placeholder="Password"
									onChange={handleChange}
									required
								/>
							</div>
							<div className="auth__form-container_fields-content_input">
								<label htmlFor="confirmpassword">Confirm Password</label>
								<input
									type="password"
									name="confirmPassword"
									placeholder="Confirm Password"
									onChange={handleChange}
									required
								/>
							</div>
							<div className="auth__form-container_fields-content_button">
								<button>{isSignUp ? "Sign Up" : "Sign In"}</button>
							</div>
						</form>
						<div className="auth__form-container_fields-account">
							<p>
								{isSignUp ? "Already have an account" : "Don't have an account"}
								?{" "}
								<span onClick={switchMode}>
									{isSignUp ? "Sign In " : "Sign Up"}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="auth__form-container_image ">
				{/* <CiLogin />  */}
				<div className="my-bg-image-box">
					<img src={myImage} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Auth;
