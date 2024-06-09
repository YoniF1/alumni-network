import { configureStore, combineReducers} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userDetailsReducer from "../components/userDetails/slice"
import adminReducer from "../components/admin/slice"
import postReducer from "../components/posts/slice"


const combineReducersApp = combineReducers({userDetailsReducer, adminReducer, postReducer})

const store = configureStore({
    reducer: combineReducersApp
})

export type StoreStateType = ReturnType<typeof store.getState>
export type StoreDispatchType = typeof store.dispatch


export const useAppDispatch: () => StoreDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StoreStateType> = useSelector

export default store