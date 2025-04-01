import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Icon from '@mdi/react';


const DashboardCard: React.FC<{
    title: string,
    value: number,
    icon: string,
    percentage: number
}> = ({ title, value, icon, percentage }) => {

    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 3,
                boxShadow: 2,
                font: 'Montserrat',
                height: '70%'
            }}
        >
            <CardContent sx={{ flex: 1 }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: '600',

                    }}
                    color="text.secondary"
                >
                    {title}
                </Typography>

                <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUpIcon sx={{ color: "#4CAF50", fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" color="#4CAF50">
                        +{percentage}%
                    </Typography>
                </Box>
                <Typography variant="h4" fontWeight={600} mt={1}>
                    {value}
                </Typography>
            </CardContent>
            <Box
                sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: "#E3F2FD",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* <mdiStethoscope sx={{ color: "#1976D2", fontSize: 30 }} /> */}
                {/* <FontAwesomeIcon icon={} /> */}
                <Icon path={icon} size={1} />

            </Box>
        </Card>
    );
};

export default DashboardCard;
