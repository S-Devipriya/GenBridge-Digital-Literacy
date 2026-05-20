import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [{ title: "Home — GenBridge" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="unified-panel welcome-landing-container welcome-tight">
        <div className="welcome-landing-content">
          <h1 className="welcome-landing-heading">
            Welcome to Your Digital Learning Journey!
          </h1>
          <p className="welcome-landing-mission">
            Simple lessons. Safe practice. Stronger together.
          </p>
        </div>
      </section>

      <div className="dashboard-features-grid home-grid-tight">
        <Link to="/lessons" className="dashboard-nav-card theme-pastel-blue">
          <span className="dashboard-card-icon">📖</span>
          <span className="dashboard-card-label">Start Learning</span>
        </Link>
        <Link
          to="/community-meetings"
          className="dashboard-nav-card theme-pastel-green"
        >
          <span className="dashboard-card-icon">👥</span>
          <span className="dashboard-card-label">Join Community Meetings</span>
        </Link>
        <Link
          to="/login"
          className="dashboard-nav-card theme-pastel-purple"
        >
          <span className="dashboard-card-icon">💖</span>
          <span className="dashboard-card-label">Volunteer With Us</span>
        </Link>
        <Link to="/helpline" className="dashboard-nav-card theme-pastel-orange">
          <span className="dashboard-card-icon">🎧</span>
          <span className="dashboard-card-label">Get Help</span>
        </Link>
      </div>
    </>
  );
}