// EditPracticeModal.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const EditPracticeModal = ({ open, onClose, practice, onSave }) => {
    const [editedPractice, setEditedPractice] = useState<any | null>({});

    useEffect(() => {
        if (practice) {
            setEditedPractice(practice);
        }
    }, [practice]);

    const handleChange = (e) => {
        setEditedPractice({ ...editedPractice, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(editedPractice);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Practice</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Practice Name"
                    type="text"
                    fullWidth
                    value={editedPractice.name || ""}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="tel"
                    label="Tel No"
                    type="text"
                    fullWidth
                    value={editedPractice.tel || ""}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={editedPractice.email || ""}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="date"
                    label="Date Created"
                    type="text"
                    fullWidth
                    value={editedPractice.date || ""}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPracticeModal;