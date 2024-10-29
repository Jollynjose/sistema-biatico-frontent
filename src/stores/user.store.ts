import { create } from 'zustand';

interface UserStore {
  user: number;
  setUser: (user: number) => void;
}

const userStores = create<UserStore>((set) => ({
  user: 0,
  setUser: (user) => set({ user }),
}));

export default userStores;
