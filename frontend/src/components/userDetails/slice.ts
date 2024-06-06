import { createSlice, PayloadAction, createAsyncThunk, Store  } from '@reduxjs/toolkit'
import { StoreStateType } from '../../app/store'
import axios from 'axios'
// nanoid,

interface UserDetails {
    cohort: string | null
    biography: string
    profilePictureUrl: string | null
    step: number
}

export type InitialStateType = {
    userdetails: UserDetails,
    status: string,
}

const initialState: InitialStateType = {
    status: '',
    userdetails: {
        cohort: null,
        biography: '',
        profilePictureUrl: null,
        step: 1,
    },
}

export const updateUserCohort = createAsyncThunk(
    'userdetails/updateUserCohort',
    async ({ id }: { id: number }, { getState }) => {
        const state = getState() as StoreStateType;
        const userDetails = {
            cohort: state.userDetailsReducer.userdetails.cohort,
            step: state.userDetailsReducer.userdetails.step
        };
      const response = await axios.put(
        `http://localhost:3000/users/${id}`,
        userDetails
      );
      return response.data;
    }
  );

export const updateUserProfilePicAndBiography = createAsyncThunk(
    'userdetails/updateUserProfilePicAndBiography',
    async ({ id, profilePictureUrl, biography, step }: { id: number, profilePictureUrl: string | null, biography: string, step: number }) => {
        const userDetails = {
            profilePictureUrl,
            biography,
            step
        };

        const response = await axios.put(`http://localhost:3000/users/${id}`, userDetails);
        return response.data;
    }
);

const userDetailsSlice = createSlice({
    name: 'userdetails',
    initialState,
    reducers: {
        addCohort: (state, action: PayloadAction<string>) => {
            state.userdetails.cohort = action.payload
        },
        addBiography: (state, action: PayloadAction<string>) => {
            state.userdetails.biography = action.payload
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.userdetails.step = action.payload;
        },
        setProfilePicture: (state, action: PayloadAction<string>) => {
            state.userdetails.profilePictureUrl = action.payload
        },
    },
    extraReducers(builder) {
        builder
        .addCase(updateUserCohort.fulfilled, (state, action: PayloadAction<UserDetails>) => {
            state.userdetails = action.payload
            state.userdetails.step = 2
            state.status = 'succeeded'
        })
        .addCase(updateUserCohort.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(updateUserCohort.rejected, (state) => {
            state.status = 'failed'
        })
        .addCase(updateUserProfilePicAndBiography.fulfilled, (state, action: PayloadAction<UserDetails>) => {
            state.userdetails = {
                ...state.userdetails,
                ...action.payload,
                step: 3
            };
            state.status = 'succeeded';
        })
        
        .addCase(updateUserProfilePicAndBiography.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(updateUserProfilePicAndBiography.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export const userDetailsState = (state: StoreStateType) => state.userDetailsReducer.userdetails;

export const { addCohort, addBiography, setStep, setProfilePicture } = userDetailsSlice.actions

export default userDetailsSlice.reducer
