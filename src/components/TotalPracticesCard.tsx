// TotalPracticesCard.js
import React, { useState } from "react";
import { Card, Typography, Box, Switch, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditPracticeModal from "./EditPracticeModal";

const TotalPracticesCard = () => {
    const [rows, setRows] = useState([
        { id: 1, name: "Cape Fertility Clinic", tel: "+21 794 3956", email: "info@capefertility.co.za", date: "04/10/2021", status: "Active" },
        { id: 2, name: "Cape Fertility Clinic", tel: "+21 794 3956", email: "info@capefertility.co.za", date: "04/10/2021", status: "Active" },
        { id: 3, name: "Cape Fertility Clinic", tel: "+21 794 3956", email: "info@capefertility.co.za", date: "04/10/2021", status: "Disabled" },
    ]);

    const [deleteRowId, setDeleteRowId] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedPractice, setSelectedPractice] = useState<any | null>(null);

    const handleEditClick = (id) => {
        const practice = rows.find((row) => row.id === id);
        setSelectedPractice(practice);
        setOpenEditModal(true);
    };

    const handleSaveEdit = (editedPractice) => {
        const updatedRows = rows.map((row) =>
            row.id === editedPractice.id ? editedPractice : row
        );
        setRows(updatedRows);
    };

    const handleDeleteClick = (id) => {
        setDeleteRowId(id);
        setOpenDeleteDialog(true);
    };

    const confirmDelete = () => {
        setRows(rows.filter((row) => row.id !== deleteRowId));
        setOpenDeleteDialog(false);
    };

    const cancelDelete = () => {
        setOpenDeleteDialog(false);
    };

    const columns = [
        { field: "name", headerName: "Practice Name", flex: 1 },
        { field: "tel", headerName: "Tel No", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "date", headerName: "Date Created", flex: 1 },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => {
                const handleStatusChange = (event) => {
                    const updatedRows = rows.map((row) =>
                        row.id === params.id ? { ...row, status: event.target.checked ? 'Active' : 'Disabled' } : row
                    );
                    setRows(updatedRows);
                };

                return (
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={2}>
                        <Switch
                            size="small"
                            checked={params.value === 'Active'}
                            onChange={handleStatusChange}
                        />
                        <Typography sx={{ fontSize: 'small' }} variant="caption">
                            {params.value}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
                <Box>
                    <IconButton size="small" onClick={() => handleEditClick(params.id)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteClick(params.id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Card sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
                Newest Practices
            </Typography>
            <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id} />
            <Dialog open={openDeleteDialog} onClose={cancelDelete}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">Cancel</Button>
                    <Button onClick={confirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
            <EditPracticeModal open={openEditModal} onClose={() => setOpenEditModal(false)} practice={selectedPractice} onSave={handleSaveEdit} />
        </Card>
    );
};

export default TotalPracticesCard;