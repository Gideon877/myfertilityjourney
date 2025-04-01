'use client';
import LinearProgress from '@mui/material/LinearProgress';
import { SignInPage } from '@toolpad/core/SignInPage';
import { Navigate, useNavigate } from 'react-router';
import { useSession, type Session } from '../SessionContext';
import { signInWithGoogle } from '../firebase/auth';


export default function SignIn() {
    const { session, setSession, loading } = useSession();
    const navigate = useNavigate();

    if (loading) {
        return <LinearProgress />;
    }

    if (session) {
        return <Navigate to="/" />;
    }

    return (
        <SignInPage
            providers={[{ id: 'google', name: 'Google' }]}
            signIn={async (provider, _, callbackUrl) => {
                let result;
                try {
                    if (provider.id === 'google') {
                        result = await signInWithGoogle();
                    }

                    const user = result?.user;

                    if (result?.success && result?.user) {
                        const userSession: Session = {
                            user: {
                                ...user
                            }
                        };
                        setSession(userSession);
                        navigate(callbackUrl || '/', { replace: true });
                        return {};
                    }
                    return { error: result?.error || 'Failed to sign in' };
                } catch (error) {
                    return { error: error instanceof Error ? error.message : 'An error occurred' };
                }
            }}

        />
    );
}