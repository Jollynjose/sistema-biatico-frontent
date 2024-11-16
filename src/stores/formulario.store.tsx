import { create } from 'zustand';

export interface RutaState {
  origen: {
    municipioId: string;
    name: string;
  };
  paradas: {
    municipioId: string;
    kms: number;
    municipioName: string;
  }[];
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
