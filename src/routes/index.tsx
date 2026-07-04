import { createFileRoute } from "@tanstack/react-router";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return (
    // TODO: Implement the Mission Control / App Shell for AEGIS as per ROADMAP.md Phase 3.
    // This will be the main entry point for the application.
    <div className="flex min-h-screen items-center justify-center">
      <h1>Welcome to AEGIS</h1>
    </div>
  );
}
