import { create } from 'zustand';
import type { Usuario } from '../types';

interface AuthStore {
    // estado
    usuario: Usuario | null;

    // actions
    login: (usuario: Usuario) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    usuario: null,

    login: (usuario) => set({ usuario }),
    logout: () => set({ usuario: null }),
}));