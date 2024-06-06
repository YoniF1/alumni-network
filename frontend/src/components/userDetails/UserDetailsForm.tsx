import Cohort from "./Cohort"
import './UserDetailsForm.css'
import { useSetStep, useStep } from "./hooks"
import Biography from "./Biography.tsx"
import { useEffect, useContext, } from "react"
import { AuthContext } from "../../App.tsx"
import axios from 'axios'

const COHORT=1
const BIOGRAPHY=2
const FINISHED_FORM=3

const UserDetailsForm = () => {
  const stepHook = useStep() 
  const setStepHook = useSetStep()
  const { user } = useContext(AuthContext)

  const fetchStepfromUser = async () => {
    try {
        const response = await axios.get(import.meta.env.BACKEND_URL + `/users/${user?.id}`);
        setStepHook(response.data.step)
    } catch (error) {
        console.log('Failed to fetch step', error)
    }
  }

  useEffect(() => {
    fetchStepfromUser()
  }, []);

  
//   if (status==="loading") return <h2>Loading....</h2>

//   if (status==="failed")
//       return <h2>Something went wrong....</h2>

  return (
    <div className="container">
        { stepHook === COHORT  &&
            <Cohort/>
        }
        { stepHook === BIOGRAPHY &&
            <Biography />
        }
        { stepHook === FINISHED_FORM && user?.isadmin &&
            // <Admin /> 
            <h2> admin component</h2>
        }
        { stepHook === FINISHED_FORM &&
            <h2>Form completed</h2>
        }
    </div>
  )
}

export default UserDetailsForm