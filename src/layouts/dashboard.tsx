import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Outlet, Navigate, useLocation } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Account } from '@toolpad/core/Account';
import NotificationsIcon from '@mui/icons-material/Notifications';


import { useSession } from '../SessionContext';
import { Badge, Button, IconButton } from '@mui/material';
import NotificationsPopover from '../components/NotificationsPopover';

function CustomAccount() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <IconButton onClick={handleOpen}>
                <Badge badgeContent={2} color='error'>
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Account
                localeText={{
                    accountSignOutLabel: 'Logout',
                }}
                slotProps={{
                    preview: { slotProps: { avatarIconButton: { sx: { border: '0' } } } },
                    signOutButton: {
                        startIcon: '',
                        variant: 'text',
                        color: 'inherit',
                        fullWidth: true,
                    },
                    popoverContent: {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,

                    }
                }}
            />

            <NotificationsPopover
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            />
        </React.Fragment>
    );
}

export default function Layout() {
    const { session, loading } = useSession();
    const location = useLocation();

    if (loading) {
        return (
            <div style={{ width: '100%' }}>
                <LinearProgress />
            </div>
        );
    }

    if (!session) {
        const redirectTo = `/sign-in?callbackUrl=${encodeURIComponent(location.pathname)}`;
        return <Navigate to={redirectTo} replace />;
    }

    return (
        <DashboardLayout slots={{ toolbarAccount: CustomAccount }}>
            <PageContainer>
                <Outlet />
            </PageContainer>
        </DashboardLayout>
    );
}