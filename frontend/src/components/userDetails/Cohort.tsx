import { useState, useContext, useEffect } from 'react'
import { Stack, Box, InputLabel, MenuItem, FormControl, Button, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAddCohort, useUpdateCohort } from './hooks';
import { AuthContext } from '../../App';
import axios from 'axios'

interface cohort {
    id: number,
    name: string
}

const Cohort = () => {
  const [cohort, setCohort] = useState<string>('');
  const [cohortOptions, setCohortOptions] = useState<cohort[]>([])
  const addCohortHook = useAddCohort()
  const updateUserCohortHook = useUpdateCohort()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    fetchCohortData()
  }, [])

  const fetchCohortData = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/cohorts/all');
        setCohortOptions(response.data)
    } catch (error) {
        throw Error('Failed to fetch cohort data');
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setCohort(event.target.value as string);
  };

  const addCohort = async () => {
        if (cohort === "") return;
        addCohortHook(cohort)
        if(user) {
            updateUserCohortHook(user.id)
            alert('Request sent. An admin will review your cohort request.');
        }
        setCohort("")
  }

  return ( 
    <>  
        <Stack spacing={10} sx={{ width: '50vw' }}>
            <Typography variant="h2">
                Choose your cohort
            </Typography>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Cohort</InputLabel>
                    <Select
                    value={cohort}
                    label="Cohort"
                    onChange={handleChange}
                    >
                    {cohortOptions.map((cohort) => (
                        <MenuItem key={cohort.id} value={cohort.id}>{cohort.name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Box>
            <Button variant='contained' sx={{width: '20vw'}} onClick={() => addCohort()}>Add Cohort</Button>
        </Stack>
    </>

   
  );
}

export default Cohort