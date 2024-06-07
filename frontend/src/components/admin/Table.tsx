import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { CohortUserDetails } from '../../types/consts';
import axios from 'axios'
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'first_name', headerName: 'First name', width: 130 },
  { field: 'last_name', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email address', width: 130},
  { field: 'name', headerName: 'Cohort name', width: 200}
];

const Table = (props: { cohortUserDetails: CohortUserDetails[] })=> {
  const [rows, setRows] = useState<CohortUserDetails[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([])
  const [alert, setAlert] = useState<boolean>(false)
  const [alertContent, setAlertContent] = useState<string>('')

  useEffect(() => {
    setRows(props.cohortUserDetails)
  }, [props.cohortUserDetails])

  const handleSelection = async (rowSelected: GridRowSelectionModel) => {
    if(rowSelected.length > 0) {
        setRowSelectionModel(rowSelected);

        let userID: number | undefined;
        userID = parseInt(rowSelected[0] as string)

    try {
        if (userID !== undefined) { 
            const requestDetails = {
                userID,
                verifyRequest: true
            };

            const response = await axios.put(import.meta.env.VITE_BACKEND_URL + `/users/${userID}`, requestDetails)
            
            if (response.status === 200) {
                const remainingRows = rows.filter(row => row.id !== userID)
                setAlert(true)
                setAlertContent("User cohort request approved")
                setRows(remainingRows);

                setTimeout(() => {
                    setAlert(false);
                }, 3000);
            }
            } else {
                console.log('No user id');
            }
        } catch (error) {
            console.log('Failed to update user cohort request as verified')
        }
    }
  }

  return (
    <div style={{ height: '80%', width: '50%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={true}
        onRowSelectionModelChange={(newRowSelectionModel) => handleSelection(newRowSelectionModel)}
        rowSelectionModel={rowSelectionModel}
      />
      {alert ? <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        {alertContent}
      </Alert> : null }
     
    </div>
  );
}

export default Table
