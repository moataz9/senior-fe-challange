# senior-FE-challage

Below is the task description translated into English and formatted as a GitHub README. You can copy this directly into your `README.md` file.

---

## Senior Front-End Developer Challenge

### Summary

Build a Single Page Application (SPA) using React and TypeScript that fetches data from a GraphQL API and displays it in interactive charts (line, bar, pie) for complex dataset analysis. Apply advanced performance optimizations (SSR/SSG, lazy loading), ensure WCAG 2.1 accessibility compliance, write unit & integration tests, and set up a CI/CD pipeline with GitHub Actions for deployment to Vercel.

---

## Table of Contents

- [Features](#features)
- [Architecture & Stack](#architecture--stack)
- [Data Visualization](#data-visualization)
- [Interactivity](#interactivity)
- [State Management & Caching](#state-management--caching)
- [Performance & SEO](#performance--seo)
- [Accessibility & Audit](#accessibility--audit)
- [Technical Requirements](#technical-requirements)
- [Evaluation Criteria](#evaluation-criteria)
- [Delivery](#delivery)
- [Bonus (Optional)](#bonus-optional)

---

## Features

- Fetch data via GraphQL (Apollo Client)
- Render interactive charts (line, bar, pie)
- Client-side filtering, sorting, pagination
- Global state management & caching
- Server-Side Rendering (SSR) / Static Site Generation (SSG)
- High Lighthouse scores (≥90)
- WCAG 2.1 accessibility compliance
- Unit & integration tests (Jest + React Testing Library)
- CI/CD pipeline and Vercel deployment

---

## Architecture & Stack

- **Framework:** Next.js (React 18 + TypeScript)
- **Data Layer:** Apollo Client for GraphQL queries
- **Build & Deployment:**

  - GitHub Actions for linting, building, testing
  - Automatic deploy to Vercel

---

## Data Visualization

- **Charts:**

  - Line, bar, and pie charts
  - Use Recharts or D3.js for rendering

- **Dataset:**

  - Consume structured data from GraphQL
  - Visualize time series and categorical distributions

---

## Interactivity

- **Filtering & Sorting:**

  - Multi-criteria search and sort controls

- **Pagination:**

  - Table view with 5–10 rows per page
  - Page navigation controls

---

## State Management & Caching

- Use **React Query** (or Redux Toolkit) to:

  - Cache repeated API calls
  - Manage global loading and error states
  - Invalidate and refetch data on demand

---

## Performance & SEO

- Implement **SSR** and/or **SSG** with Next.js to:

  - Reduce Time to First Byte (TTFB)
  - Improve SEO crawlability

- **Lazy load** images and heavy components
- Aim for 90+ in Performance and Best Practices in Lighthouse

---

## Accessibility & Audit

- Follow **WCAG 2.1** AA guidelines:

  - Proper `aria-` attributes
  - Sufficient color contrast
  - Keyboard navigation and focus management

- Achieve a Lighthouse Accessibility score ≥90

---

## Technical Requirements

- **Languages & Libraries:**

  - React 18, TypeScript, Next.js
  - Apollo Client (GraphQL)
  - Recharts or D3.js for charts
  - React Query or Redux Toolkit for state

- **Testing:**

  - Jest and React Testing Library
  - Minimum 80% code coverage

- **CI/CD:**

  - GitHub Actions workflow for lint, build, test
  - Automatic deploy to Vercel

---

## Evaluation Criteria

1. **Code Quality & Architecture**

   - Modular design, reusable components, SOLID principles

2. **Accessibility**

   - Compliance with WCAG 2.1 AA

3. **Test Coverage**

   - ≥80% unit & integration tests

4. **Performance**

   - Lighthouse Performance ≥90

5. **CI/CD & Deployment**

   - Reliable pipeline and live demo

---

## Delivery

- Push a **public GitHub repository** including:

  - Complete source code
  - `README.md` with instructions
  - `.env.example` for environment variables

- Share the **Vercel deployment URL**
- Document any known caveats in the README

---

## Bonus (Optional)

- Dark/light theme with persisted user preference
- Offline support via Service Worker (PWA)
- Real-time data synchronization using WebSockets or SSE

---

Feel free to customize any section to better match your project’s conventions. Good luck!

This is a [Next.js](https://nextjs.org) application that visualizes country, language, and currency data using interactive charts. It uses GraphQL to fetch data from [countries.trevorblades.com](https://countries.trevorblades.com/).

## Features

- Interactive Pie, Bar, and Line charts
- Filtering, sorting, and pagination controls
- Dark/light theme support
- Data fetched from a public GraphQL API

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/moataz9/senior-fe-challange.git
   cd senior-fe-challange
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables:**

   Copy `.env.example` to `.env.local` and ensure the following variable is set:

   ```env
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://countries.trevorblades.com/
   ```

### Running the Development Server

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `dev` – Start the development server
- `build` – Build the app for production
- `start` – Start the production server
- `lint` – Run ESLint

### Project Structure

- `app/` – Next.js app directory (pages, layouts)
- `components/` – Reusable React components (charts, UI)
- `constants/` – Color and theme constants
- `graphql/` – GraphQL queries and related logic
- `hooks/` – Custom React hooks
- `lib/` – Utility libraries (data loading, etc.)
- `public/` – Static assets
- `store/` – Redux store and slices
- `types/` – TypeScript types

### Environment Variables

- `NEXT_PUBLIC_GRAPHQL_ENDPOINT` – The GraphQL API endpoint (default: `https://countries.trevorblades.com/`)

### Testing

This project uses [Jest](https://jestjs.io/) and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for unit tests.

```sh
npm test
```

### Deployment

You can deploy this app on [Vercel](https://vercel.com/) or any platform that supports Next.js.

---

## Known Caveats

- **Public API Limitations:** The app relies on [countries.trevorblades.com](https://countries.trevorblades.com/), a public GraphQL API. If the API is down or rate-limited, data may not load or may be incomplete.
- **No Authentication:** All data is public and there is no user authentication or authorization.
- **Data Freshness:** The country, language, and currency data is static and may not reflect the most recent geopolitical changes.
- **Browser Compatibility:** The app is tested on the latest versions of Chrome, Firefox, and Edge. Older browsers may not be fully supported.
- **Accessibility:** While basic accessibility is considered, some interactive chart elements may not be fully accessible to screen readers.
- **Mobile Responsiveness:** The UI is responsive, but complex charts may be harder to read on small screens.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Recharts Documentation](https://recharts.org/en-US/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [GraphQL](https://graphql.org/)
