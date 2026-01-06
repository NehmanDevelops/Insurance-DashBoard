import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Mock claims data generator
const generateMockClaims = () => {
  const claimTypes = ['Auto', 'Property', 'Liability', 'Health', 'Life', 'Travel']
  const statuses = ['Pending', 'Under Review', 'Approved', 'Denied', 'Paid']
  const priorities = ['Low', 'Medium', 'High', 'Critical']
  const adjusters = ['Sarah Johnson', 'Michael Chen', 'Emily Davis', 'James Wilson', 'Maria Garcia']
  
  const claims = []
  
  for (let i = 1; i <= 50; i++) {
    const createdDate = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    
    claims.push({
      id: `CLM-2025-${String(i).padStart(5, '0')}`,
      claimNumber: `CLM-2025-${String(i).padStart(5, '0')}`,
      policyNumber: `POL-${Math.floor(Math.random() * 900000) + 100000}`,
      customerName: `Customer ${i}`,
      customerEmail: `customer${i}@email.com`,
      customerPhone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      claimType: claimTypes[Math.floor(Math.random() * claimTypes.length)],
      status: status,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      amount: Math.floor(Math.random() * 50000) + 1000,
      estimatedAmount: Math.floor(Math.random() * 60000) + 1000,
      adjuster: adjusters[Math.floor(Math.random() * adjusters.length)],
      description: `Claim description for claim ${i}. This is a detailed description of the incident and damage assessment.`,
      incidentDate: new Date(createdDate.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: createdDate.toISOString(),
      updatedAt: new Date(createdDate.getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
      documents: Math.floor(Math.random() * 5) + 1,
      notes: Math.floor(Math.random() * 10),
      location: {
        address: `${Math.floor(Math.random() * 9999) + 1} Main Street`,
        city: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'][Math.floor(Math.random() * 5)],
        province: ['ON', 'BC', 'QC', 'AB', 'ON'][Math.floor(Math.random() * 5)],
        postalCode: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${Math.floor(Math.random() * 9)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9)}`
      },
      timeline: [
        { date: createdDate.toISOString(), event: 'Claim Submitted', user: 'System' },
        { date: new Date(createdDate.getTime() + 24 * 60 * 60 * 1000).toISOString(), event: 'Assigned to Adjuster', user: 'System' },
        { date: new Date(createdDate.getTime() + 48 * 60 * 60 * 1000).toISOString(), event: 'Initial Review Completed', user: adjusters[Math.floor(Math.random() * adjusters.length)] },
      ]
    })
  }
  
  return claims
}

export const useClaimsStore = create(
  persist(
    (set, get) => ({
      claims: generateMockClaims(),
      filters: {
        status: 'all',
        type: 'all',
        priority: 'all',
        search: '',
        dateRange: { start: null, end: null }
      },
      sortBy: 'createdAt',
      sortOrder: 'desc',
      
      // Actions
      setFilter: (key, value) => set((state) => ({
        filters: { ...state.filters, [key]: value }
      })),
      
      resetFilters: () => set({
        filters: {
          status: 'all',
          type: 'all',
          priority: 'all',
          search: '',
          dateRange: { start: null, end: null }
        }
      }),
      
      setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
      
      addClaim: (claim) => set((state) => ({
        claims: [{ 
          ...claim, 
          id: `CLM-2025-${String(state.claims.length + 1).padStart(5, '0')}`,
          claimNumber: `CLM-2025-${String(state.claims.length + 1).padStart(5, '0')}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          timeline: [{ date: new Date().toISOString(), event: 'Claim Submitted', user: 'System' }]
        }, ...state.claims]
      })),
      
      updateClaim: (id, updates) => set((state) => ({
        claims: state.claims.map((claim) =>
          claim.id === id ? { ...claim, ...updates, updatedAt: new Date().toISOString() } : claim
        )
      })),
      
      deleteClaim: (id) => set((state) => ({
        claims: state.claims.filter((claim) => claim.id !== id)
      })),
      
      getClaimById: (id) => {
        return get().claims.find((claim) => claim.id === id)
      },
      
      getFilteredClaims: () => {
        const { claims, filters, sortBy, sortOrder } = get()
        
        let filtered = [...claims]
        
        // Apply filters
        if (filters.status !== 'all') {
          filtered = filtered.filter((c) => c.status === filters.status)
        }
        if (filters.type !== 'all') {
          filtered = filtered.filter((c) => c.claimType === filters.type)
        }
        if (filters.priority !== 'all') {
          filtered = filtered.filter((c) => c.priority === filters.priority)
        }
        if (filters.search) {
          const search = filters.search.toLowerCase()
          filtered = filtered.filter((c) =>
            c.claimNumber.toLowerCase().includes(search) ||
            c.customerName.toLowerCase().includes(search) ||
            c.policyNumber.toLowerCase().includes(search)
          )
        }
        
        // Apply sorting
        filtered.sort((a, b) => {
          let comparison = 0
          if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
            comparison = new Date(a[sortBy]) - new Date(b[sortBy])
          } else if (sortBy === 'amount') {
            comparison = a.amount - b.amount
          } else {
            comparison = String(a[sortBy]).localeCompare(String(b[sortBy]))
          }
          return sortOrder === 'desc' ? -comparison : comparison
        })
        
        return filtered
      },
      
      // Statistics
      getStatistics: () => {
        const claims = get().claims
        const now = new Date()
        const thisMonth = claims.filter(c => {
          const date = new Date(c.createdAt)
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
        })
        
        return {
          total: claims.length,
          pending: claims.filter(c => c.status === 'Pending').length,
          underReview: claims.filter(c => c.status === 'Under Review').length,
          approved: claims.filter(c => c.status === 'Approved').length,
          denied: claims.filter(c => c.status === 'Denied').length,
          paid: claims.filter(c => c.status === 'Paid').length,
          thisMonth: thisMonth.length,
          totalAmount: claims.reduce((sum, c) => sum + c.amount, 0),
          avgProcessingTime: 4.2, // days (mock)
          satisfactionRate: 94.5, // percentage (mock)
        }
      }
    }),
    {
      name: 'zurich-claims-storage',
      partialize: (state) => ({ claims: state.claims }),
    }
  )
)
