import { create } from "zustand";

export const useVehiclesStore = create((set, get) => ({
  vehicles: [],
  loading: true,
  error: null,

  setInitialData: (data) => set({ vehicles: data, loading: false }),

  addVehicle: (vehicle) =>
    set((state) => ({ vehicles: [...state.vehicles, vehicle] })),

  getVehicleById: (id) => get().vehicles.find((v) => v.id === id),

  updateVehicle: (name, price, newData) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.name === name && Number(v.price) === Number(price)
          ? { ...newData }
          : v,
      ),
    })),

  removeVehicle: (id) =>
    set((state) => ({
      vehicles: state.vehicles.filter((v) => v.id !== id),
    })),
}));
