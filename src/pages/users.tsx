import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Card, Box, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { UserData } from '../utils/interfaces';
import { initialUsers } from '../utils/data';



export default function UsersPage() {
    const [users, setUsers] = useState<UserData[]>(initialUsers);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

    const handleEditClick = (user: UserData) => {
        setSelectedUser(user);
        setOpenEditModal(true);
    };

    const handleSaveEdit = () => {
        if (selectedUser) {
            setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
            setOpenEditModal(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeleteUserId(id);
        setOpenDeleteDialog(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter((user) => user.id !== deleteUserId));
        setOpenDeleteDialog(false);
    };

    const columns: GridColDef[] = [
        { field: 'displayName', headerName: 'Display Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Box>
                    <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditClick(params.row)}>
                            <EditOutlined />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteClick(params.id.toString())}>
                            <DeleteOutline />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Manage Users
            </Typography>
            <Card sx={{ width: '100%', mt: 2 }}>
                <DataGrid rows={users} columns={columns} getRowId={(row) => row.id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                />
            </Card>

            {/* Edit Modal */}
            <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Display Name"
                        margin="dense"
                        value={selectedUser?.displayName || ''}
                        onChange={(e) => setSelectedUser((prev) => prev ? { ...prev, displayName: e.target.value } : null)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        margin="dense"
                        value={selectedUser?.email || ''}
                        onChange={(e) => setSelectedUser((prev) => prev ? { ...prev, email: e.target.value } : null)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditModal(false)} color="primary">Cancel</Button>
                    <Button onClick={handleSaveEdit} color="success">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this user?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
                    <Button onClick={confirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
