import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from '../../app/store.ts'
import { findUnverifiedCohortRequests } from "./slice.ts";

export const useCohortUserDetails = () => {
    const { cohortUserDetails } = useAppSelector((state) => state.adminReducer);
    return cohortUserDetails;
  };

export const useFetchCohortUserDetails = () => {
    const dispatch = useAppDispatch();
    return useCallback(() => {
        dispatch(findUnverifiedCohortRequests());
        }, [dispatch]
    )
}

