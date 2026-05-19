import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/register-volunteer")({
  head: () => ({
    meta: [{ title: "Register as Volunteer — GenBridge" }],
  }),
  component: RegisterVolunteer,
});

function RegisterVolunteer() {
  return (
    <>
      <section className="unified-panel auth-container">
        <div className="auth-content-box">
          <h2 className="auth-main-heading">Volunteer Registration</h2>
          <p className="auth-subtext">
            Thank you for your interest in volunteering! This page is coming soon.
          </p>
        </div>
      </section>
      <div className="hub-pagination-row">
        <Link to="/home" className="hub-btn">Return to Home Page</Link>
      </div>
    </>
  );
}