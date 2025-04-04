

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

export interface PatientStore {
    patients: Patient[];
    addPatient: (patient: Omit<Patient, 'id'>) => void;
    updatePatient: (id: number, updatedPatient: Partial<Patient>) => void;
    deletePatient: (id: number) => void;
}

export interface Practice {
    id: number;
    name: string;
    tel: string;
    email: string;
    date: string;
    status: 'Active' | 'Disabled';
}

export interface PracticeStore {
    rows: Practice[];
    updateRow: (updatedRow: Practice) => void;
    deleteRow: (id: number) => void;

}

export interface UserData {
    id: string; 
    displayName: string;
    email: string;
}

export interface UserData {
    id: string;
    displayName: string;
    email: string;
}
