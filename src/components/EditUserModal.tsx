import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserData } from '../utils/interfaces';


const EditUserModal: React.FC<{ open: boolean, onClose: () => void, user: UserData | null, onSave: (user: UserData) => Promise<void> }> = ({ open, onClose, user, onSave }) => {
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName);
            setEmail(user.email);
        }
    }, [user]);

    const handleSave = async () => {
        if (user) {
            await onSave({ ...user, displayName, email });
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <Box>
                    <Typography>Display Name</Typography>
                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                    <Typography>Email</Typography>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserModal;