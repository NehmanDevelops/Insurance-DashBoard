# Zurich Canada Customer Self-Service Claims Portal

![Zurich Logo](https://img.shields.io/badge/Zurich-Canada-003399?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite)

## 🎯 The Problem We're Solving

**40% of insurance support calls are customers asking "Where's my claim?"**

| Problem | Impact |
|---------|--------|
| Average hold time for status | 15 minutes |
| Cost per status inquiry call | $8-12 |
| Customers want 24/7 access | Office hours only |
| Multiple calls for updates | Frustrated customers |

## 💡 The Solution: Customer Self-Service Portal

A web application that allows Zurich Canada customers to:

- ✅ **Track claims in real-time** — Visual progress tracker shows exactly where each claim stands
- ✅ **Upload documents securely** — Drag & drop photos, receipts, police reports
- ✅ **Get instant notifications** — Status change alerts without calling
- ✅ **File new claims 24/7** — No waiting for business hours
- ✅ **View complete history** — All claims in one place

## 📊 Business Impact

| Metric | Projected Improvement |
|--------|----------------------|
| Call center volume | ↓ 40% reduction |
| Customer satisfaction | ↑ Better experience |
| Cost savings | $8-12 saved per avoided call |
| 24/7 availability | Always accessible |

## 🛠️ Tech Stack

- **React 19** — Latest React with hooks
- **Zustand** — Lightweight state management
- **Framer Motion** — Smooth animations
- **Recharts** — Data visualization
- **Vite** — Fast build tooling
- **date-fns** — Date formatting

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Features Demo

The app includes an **interactive demo tour** that walks through:

1. Customer dashboard with claim overview
2. Real-time claim status tracking
3. Document upload with drag & drop
4. Notification system
5. Claim filing workflow

## 🎨 Key Components

### Claim Progress Tracker
Visual timeline showing: **Submitted → Under Review → Decision → Payment**

### Document Upload
- Drag & drop interface
- Supports PDF, Word, JPEG, PNG
- Upload progress indicators
- File validation

### Status Notifications
- Real-time status updates
- Action required alerts
- Payment notifications

## 📁 Project Structure

```
src/
├── components/
│   ├── DemoTour/          # Interactive feature tour
│   ├── DocumentUpload/    # Drag & drop upload
│   ├── Layout/            # Navigation & header
│   └── WelcomeModal/      # Onboarding modal
├── pages/
│   ├── Dashboard/         # Customer's claim overview
│   ├── Claims/            # Claim list & details
│   └── Settings/          # Profile management
└── store/
    ├── claimsStore.js     # Claim data & actions
    └── demoStore.js       # Demo tour state
```

## 👤 Built By

**Nehman Rahimi** — January 2026

A self-service solution proposal for Zurich Canada demonstrating how modern web technology can reduce support costs while improving customer experience.

---

*"We are committed to inclusion, accessibility, and equity."* — Zurich Canada

