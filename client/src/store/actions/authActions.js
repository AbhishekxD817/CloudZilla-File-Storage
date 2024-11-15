import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, asyncWrapper } from '../../api/api.js'

export const authWithGoogle = createAsyncThunk('authWithGoogle', async (code, { rejectWithValue }) => {
    try {
        const result = await asyncWrapper(() => api.get(`/auth/google?code=${code}`));
        return result;
    } catch (error) {
        const { message = "Something Went Wrong" } = error;
        return rejectWithValue({ message });
    }
});

export const signup = createAsyncThunk('signup', async (data, { rejectWithValue }) => {
    try {
        const result = await asyncWrapper(() => api.post('/auth/signup', data));
        return result;
    } catch (error) {
        const { message = "Something Went Wrong" } = error;
        return rejectWithValue({ message });
    }
});

export const login = createAsyncThunk('login', async (data, { rejectWithValue }) => {
    try {
        const result = await asyncWrapper(() => api.post('/auth/login', data));
        return result;
    } catch (error) {
        const { message = "Something Went Wrong" } = error;
        return rejectWithValue({ message });
    }
})

export const logout = createAsyncThunk('logout', async () => {
    try {
        const result = await asyncWrapper(() => api.post('/auth/logout'));
        return result;
    } catch (error) {
        const { message = "Something Went Wrong" } = error;
        return rejectWithValue({ message });
    }
})