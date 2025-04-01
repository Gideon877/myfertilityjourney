import React from "react";
import { Card, Typography, Box, CircularProgress } from '@mui/material';

const PatientCircularProgress: React.FC<{ value: number; label: string; color: string }> = ({ value, label, color }) => {
    return (
        <Card sx={{ display: "flex", justifyContent: "space-around", p: 2, borderRadius: 3, boxShadow: 2, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" value={value} sx={{ color }} />
                <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="caption" component="div">{`${value}%`}</Typography>
                </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{label}</Typography>
        </Card>
    );
};

export default PatientCircularProgress;