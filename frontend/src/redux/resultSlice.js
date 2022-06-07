import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const resultSlice = createSlice({
	name: "result",
	initialState: {
		isGenerated: false,
		result: null,
		loading: false,
		error: null
	},

	reducers: {
		generateStart: (state, action) => {
			state.loading = true;
		},
		generateSuccess: (state, action) => {
			state.loading = false;
			state.isGenerated = true;
			state.result = action.payload;
			state.error = null;
		},
		generateFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.isGenerated = false;
			state.result = null;
		}
	}
});

export const { generateStart, generateSuccess, generateFailure } =
	resultSlice.actions;
export default resultSlice.reducer;

export const generateThunk = (file) => async (dispatch) => {
	dispatch(generateStart());
	try {
		console.log(file);
		const response = await axios.post("http://127.0.0.1:5000/submit", {
			files: JSON.stringify(file)
			// files: file
		});
		console.log(response);
		const data = "hello";
		dispatch(generateSuccess(data));
	} catch (err) {
		dispatch(generateFailure(err));
	}
};
