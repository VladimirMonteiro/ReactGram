import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authServices from '../services/authService'


const user = JSON.parse(localStorage.getItem("user"))



const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false
}


// Register an user and sign in

export const register = createAsyncThunk("auth/register",
async (user, thunkAPI) => {

    const data = await authServices.register(user)

    // Check for errors 
    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])

    }

    return data

})

// Logout a user

export const logout = createAsyncThunk("auth/logout",
async ()=> { await  authServices.logout()})



// Sign in a user
export const login = createAsyncThunk("auth/login",
async(user, thunkAPI) => {

    const data = await authServices.login(user)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})







export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = false
            state.success = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload
        }).addCase(register.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload
            state.user = null
        }).addCase(logout.fulfilled, (state) => {
            state.loading = false,
            state.error = null,
            state.success = true,
            state.user = null
        }).addCase(login.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success = true
            state.user = action.payload
        }).addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
        })
    }
})


export const {reset} = authSlice.actions
export default authSlice.reducer