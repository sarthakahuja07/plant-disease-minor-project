import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name: "file",
    initialState: {
        file: null,
        loading: false,
        error: null,
    },

    reducers: {
        uploadStart: (state, action) => {
            state.loading = true;
        },
        uploadSuccess: (state, action) => {
            state.loading = false;
            state.file = action.payload;
            state.error = null;
        },
        uploadFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { uploadStart, uploadSuccess, uploadFailure } = fileSlice.actions;
export default fileSlice.reducer;


export const uploadThunk = (file) => async (dispatch) => {
    dispatch(uploadStart());
    if (file) {
        dispatch(uploadSuccess(file));
    }
}


