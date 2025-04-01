import React, { Fragment, useContext } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import SessionContext, { type Session } from "../SessionContext";
import DashboardCard from '../components/DashboardCard';
import { dashboardCardData } from '../utils/data';
import PercentageCard from '../components/CircularProgressWithLabel';
import TotalPracticesCard from '../components/TotalPracticesCard';

const Home: React.FC = () => {
    const { session } = useContext(SessionContext);

    const user = session?.user

    return (
        <Fragment>
            <Box mt={5} >
                <Typography variant="h5" gutterBottom>
                    Welcome {user?.firstName}!
                </Typography>
                <Typography variant="body2">
                    Nulla ut aliquam metus. Integer at diam sem. Nunc finibus nibh vel risus eeleifend laoreet.
                </Typography>
            </Box>
            <Box
                mt={4}
            // ml={-20} 
            >
                {/* sx={{ xs: 12, sm: 6, md: 4 }} */}
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {dashboardCardData.map((card, index) => (
                        <Grid size={4} key={index}>
                            <DashboardCard
                                title={card.title}
                                value={card.value}
                                icon={card.icon}
                                percentage={card.percentage}
                            />
                        </Grid>
                    ))}

                </Grid>
            </Box>

            <Box mt={4}>
                <PercentageCard />
            </Box>
            <Box mt={4}>
                <TotalPracticesCard />
            </Box>
        </Fragment>
    );
}

export default Home;
