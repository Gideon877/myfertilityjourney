import React, { Fragment, useContext } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SessionContext from "../SessionContext";
import DashboardCard from '../components/DashboardCard';
import { dashboardCardData } from '../utils/data';
import PercentageCard from '../components/CircularProgressWithLabel';
import TotalPracticesCard from '../components/TotalPracticesCard';
import usePracticeStore from '../store/usePracticeStore';

const Home: React.FC = () => {
    const { session } = useContext(SessionContext);
    const practices = usePracticeStore((state) => state.rows);
    const updatedDashboardData = dashboardCardData.map((card) => {
        if (card.title === 'Total Practices') {
            return {
                ...card,
                value: practices.length.toString(), 
            };
        }
        return card;
    });

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
            <Box mt={4} >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {updatedDashboardData.map((card, index) => (
                        <Grid size={4} key={index}>
                            <DashboardCard
                                title={card.title}
                                value={Number(card.value)}
                                icon={card.icon}
                                percentage={Number(card.percentage)}
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
