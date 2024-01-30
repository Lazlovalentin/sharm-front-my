import { create } from 'zustand'

export const useUser = create((set) => ({
    id: null,
    role: null,
    name: null,
    email: null,
    token: null,

    setUserProperty: (property: any, value: any) => set((state: any) => ({
        ...state,
        [property]: value
    })),

    resetUser: () => set(() => ({
        id: null, role: null, name: null, email: null, token: null
    }))
}))