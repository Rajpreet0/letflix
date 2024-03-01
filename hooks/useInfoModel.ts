import { create } from 'zustand'; // Light weight State Management Libary

// Defining the interface for the modal state
export interface ModalStoreInterface {
    movieId?: string;
    isOpen: boolean;
    openModal: (movieId: string) => void; // Function to open the modal which takes in the moveId
    closeModal: () => void; // Function to close the modal
}

// Creating a Zustand store for managing the modal state
const useInfoModalStore = create<ModalStoreInterface>((set) => ({
    movieId: undefined, // Initializing movieId as undefined
    isOpen: false, // Initializing isOpen as false (modal initially closed)
    openModal:  (movieId: string) => set({isOpen: true, movieId}), // Function to set isOpen to true and set movieId, triggered when opening the modal
    closeModal: () => set({isOpen: false, movieId: undefined }), // Function to set isOpen to false and reset movieId to undefined, triggered when closing the modal
}));

export default useInfoModalStore;