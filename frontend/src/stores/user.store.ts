import { create } from 'zustand';

type UserStoreStates = {
  user: IUser | null;
};

type UserStoreActions = {
  setUser: (value: IUser) => void;
};

type UserStore = UserStoreStates & UserStoreActions;

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (value) => set({ user: value }),
}));
