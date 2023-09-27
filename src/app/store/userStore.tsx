import { create } from 'zustand';

interface useStoreProps {
  user: any;
  setUser: (value: JSON) => void
}

const setUserData = () => {
  try {
    const item = window.localStorage.getItem('user');

    return JSON.parse(item || '')
  } catch (error) {
    return error
  }
}

export const useUserStore = create<useStoreProps>()((set) => ({
  user: setUserData(),
  setUser: (value: JSON) => {
    window.localStorage.setItem('user', JSON.stringify(value))
    return set({ user: value })
  },
}))