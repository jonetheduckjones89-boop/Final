
# ModelML - Clinical Document Automation

This is a Next.js 16 (App Router) project tailored for medical/clinical document automation. It features a polished, responsive UI with mock API integrations, ready to be connected to a real backend.

## Features

- **Landing Page**: Minimal, elegant hero section.
- **Intake Form**: Multi-step form for clinic & document context.
- **Results Dashboard**:
  - Top 10 Medical Actions
  - AI Clinical Summary
  - Extracted Patient Details (editable)
  - Risk Flags & Warnings
  - Suggestions for Improvement
- **Sidebar Tools**:
  - Chat with Document (simulated AI)
  - Rewrite Tools (Simplify, Professional, Remove Jargon)
  - Export Options
- **History**: LocalStorage-based history of processed documents.
- **Mock APIs**: Simulated endpoints for upload, processing, results, chat, and rewrites.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks (SWR-style custom hooks)

## Getting Started

### Prerequisites

- Node.js 18+ installed.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repo-url>
    cd shadows
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

### Vercel / Render

1.  Build the project:
    ```bash
    npm run build
    ```

2.  Start the production server:
    ```bash
    npm run start
    ```

## Switching to Real APIs

To replace the mock APIs with real backend endpoints:

1.  **Upload**: Update `hooks/useUpload.ts` to point to your real upload endpoint. Ensure it returns a `jobId`.
2.  **Status**: Update `hooks/useJobStatus.ts` to poll your real status endpoint.
3.  **Results**: Update `hooks/useResults.ts` to fetch from your real results API.
4.  **Chat**: Update `hooks/useChat.ts` to send messages to your LLM backend.
5.  **Rewrite**: Update `app/api/mock/rewrite/route.ts` or call your backend directly from the component.

**Security Note**: When implementing the real backend, ensure all PHI (Protected Health Information) is handled securely. Use encrypted transport (HTTPS), do not log PHI to the client console, and follow HIPAA/GDPR best practices.

## Project Structure

- `app/`: Next.js App Router pages and API routes.
  - `api/mock/`: Mock API endpoints.
  - `intake/`: Intake form page.
  - `results/[jobId]/`: Results dashboard.
  - `history/`: History page.
- `components/`: Reusable UI components.
  - `custom/`: Project-specific components (Header, FileUploader, etc.).
  - `ui/`: shadcn/ui components.
- `hooks/`: Custom React hooks for data fetching.
- `lib/`: Utility functions and mock data.
- `public/`: Static assets.
