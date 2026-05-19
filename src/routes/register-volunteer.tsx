import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/register-volunteer")({
  head: () => ({ meta: [{ title: "Register as Volunteer — GenBridge" }] }),
  component: RegisterVolunteer,
});

const INTERNSHIP_OPTIONS = [
  "Host community meetings",
  "Teach sessions",
  "Write articles",
  "Create videos",
  "Code virtual simulation tryout activities",
];

function RegisterVolunteer() {
  const navigate = useNavigate();
  const [interested, setInterested] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate({ to: "/volunteer-dashboard" });
  }

  return (
    <>
      <section className="unified-panel auth-container">
        <div className="auth-content-box">
          <h2 className="auth-main-heading">Volunteer Registration</h2>
          <p className="auth-subtext">
            Thank you for joining GenBridge! Tell us a bit about yourself.
          </p>
          <form onSubmit={handleSubmit} className="auth-vertical-form">
            <div className="form-input-group">
              <label htmlFor="rv-name" className="form-label-text">Full Name</label>
              <input id="rv-name" name="name" required className="search-text-input" />
            </div>
            <div className="form-input-group">
              <label htmlFor="rv-username" className="form-label-text">Username (Email)</label>
              <input id="rv-username" type="email" name="username" required className="search-text-input" />
            </div>
            <div className="form-input-group">
              <label htmlFor="rv-password" className="form-label-text">Password</label>
              <input id="rv-password" type="password" name="password" required className="search-text-input" />
            </div>

            <label className="form-checkbox-row">
              <input
                type="checkbox"
                checked={interested}
                onChange={(e) => setInterested(e.target.checked)}
              />
              Interested in an internship?
            </label>

            {interested && (
              <>
                <div className="form-input-group">
                  <span className="form-label-text">Internship areas (pick any)</span>
                  <div className="form-multi-checkbox">
                    {INTERNSHIP_OPTIONS.map((opt) => (
                      <label key={opt} className="form-checkbox-row">
                        <input type="checkbox" name="internshipAreas" value={opt} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-input-group">
                  <label htmlFor="rv-period" className="form-label-text">Internship Time Period</label>
                  <select id="rv-period" name="period" className="form-select" defaultValue="">
                    <option value="" disabled>Select a period</option>
                    <option>1 month</option>
                    <option>3 months</option>
                    <option>6 months</option>
                    <option>12 months</option>
                  </select>
                </div>

                <div className="form-input-group">
                  <label htmlFor="rv-availability" className="form-label-text">Time Availability</label>
                  <select id="rv-availability" name="availability" className="form-select" defaultValue="">
                    <option value="" disabled>Select availability</option>
                    <option>Weekday mornings</option>
                    <option>Weekday evenings</option>
                    <option>Weekends</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </>
            )}

            <button type="submit" className="card-primary-btn">Register</button>
          </form>
          <p className="auth-switch-text">
            Already registered?{" "}
            <Link to="/volunteer-login" className="auth-inline-link">Log in here</Link>
          </p>
        </div>
      </section>
      <div className="hub-pagination-row">
        <Link to="/home" className="hub-btn">Return to Home Page</Link>
      </div>
    </>
  );
}