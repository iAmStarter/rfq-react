import { useEffect } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box, Paper, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchWorkflows } from '../features/workflow/workflowSlice';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Workflow Name', width: 300 },
    { field: 'active', headerName: 'Status', width: 150, renderCell: (params) => (params.value ? 'Active' : 'Inactive') },
];

export default function WorkflowListPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { workflows, status } = useSelector((state: RootState) => state.workflow);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchWorkflows());
        }
    }, [status, dispatch]);
    
    return (
        <Box sx={{ padding: 3 }}>
            <Paper sx={{ height: 400, width: '100%' }}>
                <Typography variant="h5" sx={{ p: 2 }}>Workflow Management</Typography>
                <DataGrid
                    rows={workflows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    loading={status === 'loading'}
                />
            </Paper>
        </Box>
    );
}