import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getFirestore, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { setLoading } from "./loadingSlice";
import { useSelector } from "react-redux";



export const getMessage = createAsyncThunk(
    'getMessage',
    async (chatID, { dispatch }) => {
        dispatch(setLoading(50));
        const chatroomID = chatID;
        const chatroomRef = doc(getFirestore(), 'chatroom', chatroomID);
        const chatListRef = collection(chatroomRef, 'chatList');
        const queryRef = query(chatListRef, orderBy('time'));
        dispatch(setLoading(70));

        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (!snapshot.metadata.hasPendingWrites){
                if (change.type === 'added') {
                    
                    const message = change.doc.data();
                    dispatch(add(message))
                }
            }
            });
        });
        dispatch(setLoading(100));
        return unsubscribe;

    });




const initialState = [];

const chatSlice = createSlice({
    name: 'chat',

    initialState,

    reducers: {

        add(state, action) {

            state.push(action.payload);

        },
        remove(state) {
            state.splice(0, state.length);
        }
    }
});

export const { add, remove } = chatSlice.actions;
export default chatSlice.reducer;