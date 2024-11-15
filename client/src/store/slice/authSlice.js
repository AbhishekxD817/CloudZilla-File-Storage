import { createSlice } from '@reduxjs/toolkit'
import { authWithGoogle, login, logout, signup } from '../actions/authActions';

const initialState = {
    loading: false,
    error: null,
    status: JSON.parse(localStorage.getItem('status')) ? JSON.parse(localStorage.getItem('status')) : false,
    data: JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : null
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        set: (state, action) => {
            state.loading = false
            state.error = null
            state.status = true
            state.data = action.payload
        },
        reset: (state, action) => {
            state.loading = false
            state.error = null
            state.status = false
            state.data = null
        }
    },
    extraReducers: (builder) => {

        // google
        builder.addCase(authWithGoogle.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.status = false;
            state.data = null;
        })
        builder.addCase(authWithGoogle.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            state.status = false;
            state.data = null;
        })
        builder.addCase(authWithGoogle.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;


            state.status = true;
            state.data = action.payload.user;

            // set in localStorage
            localStorage.setItem("status", true);
            localStorage.setItem("data", JSON.stringify(action.payload.user));

        })

        // signup
        builder.addCase(signup.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.status = false;
            state.data = null;
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            state.status = false;
            state.data = null;
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.status = true;
            state.data = action.payload.user;

            // set in localStorage
            localStorage.setItem("status", true);
            localStorage.setItem("data", JSON.stringify(action.payload.user));
        })

        // login
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.status = false;
            state.data = null;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            state.status = false;
            state.data = null;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.status = true;
            state.data = action.payload.user;

            // set in localStorage
            localStorage.setItem("status", true);
            localStorage.setItem("data", JSON.stringify(action.payload.user));
        })

        // logout
        builder.addCase(logout.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.status = false;
            state.data = null;

            // set in localStorage
            localStorage.removeItem('status')
            localStorage.removeItem('data');
        })
    }
})

export const { set, reset } = authSlice.actions;

export default authSlice.reducer;