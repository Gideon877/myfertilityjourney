import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Card, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { CheckCircleOutline, CancelOutlined, PendingActionsOutlined } from '@mui/icons-material';
import { patientData } from "../utils/data";
import TotalPatientsCard from "../components/TotalPatientsCard";
import { Patient } from "../utils/interfaces";

export const circularProgressData = [
    { value: 0, label: "Pending", color: "#FF966B" },
    { value: 0, label: "Registered", color: "#54D62C" },
    { value: 0, label: "Post Treatment", color: "#1890FF" },
];

const PatientsPage: React.FC = () => {
    const [patients, setPatients] = useState(patientData);
    const [progressData, setProgressData] = useState(circularProgressData);

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
            value: totalPatients > 0 ? (statusCounts[item.label as keyof typeof statusCounts] / totalPatients) * 100 : 0,
        }));

        setProgressData(updatedProgress);
    };

    const handleStatusChange = (id: number, newStatus: Patient["status"]) => {
        const updatedPatients = patients.map((patient) =>
            patient.id === id ? { ...patient, status: newStatus } : patient
        );
        setPatients(updatedPatients);
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
            renderCell: (params: any) => {
                const { row } = params;
                return (
                    <Box>
                        {row.status !== 'Registered' && (
                            <Tooltip title="Set to Registered">
                                <IconButton onClick={() => handleStatusChange(params.id, 'Registered')}>
                                    <CheckCircleOutline />
                                </IconButton>
                            </Tooltip>
                        )}
                        {row.status !== 'Pending' && (
                            <Tooltip title="Set to Pending">
                                <IconButton onClick={() => handleStatusChange(params.id, 'Pending')}>
                                    <PendingActionsOutlined />
                                </IconButton>
                            </Tooltip>
                        )}
                        {row.status !== 'Post Treatment' && (
                            <Tooltip title="Set to Post Treatment">
                                <IconButton onClick={() => handleStatusChange(params.id, 'Post Treatment')}>
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

            <Box mt={4}>
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
        </Box>
    );
};

export default PatientsPage;