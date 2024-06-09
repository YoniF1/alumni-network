import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { StoreStateType } from '../../app/store'
import axios from 'axios'
import { PostAndUserDetails } from '../../types/consts'

export type InitialStateType = {
    posts: PostAndUserDetails[]
    cohortId: number | null 
}

const initialState: InitialStateType = {
    posts: [],
    cohortId: null
}

export const addPostToCohort = createAsyncThunk(
    'posts/addPostToCohort',
    async ({ cohortId, post }: { cohortId: number; post: PostAndUserDetails }) => {
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + `/cohorts/${cohortId}/post`, post)
        return response.data;
    }
)

export const fetchCohortPosts = createAsyncThunk(
    'posts/fetchCohortPosts',
    async (cohortId: number) => {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/cohorts/${cohortId}/posts`)
        return response.data as PostAndUserDetails[]
    }
);

export const fetchCohortOfUser = createAsyncThunk(
    'posts/fetchCohortOfUser',
    async(id: number) => {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/users/${id}`)
        return response.data.cohort_id
    }
)

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(addPostToCohort.fulfilled, (state, action: PayloadAction<PostAndUserDetails>) => {
            state.posts.unshift(action.payload)
        })
        .addCase(fetchCohortPosts.fulfilled, (state, action: PayloadAction<PostAndUserDetails[]>) => {
            state.posts = action.payload;
        })
        .addCase(fetchCohortOfUser.fulfilled, (state, action: PayloadAction<number>) => {
            state.cohortId = action.payload;
        })
    }
})

export const postState = (state: StoreStateType) => state.postReducer.posts
export const cohortIdState = (state: StoreStateType) => state.postReducer.cohortId;

export const {} = postSlice.actions

export default postSlice.reducer
