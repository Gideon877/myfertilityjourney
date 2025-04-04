import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PracticeStore } from '../utils/interfaces';
import { practiceData } from '../utils/data';

const usePracticeStore = create<PracticeStore>()(
    persist(
        (set) => ({
            rows: practiceData,
            updateRow: (updatedRow) =>
                set((state) => ({
                    rows: state.rows.map((row) =>
                        row.id === updatedRow.id ? updatedRow : row
                    ),
                })),
            deleteRow: (id) =>
                set((state) => ({
                    rows: state.rows.filter((row) => row.id !== id),
                })),
        }),
        {
            name: 'practice-storage', 
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default usePracticeStore;