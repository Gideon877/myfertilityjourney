import * as React from 'react';
import { SessionContextType } from './utils/interfaces';

export interface Session {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        firstName?: string | null;
        lastName?: string | null;
    },
}
const SessionContext = React.createContext<SessionContextType>({
    session: null,
    setSession: () => { },
    loading: true,
});

export default SessionContext;

export const useSession = () => React.useContext(SessionContext);