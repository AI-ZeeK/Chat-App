import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthAPI } from "../api/appService";

export interface CounterState {
	// hamburgerToggle: boolean;
	form: any;
	data: string;
	loading: boolean;
	isSignUp: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	responseData: any;
	messages: any;
	createType: any;
	isCreating: boolean;
	isEditing: boolean;
	giphyState: boolean;
}

export const AuthAPIRoute = createAsyncThunk(
	"/auth",
	async ([SignUpDeclare, routeData]: any[], thunkAPI) => {
		try {
			console.log(SignUpDeclare, routeData);
			return await AuthAPI(SignUpDeclare, routeData);
		} catch (error: any) {
			console.log("rrr");
			console.log(SignUpDeclare, routeData);
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

const initialState: CounterState = {
	form: {
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		phoneNumber: "",
		avatarURL: "",
	},
	loading: false,
	data: "",
	isSignUp: false,
	isLoading: false,
	isSuccess: false,
	responseData: [],
	messages: "",
	createType: "",
	isCreating: false,
	isEditing: false,
	giphyState: false,
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setData: (state, { payload }) => {
			state.data = payload;
		},
		setLoading: (state) => {
			state.loading = true;
		},
		setIsSignUp: (state) => {
			state.isSignUp = !state.isSignUp;
		},
		setForm: (state, { payload }) => {
			state.form = payload;
		},
		setIsEditing: (state, { payload }) => {
			state.isEditing = payload;
		},
		setGiphyState: (state) => {
			state.giphyState = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(AuthAPIRoute.pending, (state) => {
				// state.isLoading = true;
			})
			.addCase(AuthAPIRoute.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.responseData = [...state.responseData, action.payload];
				// console.log(action.payload, "addcase area");
			})
			.addCase(AuthAPIRoute.rejected, (state, action) => {
				// state.isLoading = false;
				// state.isError = true;
				state.messages = action.payload;
				console.log(state.messages);
			});
	},
});

// Action creators are generated for each case reducer function
export const {
	setData,
	setLoading,
	setIsSignUp,
	setForm,
	setGiphyState,
	setIsEditing,
} = appSlice.actions;

export default appSlice.reducer;
