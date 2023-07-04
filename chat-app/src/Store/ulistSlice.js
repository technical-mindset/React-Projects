import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";



export const getAllUsers = createAsyncThunk('getAllUsers',
    async (_, { dispatch, rejectWithValue }) => {


        try {
            const db = getFirestore();
            const myCollectionRef = collection(db, 'users');
            const querySnapshot = await getDocs(myCollectionRef);
            
            const documents = querySnapshot.docs
            // filter the data for not showing the loggedin user's data to chat itself
            .filter((doc) => doc.data().uid !== getAuth().currentUser.uid)
            .map((doc) => doc.data());
            
            

            return documents;
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }

);




const ulistSlice = createSlice({

    name: 'ulist',

    initialState: {
        users: [],
        loading: false,
        error: null
    },
    reducers: { },

    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state,action) => {
                state.users = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.loading = false;
                state.error = null;
            })

    }

});
export const {setUser} = ulistSlice.actions;

export default ulistSlice.reducer;