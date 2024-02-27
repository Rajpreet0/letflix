import { create } from 'zustand'; // Light weight State Management Libary


export interface ModalStoreInterface {
    movieId?: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
}

const useInfoModalStore = create<ModalStoreInterface>((set) => ({
    movieId: undefined,
    isOpen: false,
    openModal:  (movieId: string) => set({isOpen: true, movieId}), 
    closeModal: () => set({isOpen: false, movieId: undefined }),
}));

export default useInfoModalStore;