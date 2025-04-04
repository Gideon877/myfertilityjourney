import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Account, AccountPreview, SignOutButton } from '@toolpad/core/Account';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSession } from '../SessionContext';
import { Badge, Button, Divider, IconButton, Stack } from '@mui/material';
import NotificationsPopover from '../components/NotificationsPopover';

function CustomAccount() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();

    const handleOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <IconButton onClick={handleOpen}>
                <Badge badgeContent={2} color='error'>
                    <NotificationsIcon sx={{ borderRadius: '8px' }} />
                </Badge>
            </IconButton>
            <Account
                localeText={{
                    accountSignOutLabel: 'Logout',
                }}
                slots={{
                    popoverContent: (() =>
                        <Stack direction="column" sx={{ borderRadius: '8px' }}>
                            <AccountPreview
                                variant='expanded' showEmail={false}
                                sx={{ "& .MuiAvatar-root": { display: "none" }, paddingLeft: 'inherit' }}
                            />
                            <Divider />
                            <Button
                                variant='text'
                                fullWidth
                                startIcon=''
                                color='inherit'
                                sx={{ justifyContent: 'flex-start', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '16px', textTransform: 'none' }}
                                onClick={() => navigate("/profile")}
                            >Profile</Button>
                            <Divider />
                            <SignOutButton
                                variant='text'
                                color='inherit'
                                fullWidth
                                startIcon=''
                                sx={{ justifyContent: 'flex-start', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '16px', textTransform: 'none' }}
                            />
                        </Stack>
                    )
                }}

                slotProps={{
                    preview: {
                        variant: 'expanded',
                        slotProps: {
                            avatarIconButton: {
                                sx: {
                                    width: 'fit-content',
                                    margin: 'auto',
                                },
                            },
                            avatar: {
                                sx: {
                                    width: '40px',
                                    height: '40px',
                                },
                            },
                        },

                    },
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
        <DashboardLayout slots={{ toolbarAccount: CustomAccount }} sx={{ "& .MuiBreadcrumbs-root": { display: "none" } }} >
            <PageContainer>
                <Outlet />
            </PageContainer>
        </DashboardLayout>
    );
}