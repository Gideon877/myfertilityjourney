import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PatientStore } from '../utils/interfaces';
import { patientData } from '../utils/patientData';

const usePatientStore = create<PatientStore>()(
    persist(
        (set) => ({
            patients: patientData,
            addPatient: (patient) =>
                set((state) => ({
                    patients: [
                        ...state.patients,
                        { id: Math.max(0, ...state.patients.map((p) => p.id)) + 1, ...patient },
                    ],
                })),
            updatePatient: (id, updatedPatient) =>
                set((state) => ({
                    patients: state.patients.map((patient) =>
                        patient.id === id ? { ...patient, ...updatedPatient } : patient
                    ),
                })),
            deletePatient: (id) =>
                set((state) => ({
                    patients: state.patients.filter((patient) => patient.id !== id),
                })),
        }),
        {
            name: 'patient-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default usePatientStore;