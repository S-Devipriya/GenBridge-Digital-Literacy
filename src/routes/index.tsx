import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <section className="unified-panel welcome-landing-container welcome-with-cta">
        <div className="welcome-landing-content">
          <h1 className="welcome-landing-heading">Welcome to GenBridge</h1>
          <p className="welcome-landing-mission">
            Bridging the digital gap across generations.
          </p>
          <Link to="/home" className="hub-btn welcome-cta-btn">Get Started →</Link>
        </div>
      </section>
    </>
  );
}
