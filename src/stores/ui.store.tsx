import { create } from 'zustand';

interface UIState {
  toggleLoading: boolean;
  setToggleLoading: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  toggleLoading: false,
  setToggleLoading: () =>
    set((state) => ({ ...state, toggleLoading: !state.toggleLoading })),
}));
