import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { setLoading } from "./loadingSlice";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAllUsers } from "./ulistSlice";







// signin with google middleware
export const signInWithGoogle = createAsyncThunk(
    'signInWithGoogle',
    async (_, { dispatch }) => {

        dispatch(setLoading(30));

        const auth = getAuth();
        dispatch(setLoading(50));

        const provider = new GoogleAuthProvider();
        dispatch(setLoading(70));

        const result = await signInWithPopup(auth, provider);
        dispatch(setLoading(95));

        const { user } = result;
        dispatch(setLoading(100));
        // setPersistence(auth, browserLocalPersistence)
        //     .then(() => {
        // console.log('Persistence type set successfully.');
        //     })
        //     .catch((error) => {
        //         console.log('Error setting persistence type:', error);
        //     });

        return user;
    }
);

// signout with google middleware
export const signOutWithGoogle = createAsyncThunk(
    'signOutWithGoogle',
    async (_, { dispatch }) => {

        dispatch(setLoading(50));

        const auth = getAuth();
        dispatch(setLoading(80));

        const result = await signOut(auth);
        dispatch(setLoading(100));

        return result;
    }
);



// if user already loggedIn the firebase then set the credentials to state, middleware
export const setUser = createAsyncThunk(
    'setUser',
    async (_, { dispatch }) => {
        dispatch(setLoading(50));
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {

            if (user) {

                dispatch(setLoading(90));

                dispatch(signIn(user));

                dispatch(setLoading(100));

                console.log('User is signed in:');

            } else {
                dispatch(setLoading(100));

                // User is signed out
                dispatch(clearUser(user));
                console.log('User is signed out');
            }
        });
    });


// whether the user exist or not
export const existOrAdd = createAsyncThunk(
    'existOrAdd',

    async ({ collectionName, documentId, documentData }, {dispatch, rejectWithValue }) => {
        try {
            const documentExists = await checkIfDocumentExists(collectionName, documentId);

            if (documentExists) {
                console.log('Document already exists');
            }
             else {
        
                await addDocumentToCollection(collectionName, documentId, documentData);
        
                console.log('Document added successfully');
                dispatch(getAllUsers());
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }



    }


);





const userSlice = createSlice({

    name: 'user',

    initialState: {
        user: null,
        loading: false,
        error: null,
    },

    reducers: {
        signIn: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;

        },
        clearUser: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder

            // if user is already loggedin to set their credentials in initialState
            .addCase(setUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //signIn from google with thunk
            .addCase(signInWithGoogle.pending, (state) => {
                state.loading = true;
            })
            .addCase(signInWithGoogle.fulfilled, (state, action) => {

                state.user = action.payload
                state.loading = false;
                state.error = null;
            })
            .addCase(signInWithGoogle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //signOut from google with thunk
            .addCase(signOutWithGoogle.pending, (state) => {
                state.loading = true;
            })
            .addCase(signOutWithGoogle.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false;
                state.error = null;
            })
            .addCase(signOutWithGoogle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;     
            })

            // check user is exist or not
            .addCase(existOrAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(existOrAdd.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(existOrAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});





// check whether the data of user is already exists in the collection
const checkIfDocumentExists = async (collectionName, documentId) => {
    const documentRef = doc(getFirestore(), collectionName, documentId);
    const documentSnapshot = await getDoc(documentRef);
    return documentSnapshot.exists();
};

// if user doesn't exist then add the credentials to the collection
const addDocumentToCollection = async (collectionName, documentId, documentData) => {
    await setDoc(doc(getFirestore(), collectionName, documentId), documentData);
};



export const { signIn, clearUser } = userSlice.actions;


export const checkUserLoggedIn = () => (dispatch) => {
    // Check if the user is already signed in with Firebase
    const user = getAuth().currentUser;

    if (user) {
        console.log("loggedIn");
    }
    else {
        dispatch(setUser(user));
    }
};



export const userSelector = (state) => state.user.user;

export default userSlice.reducer;
