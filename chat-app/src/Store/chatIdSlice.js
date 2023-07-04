import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, getFirestore } from "firebase/firestore";



// const initialState = "";




export const setID = createAsyncThunk('setID', async ({ cUserId, oUserId }) => {
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
    else {

        return null;
    }
});






const chatIdSlice = createSlice({
    name: 'chatId',

    initialState: {
        ID: null
    },
    reducers: {

        setChatId(state, action) {
            state.chatId = (action.payload);
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
            })
            .addCase(setID.fulfilled, (state, action) => {
                state.ID = (action.payload);

            })
            .addCase(setID.rejected, (state) => {
                console.log("Rejected");
            })



    }
});


export const { setChatId, removeChatId } = chatIdSlice.actions;
export default chatIdSlice.reducer;




