import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Home: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Box textAlign="center" mt={5}>
                <Typography variant="h4" color="primary" gutterBottom>
                    Welcome to Your Fertility Journey Dashboard
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Track your cycle, monitor key fertility indicators, and stay informed with personalized insights. 
                    Stay on top of your journey with ovulation tracking, appointment reminders, and health insights.
                </Typography>
            </Box>
        </Container>
    );
}

export default Home;
