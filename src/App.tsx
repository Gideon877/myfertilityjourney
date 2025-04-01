import * as React from 'react';
import { HomeOutlined, PeopleAltOutlined, PortraitOutlined, CreateNewFolderOutlined, DescriptionOutlined } from '@mui/icons-material';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation, Authentication } from '@toolpad/core/AppProvider';
import { firebaseSignOut, onAuthStateChanged } from './firebase/auth';
import SessionContext, { type Session } from './SessionContext';
import theme from '../theme';
import { Box } from '@mui/material';

const NAVIGATION: Navigation = [
    {
        title: 'Dashboard',
        icon: <HomeOutlined />,
    },
    {
        segment: 'profile',
        title: 'My Profile',
        icon: <PortraitOutlined />,
    },
    {
        segment: 'users',
        title: 'Manage Users',
        icon: <PeopleAltOutlined />,
    },
    {
        segment: 'patients',
        title: 'Manage Patients',
        icon: <CreateNewFolderOutlined />,
    },
    {
        segment: 'logs',
        title: 'Logs',
        icon: <DescriptionOutlined />,
    },
];

const BRANDING = {
    title: " My Fertility Journey",
};

const AUTHENTICATION: Authentication = {
    signIn: () => { },
    signOut: firebaseSignOut,
};

export default function App() {
    const [session, setSession] = React.useState<Session | null>(null);
    const [loading, setLoading] = React.useState(true);

    const sessionContextValue = React.useMemo(
        () => ({
            session,
            setSession,
            loading,
        }),
        [session, loading],
    );

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged((user) => {
            if (user) {
                setSession({
                    user: {
                        name: user.displayName || '',
                        email: user.email || '',
                        image: user.photoURL || "",
                        firstName: user.displayName?.split(" ")[0] || "",
                        lastName: user.displayName?.split(" ")[1] || "",
                    },
                });
            } else {
                setSession(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <ReactRouterAppProvider
            navigation={NAVIGATION}
            branding={BRANDING}
            session={session}
            authentication={AUTHENTICATION}
            theme={theme}
        >
            <SessionContext.Provider value={sessionContextValue}>
                <Box >
                    <Outlet  />
                </Box>
            </SessionContext.Provider>
        </ReactRouterAppProvider>
    );
}