import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';

interface IUserState {
    id: string | null;
    role: string | null;
    name: string | null;
    email: string | null;
    token: string | null;
    setUserProperty: (property: keyof IUserState, value: any) => void;
    resetUser: () => void;
}

const initialState: IUserState = {
    id: null,
    role: null,
    name: null,
    email: null,
    token: null,
    setUserProperty: (property, value) => {},
    resetUser: () => {}
};

export const useUser = create<IUserState>()(
    persist(
        (set) => ({
            ...initialState,
            setUserProperty: (property, value) => set((state) => ({
                ...state,
                [property]: value
            })),
            resetUser: () => set({ ...initialState })
        }),
        {
            name: 'user-store',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
