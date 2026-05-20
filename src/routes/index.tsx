import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <section className="unified-panel welcome-landing-container">
        <div className="welcome-landing-content">
          <h1 className="welcome-landing-heading">Welcome to GenBridge</h1>
          <p className="welcome-landing-mission">
            Bridging the digital gap across generations.
          </p>
        </div>
      </section>
      <div className="hub-pagination-row">
        <Link to="/home" className="hub-btn">Get Started →</Link>
      </div>
    </>
  );
}
