import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Card, Typography, Box, IconButton, Tooltip, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { CheckCircleOutline, CancelOutlined, PendingActionsOutlined, AddCircleOutline } from '@mui/icons-material';
import { patientData } from "../utils/data";
import TotalPatientsCard from "../components/TotalPatientsCard";

export const circularProgressData = [
    { value: 0, label: "Pending", color: "#FF966B" },
    { value: 0, label: "Registered", color: "#54D62C" },
    { value: 0, label: "Post Treatment", color: "#1890FF" },
];

const PatientsPage: React.FC = () => {
    const [patients, setPatients] = useState(patientData);
    const [progressData, setProgressData] = useState(circularProgressData);
    const [openAddPatientModal, setOpenAddPatientModal] = useState(false);
    const [newPatient, setNewPatient] = useState({ name: '', age: 0, status: 'Pending', treatment: '' });

    useEffect(() => {
        updateProgressData(patients);
    }, [patients]);

    const updateProgressData = (updatedPatients: typeof patientData) => {
        const statusCounts = updatedPatients.reduce(
            (acc, patient) => {
                acc[patient.status]++;
                return acc;
            },
            { Pending: 0, Registered: 0, "Post Treatment": 0 }
        );

        const totalPatients = updatedPatients.length;

        const updatedProgress = circularProgressData.map((item) => ({
            ...item,
            value: totalPatients > 0 ? (statusCounts[item.label] / totalPatients) * 100 : 0,
        }));

        setProgressData(updatedProgress);
    };

    const handleStatusChange = (id: number, newStatus: string) => {
        const updatedPatients = patients.map((patient) =>
            patient.id === id ? { ...patient, status: newStatus } : patient
        );
        setPatients(updatedPatients);
    };

    const handleAddPatient = () => {
        const newId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
        setPatients([...patients, { ...newPatient, id: newId }]);
        setNewPatient({ name: '', age: 0, status: 'Pending', treatment: '' });
        setOpenAddPatientModal(false);
    };

    const columnsWithStatusChange: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'age', headerName: 'Age', width: 90 },
        { field: 'status', headerName: 'Status', flex: 1 },
        { field: 'treatment', headerName: 'Treatment', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params: GridRenderCellParams) => {
                const { row } = params;
                return (
                    <Box>
                        {row.status !== 'Registered' && (
                            <Tooltip title="Set to Registered">
                                <IconButton onClick={() => handleStatusChange(Number(params.id), 'Registered')}>
                                    <CheckCircleOutline />
                                </IconButton>
                            </Tooltip>
                        )}
                        {row.status !== 'Pending' && (
                            <Tooltip title="Set to Pending">
                                <IconButton onClick={() => handleStatusChange(Number(params.id), 'Pending')}>
                                    <PendingActionsOutlined />
                                </IconButton>
                            </Tooltip>
                        )}
                        {row.status !== 'Post Treatment' && (
                            <Tooltip title="Set to Post Treatment">
                                <IconButton onClick={() => handleStatusChange(Number(params.id), 'Post Treatment')}>
                                    <CancelOutlined />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                );
            },
        },
    ];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>My Patients</Typography>
            <Button variant="outlined" startIcon={<AddCircleOutline />} onClick={() => setOpenAddPatientModal(true)}>
                Add Patient
            </Button>
            <Box mt={4} justifyContent="space-between" alignItems="center">
                <TotalPatientsCard progressData={progressData} />
            </Box>

            <Box mt={4}>
                <Card sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={patients}
                        columns={columnsWithStatusChange}
                        getRowId={(row) => row.id}
                    />
                </Card>
            </Box>

            <Dialog open={openAddPatientModal} onClose={() => setOpenAddPatientModal(false)}>
                <DialogTitle>Add New Patient</DialogTitle>
                <DialogContent>
                    <TextField label="Name" fullWidth margin="dense" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} />
                    <TextField label="Age" fullWidth margin="dense" type="number" value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: parseInt(e.target.value) })} />
                    <TextField label="Treatment" fullWidth margin="dense" value={newPatient.treatment} onChange={(e) => setNewPatient({ ...newPatient, treatment: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddPatientModal(false)}>Cancel</Button>
                    <Button onClick={handleAddPatient} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PatientsPage;