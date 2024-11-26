import { create } from 'zustand';

export interface RutaState {
  origen: string;
  destino: string;
  comentario: string;
  kms: number;
}

interface FormularioState {
  ruta: RutaState | null;
  toggleModalRuta: boolean;
  setRuta: (ruta: RutaState) => void;
  setToggleModalRuta: () => void;
}

export const useFormularioStore = create<FormularioState>((set) => ({
  ruta: null,
  toggleModalRuta: false,
  setRuta: (ruta: RutaState) => set({ ruta }),
  setToggleModalRuta: () =>
    set((state) => ({ ...state, toggleModalRuta: !state.toggleModalRuta })),
}));
