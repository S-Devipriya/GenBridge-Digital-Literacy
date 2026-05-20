import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type FormEvent } from "react";

export const Route = createFileRoute("/volunteer-login")({
  head: () => ({ meta: [{ title: "Volunteer Log In — GenBridge" }] }),
  component: VolunteerLogin,
});

function VolunteerLogin() {
  const navigate = useNavigate();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("genbridge_role", "volunteer");
      localStorage.setItem("genbridge_learner", "1");
      localStorage.setItem("genbridge_name", "Priya");
      window.dispatchEvent(new Event("genbridge-auth"));
    }
    navigate({ to: "/volunteer-dashboard" });
  }
  return (
    <>
      <section className="unified-panel auth-container">
        <div className="auth-content-box">
          <h2 className="auth-main-heading">Volunteer Log In</h2>
          <form onSubmit={handleSubmit} className="auth-vertical-form">
            <div className="form-input-group">
              <label htmlFor="v-email" className="form-label-text">Your Email Address</label>
              <input type="email" id="v-email" name="email" placeholder="example@mail.com" className="search-text-input" required />
            </div>
            <div className="form-input-group">
              <label htmlFor="v-password" className="form-label-text">Your Password</label>
              <input type="password" id="v-password" name="password" placeholder="Enter your password" className="search-text-input" required />
            </div>
            <button type="submit" className="card-primary-btn">Log In</button>
          </form>
          <p className="auth-switch-text">
            Not registered as Volunteer?{" "}
            <Link to="/register-volunteer" className="auth-inline-link">Register Now</Link>
          </p>
        </div>
      </section>
      <div className="hub-pagination-row">
        <Link to="/home" className="hub-btn">Return to Home Page</Link>
      </div>
    </>
  );
}