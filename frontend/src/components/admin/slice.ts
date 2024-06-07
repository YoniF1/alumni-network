import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { StoreStateType } from '../../app/store'
import axios from 'axios'

interface CohortUserDetails {
    cohort_name: string | null,
    id: number | null,
    first_name: string | null,
    last_name: string | null,
    email: string | null,
}

export type InitialStateType = {
    cohortUserDetails: CohortUserDetails[]
    status: string
}

const initialState: InitialStateType = {
    cohortUserDetails: [],
    status: ''
}


export const findUnverifiedCohortRequests = createAsyncThunk(
    'admin/findUnverifiedCohortRequests',
    async() => {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/cohorts/unverified')
        return response.data
    }
)

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
        .addCase(findUnverifiedCohortRequests.fulfilled, (state, action: PayloadAction<CohortUserDetails[]>) => {
            state.cohortUserDetails = action.payload
            state.status = 'succeeded'
        })
        .addCase(findUnverifiedCohortRequests.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(findUnverifiedCohortRequests.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export const adminState = (state: StoreStateType) => state.adminReducer.cohortUserDetails

export const { } = adminSlice.actions

export default adminSlice.reducer
