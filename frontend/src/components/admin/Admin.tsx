import { useCohortUserDetails, useFetchCohortUserDetails } from "./hooks"
import { useContext, useEffect } from "react"
import Table from "./Table"
import './Admin.css'
import { AuthContext } from "../../App"
import ProfilePicture from "../ProfilePicture"

const Admin = () => {
  const cohortUserDetails = useCohortUserDetails()
  const fetchCohortUserDetails = useFetchCohortUserDetails()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetchCohortUserDetails();
  }, []); 

  return (
      <>
          <h2>Check the cohort requests {user?.first_name} {user?.last_name}</h2>
          <ProfilePicture/>
          <div className='container1'>
            <Table cohortUserDetails={cohortUserDetails} />
          </div>
      </>
 
  )
}

export default Admin