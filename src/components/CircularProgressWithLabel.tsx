import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import { circularProgressData } from '../utils/data';

const CircularProgressWithLabel = ({ value, color }) => {
    return (
        <Box sx={{ position: 'relative', display: "inline-flex" }} >
            <CircularProgress variant="determinate" value={100} sx={{ color: "#E0E0E0" }} size={60} thickness={5} />
            <CircularProgress
                variant="determinate"
                value={value}
                sx={{ color: color, position: "absolute" }}
                size={60}
                thickness={5}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="caption" component="div" fontWeight={600}>{`${value}%`}</Typography>
            </Box>
        </Box>
    );
};

const TotalPracticesCard = () => {
    return (
        <Card sx={{ display: "flex", justifyContent: "space-around", p: 2, borderRadius: 3, boxShadow: 2 }}>
            {circularProgressData.map((item, index) => (
                <Box key={index} display="flex" alignItems="center" gap={2}>
                    <CircularProgressWithLabel value={item.value} color={item.color} />
                    <Box textAlign="left" m={3}>
                        <Typography variant="h6" fontWeight={600}>
                            {item.value}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.label}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Card>
    );
};

export default TotalPracticesCard;