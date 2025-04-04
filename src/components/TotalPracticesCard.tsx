import React, { useState } from "react";
import { Card, Typography, Box, Switch, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditPracticeModal from "./EditPracticeModal";
import usePracticeStore from "../store/usePracticeStore";
import { Practice } from "../utils/interfaces";

const TotalPracticesCard: React.FC = () => {
    const rows = usePracticeStore((state) => state.rows);
    const updateRow = usePracticeStore((state) => state.updateRow);
    const deleteRow = usePracticeStore((state) => state.deleteRow);

    const [deleteRowId, setDeleteRowId] = useState<number | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedPractice, setSelectedPractice] = useState<any | null>(null);

    const handleEditClick = (id: number) => {
        const practice = rows.find((row) => row.id === id);
        setSelectedPractice(practice);
        setOpenEditModal(true);
    };

    const handleSaveEdit = (editedPractice: Practice) => {
        updateRow(editedPractice);
    };

    const handleDeleteClick = (id: number | null) => {
        setDeleteRowId(id);
        setOpenDeleteDialog(true);
    };

    const confirmDelete = () => {
        deleteRow(deleteRowId!);
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
            renderCell: (params: any) => {
                const handleStatusChange = (event: any) => {
                    const updatedRow: Practice = { ...params.row, status: event.target.checked ? 'Active' : 'Disabled' };
                    updateRow(updatedRow);
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
            renderCell: (params: any) => (
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
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
            />
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