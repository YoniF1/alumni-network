import { useCallback } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from '../../app/store.ts'
import { addCohort, addBiography, updateUserCohort, userDetailsState, setStep, setProfilePicture, updateUserProfilePicAndBiography, findUserVerified} from "./slice.ts";


export const useStep = () => {
    return useAppSelector(createSelector([userDetailsState], (userdetails) => userdetails.step))
}

export const useBiography = () => {
    return useAppSelector(createSelector([userDetailsState], (userdetails) => userdetails.biography))

}

export const useProfilePic = () => {
    return useAppSelector(createSelector([userDetailsState], (userdetails) => userdetails.profilePictureUrl))
}

export const useCohortVerified = () => {
    return useAppSelector(
      createSelector(
        [userDetailsState],
        (userdetails) => {
          return {
            isverified: userdetails.isverified,
            hasCohort: userdetails.cohort_id !== null,
            cohortId: userdetails.cohort_id
          };
        }
      )
    );
  };

export const useFindUserVerified = () => {
    const dispatch = useAppDispatch();
    return useCallback((id: number) => {
        dispatch(findUserVerified(id));
        }, [dispatch]
    )

}


export const useSetStep = () => {
    const dispatch = useAppDispatch()
    return useCallback((step: number) => {
        dispatch(setStep(step))
    }, [dispatch]
    )
}

export const useSetProfilePicture = () => {
    const dispatch = useAppDispatch()
    return useCallback((profilePictureUrl: string) => {
        dispatch(setProfilePicture(profilePictureUrl))
    }, [dispatch]
    )
}

export const useUpdateCohort = () => {
    const dispatch = useAppDispatch();
    return useCallback((id: number) => {
        dispatch(updateUserCohort({id}));
        }, [dispatch]
    )
};

export const useUpdateUserProfilePicAndBiography = () => {
    const dispatch = useAppDispatch();

    const updateProfile = useCallback((id: number, profilePictureUrl: string, biography: string, step: number) => {
        dispatch(updateUserProfilePicAndBiography({ id, profilePictureUrl, biography, step }));
    }, [dispatch]);

    return updateProfile;
};

export const useAddCohort = () => {
    const dispatch = useAppDispatch()
    return useCallback(
        (cohort: string) => {
            dispatch(addCohort(cohort))
        }, [dispatch]
    )
}

export const useAddBiography = () => {
    const dispatch = useAppDispatch()
    return useCallback(
        (biography: string) => {
            dispatch(addBiography(biography))
        }, [dispatch]
    )
}


