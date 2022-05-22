import { createSlice } from "@reduxjs/toolkit";

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


export const generateThunk = () => async (dispatch) => {
	dispatch(generateStart());
	try {
		// const { data } = await Api.getCategories(appliances);
        const data = "hello"
        dispatch(generateSuccess(data));
	} catch (err) {
        dispatch(generateFailure(err));
	}
};
