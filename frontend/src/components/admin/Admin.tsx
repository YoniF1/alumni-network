import { useCohortUserDetails, useFetchCohortUserDetails } from "./hooks"
import { useContext, useEffect } from "react"
import Table from "./Table"
import './Admin.css'
import { AuthContext } from "../../App"

const Admin = () => {
  const cohortUserDetails = useCohortUserDetails()
  const fetchCohortUserDetails = useFetchCohortUserDetails()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetchCohortUserDetails();
  }, []); 

  return (
      <>
          <h2>Welcome {user?.first_name}{user?.last_name}</h2>
          <div className='container1'>
            <Table cohortUserDetails={cohortUserDetails} />
          </div>
      </>
 
  )
}

export default Admin