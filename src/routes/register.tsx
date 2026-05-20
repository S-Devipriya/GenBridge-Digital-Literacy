import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — GenBridge" }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  return (
    <>
      <section className="unified-panel auth-container">
        <div className="auth-content-box">
          <h2 className="auth-main-heading">What would you like to do at GenBridge?</h2>
          <p className="auth-subtext">Pick the path that fits you best.</p>
          <div className="dashboard-features-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <button
              type="button"
              className="dashboard-nav-card theme-pastel-blue"
              onClick={() => navigate({ to: "/register-learner" })}
            >
              <span className="dashboard-card-icon">📖</span>
              <span className="dashboard-card-label">Learn and Explore Courses</span>
            </button>
            <button
              type="button"
              className="dashboard-nav-card theme-pastel-purple"
              onClick={() => navigate({ to: "/register-volunteer" })}
            >
              <span className="dashboard-card-icon">💖</span>
              <span className="dashboard-card-label">Volunteer</span>
            </button>
          </div>
          <p className="auth-switch-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-inline-link">Log in here</Link>
          </p>
        </div>
      </section>
      <div className="hub-pagination-row">
        <Link to="/" className="hub-btn">Return to Home Page</Link>
      </div>
    </>
  );
}
