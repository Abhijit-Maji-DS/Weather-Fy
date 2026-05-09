import { create } from "zustand";

export const useWeatherStore = create((set, get) => ({
  city: "Kolkata",
  units: "metric",
  recent: ["Kolkata", "Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad"],

  setCity: (city) => {
    const recent = Array.from(new Set([city, ...get().recent])).slice(0, 6);
    set({ city, recent });
  },

  toggleUnits: () =>
    set((s) => ({
      units: s.units === "metric" ? "imperial" : "metric",
    })),
}));
