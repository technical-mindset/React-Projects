import { createSlice } from "@reduxjs/toolkit";





const loadingSlice = createSlice({

    name: 'loading',

    initialState: {
        loading: 0
    },

    reducers: {

        setLoading:(state, action) => {
            state.loading = action.payload
        }
    }

});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;