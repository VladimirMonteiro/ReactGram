import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";




const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null

}


// Funçoes

// get user details
export const profile = createAsyncThunk("user/profile",
async(user, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token

    const data = await userService.profile(user, token)

   

    return data
})


// Update user details

export const updateProfile = createAsyncThunk("user/editProfile",
async(user, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token

    const data = await userService.updateProfile(user, token)

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
})


// Get user details by id

export const getUserDetails = createAsyncThunk("user/getDetails",
async(id, thunkAPI) => {



    const data = await userService.getUserDetails(id)
 

    return data
})


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(profile.pending, (state)=> {
            state.loading = true
            state.error = false
        }).addCase(profile.fulfilled, (state, action) => {
            state.user = action.payload
            state.error = false
            state.success = true
            state.loading = false
        }).addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
            state.message = "Usuário atualizado com sucesso!";
          })
          .addCase(updateProfile.rejected, (state, action) => {
            console.log(state, action)
            state.loading = false;
            state.error = action.payload;
            state.user = null;
          }).addCase(getUserDetails.pending, (state)=> {
            state.loading = true,
            state.error = null
          }).addCase(getUserDetails.fulfilled, (state, action)=> {
            state.loading = false
            state.error = null
            state.success = true
            state.user = action.payload
          })
    }
})


export const {resetMessage} = userSlice.actions
export default userSlice.reducer
