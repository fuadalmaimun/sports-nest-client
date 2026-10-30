# AGENT.md - Project Context & Rules

## 📌 Project Overview
**SportNest** is a dynamic web application dedicated to sports enthusiasts, providing features like sports equipment browsing/e-commerce, tournament updates, turf/venue booking, and community management.

* **Live Demo URL:** https://sportnest.nazmussakib.dev/

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** Next.js / React (TypeScript)
- **Styling:** Tailwind CSS, Shadcn UI / Radix UI
- **State Management:** Zustand / TanStack Query (React Query)
- **Backend / Database:** Node.js (Express / Next.js API Routes / Supabase / MongoDB)
- **Authentication:** NextAuth.js / Supabase Auth / Firebase
- **Deployment:** Vercel

---

## 🎯 Primary Directives for AI Agent

1. **Code Consistency & Quality:**
   - Use **TypeScript** strictly. Avoid using `any` types; define explicit interfaces or types for all components, API requests, and data models.
   - Follow clean code practices, modular component structure, and atomic design where applicable.
   - Prefer functional components and React Hooks.

2. **UI & Styling Guidelines:**
   - Use **Tailwind CSS** for layout and responsiveness.
   - Maintain a clean, modern, and accessible design system with mobile-first responsiveness.
   - Keep design consistent with existing sports-theme accents (dark/light contrast, energetic colors).

3. **Performance & Optimization:**
   - Optimize images using Next.js `<Image />` tags.
   - Ensure server components are used by default (if using Next.js App Router) and use client components (`'use client'`) only when necessary.
   - Keep API payloads minimal and ensure proper pagination or infinite scrolling for large datasets.

4. **Error Handling & Security:**
   - Always implement `try-catch` blocks or boundaries for asynchronous calls and API routes.
   - Validate input forms thoroughly (e.g., using Zod + React Hook Form).
   - Keep secrets, API keys, and sensitive tokens securely inside `.env.local`. Never leak them to the client.

---

## 📂 File Structure Conventions

- `app/` or `src/pages/`: Routing and page components
- `src/components/ui/`: Reusable UI elements (buttons, inputs, modals)
- `src/components/features/`: Feature-specific modules (booking, products, users)
- `src/lib/`: Helper functions, utilities, and client configurations
- `src/types/`: Centralized TypeScript interfaces and types
- `src/hooks/`: Custom React hooks

---

## 🚀 Common Commands

```bash
# Run Development Server
npm run dev

# Build Project
npm run build

# Run Linting
npm run lint