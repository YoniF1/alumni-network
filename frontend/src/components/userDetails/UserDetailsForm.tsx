import Cohort from "./Cohort"
import './UserDetailsForm.css'
import { useCohortVerified, useSetStep, useStep, useFindUserVerified } from "./hooks"
import Biography from "./Biography.tsx"
import { useEffect, useContext, } from "react"
import { AuthContext } from "../../App.tsx"
import axios from 'axios'
import Posts from "../posts/Posts.tsx"
import { Typography } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react'

const COHORT=1
const BIOGRAPHY=2
const FINISHED_FORM=3

const UserDetailsForm = () => {
  const stepHook = useStep() 
  const setStepHook = useSetStep()
  const { user } = useContext(AuthContext)
  const { isverified, hasCohort, cohortId } = useCohortVerified()
  const findUserVerified = useFindUserVerified()
  const [cohortName, setCohortName] = useState('')

  const fetchStepfromUser = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/users/${user?.id}`);
        setStepHook(response.data.step)
    } catch (error) {
        console.log('Failed to fetch step', error)
    }
  }

  const fetchCohortName = async () => {
    const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/cohorts/${cohortId}/name`)
    setCohortName(response.data.name)
  }

  useEffect(() => {
    fetchStepfromUser()
    if (user) {
      findUserVerified(user?.id)
    }
  }, []);

  useEffect(() => {
    if (hasCohort && isverified && cohortId) {
      fetchCohortName()
    }
  }, [hasCohort, isverified, cohortId])

  return (
    <div className="container">
        { stepHook === COHORT && !user?.isadmin &&
            <Cohort/>
        }
        { (stepHook === BIOGRAPHY || user?.isadmin && stepHook===COHORT) &&
            <Biography />
        }
        {stepHook === FINISHED_FORM && isverified && hasCohort && cohortName && (
            <Posts cohortName={cohortName} />
        )}


        { (stepHook === FINISHED_FORM && !isverified && hasCohort && !user?.isadmin &&
            <>
              <Typography variant='h2'>Waiting for admin approval</Typography>
              <CircularProgress />
            </>
            
        )}
    </div>
  )
}

export default UserDetailsForm