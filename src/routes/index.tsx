import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <section className="unified-panel welcome-landing-container">
      <div className="welcome-landing-content">
        <h1 className="welcome-landing-heading">Welcome to GenBridge</h1>
        <p className="welcome-landing-mission">
          Simple lessons. Safe practice. Stronger together.
        </p>
      </div>
    </section>
  );
}
