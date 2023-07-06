import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, getFirestore } from "firebase/firestore";



// const initialState = "";




export const setID = createAsyncThunk('setID', async ({ cUserId, oUserId }, {rejectWithValue}) => {
    const firestore = getFirestore();
    const UID1 = `${cUserId + oUserId}`;
    const UID2 = `${oUserId + cUserId}`;
    const chatroomRef1 = doc(firestore, 'chatroom', UID1);
    const chatroomRef2 = doc(firestore, 'chatroom', UID2);
    const chatSnapshot1 = await getDoc(chatroomRef1);
    const chatSnapshot2 = await getDoc(chatroomRef2);


    if (chatSnapshot1.exists()) {

        return UID1;
    }
    else if (chatSnapshot2.exists()) {

        return UID2;
    }
    else if (!chatSnapshot2.exists()) {

        return rejectWithValue('Failed to fetch data');
    
    }
    else if (!chatSnapshot1.exists()) {

        return rejectWithValue('Failed to fetch data');
    
    }
});






const chatIdSlice = createSlice({
    name: 'chatId',

    initialState: {
        ID: null,
        loading: false,
    },
    reducers: {

        setChatId(state, action) {
            state.ID = (action.payload);
        },

        removeChatId: (state) => {    
            state.ID = null;
        }
    },
    extraReducers: (builder) => {
        builder
            //         .addCase(sendMessage.pending, (state) => {
            //             console.log(state);
            //         })
            //         .addCase(sendMessage.fulfilled, (state, action) => {
            //             // state.push(action.payload);
            //             state = [...state, action.payload];
            //         })
            //         .addCase(sendMessage.rejected, (state) => {
            //             console.log(state);
            //         })
            .addCase(setID.pending, (state) => {
                console.log("Pending");
                state.loading = true;
            })
            .addCase(setID.fulfilled, (state, action) => {
                state.ID = (action.payload);
                state.loading = false;
            })
            .addCase(setID.rejected, (state) => {
                console.log("Rejected");
                state.loading = false;

            })



    }
});


export const { setChatId, removeChatId } = chatIdSlice.actions;
export default chatIdSlice.reducer;




