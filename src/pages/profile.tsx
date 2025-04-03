import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Avatar, Box, Typography, CircularProgress, Divider } from "@mui/material";

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (!user) {
        return <Typography variant="h5">No user is logged in.</Typography>;
    }

    return (
        <Box display="flex-start" flexDirection="column" alignItems="center" p={3}>
            <Avatar src={user.photoURL || ""} sx={{ width: 100, height: 100, mb: 2 }} />
            <Typography variant="h5" fontWeight="bold">
                {user.displayName || "No Name Available"}
            </Typography>
            <Typography variant="body1" color="textSecondary">
                {user.email || "No Email Available"}
            </Typography>
            <Divider sx={{ width: "100%", my: 2 }} />
            <Typography variant="body2"><strong>UID:</strong> {user.uid}</Typography>
            <Typography variant="body2"><strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}</Typography>
            {user.phoneNumber && <Typography variant="body2"><strong>Phone:</strong> {user.phoneNumber}</Typography>}
            {user.metadata.creationTime && (
                <Typography variant="body2"><strong>Account Created:</strong> {new Date(user.metadata.creationTime).toLocaleString()}</Typography>
            )}
            {user.metadata.lastSignInTime && (
                <Typography variant="body2"><strong>Last Login:</strong> {new Date(user.metadata.lastSignInTime).toLocaleString()}</Typography>
            )}
            <Typography variant="body2"><strong>Provider:</strong> {user.providerData[0]?.providerId}</Typography>
        </Box>
    );
}
