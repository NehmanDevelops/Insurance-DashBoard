import { create } from 'zustand'

export const useDemoStore = create((set) => ({
  isDemoMode: false,
  currentStep: 0,
  totalSteps: 12,
  
  startDemo: () => set({ isDemoMode: true, currentStep: 0 }),
  endDemo: () => set({ isDemoMode: false, currentStep: 0 }),
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1) 
  })),
  prevStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 0) 
  })),
  goToStep: (step) => set({ currentStep: step }),
}))
