

export interface Session {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        firstName?: string | null;
        lastName?: string | null;
    },
}

export interface SessionContextType {
    session: Session | null;
    setSession: (session: Session | null) => void;
    loading: boolean;
}

export interface CircularProgressItem {
    value: number;
    label: 'Pending' | 'Registered' | 'Post Treatment';
    color: string;
}

export interface Patient {
    id: number;
    name: string;
    age: number;
    status: 'Pending' | 'Registered' | 'Post Treatment';
    treatment: string;
}