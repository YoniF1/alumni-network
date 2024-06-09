import { useCallback } from "react"
import { useAppSelector, useAppDispatch } from '../../app/store.ts'
import { addPostToCohort, cohortIdState, fetchCohortOfUser, fetchCohortPosts, postState } from "./slice.ts"
import { PostAndUserDetails } from "../../types/consts.ts"

export const usePosts = () => {
    return useAppSelector(postState)
}

export const useCohortId = () => {
    return useAppSelector(cohortIdState)
}

export const useAddPostToCohort = () => {
    const dispatch = useAppDispatch();
    return useCallback(
      async ({ cohortId, post }: { cohortId: number; post: PostAndUserDetails }) => {
        await dispatch(addPostToCohort({ cohortId, post }))
        dispatch(fetchCohortPosts(cohortId))
      },
      [dispatch]
    )
  }

export const useFetchCohortFromUser = () => {
    const dispatch = useAppDispatch()
    return useCallback((id: number) => {
        dispatch(fetchCohortOfUser(id))
    }, [dispatch])
}

export const useFetchCohortPosts = () => {
    const dispatch = useAppDispatch()
    return useCallback((cohort_id: number) => {
        dispatch(fetchCohortPosts(cohort_id))
    }, [dispatch])
}