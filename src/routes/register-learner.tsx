import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { type FormEvent } from "react";

export const Route = createFileRoute("/register-learner")({
  head: () => ({ meta: [{ title: "Register as Learner — GenBridge" }] }),
  component: RegisterLearner,
});

function RegisterLearner() {
  const navigate = useNavigate();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("genbridge_role", "learner");
      localStorage.setItem("genbridge_learner", "1");
      localStorage.setItem("genbridge_name", "Asha");
      window.dispatchEvent(new Event("genbridge-auth"));
    }
    navigate({ to: "/learner-dashboard" });
  }
  return (
    <>
      <section className="unified-panel auth-container">
        <div className="auth-content-box">
          <h2 className="auth-main-heading">Learner Registration</h2>
          <p className="auth-subtext">Welcome! Just a few details to get you started.</p>
          <form onSubmit={handleSubmit} className="auth-vertical-form">
            <div className="form-input-group">
              <label htmlFor="rl-name" className="form-label-text">
                Full Name
              </label>
              <input id="rl-name" name="name" required className="search-text-input" />
            </div>
            <div className="form-input-group">
              <label htmlFor="rl-email" className="form-label-text">
                Email Address
              </label>
              <input
                id="rl-email"
                type="email"
                name="email"
                required
                className="search-text-input"
              />
            </div>
            <div className="form-input-group">
              <label htmlFor="rl-phone" className="form-label-text">
                Phone Number
              </label>
              <input id="rl-phone" type="tel" name="phone" className="search-text-input" />
            </div>
            <div className="form-input-group">
              <label htmlFor="rl-password" className="form-label-text">
                Password
              </label>
              <input
                id="rl-password"
                type="password"
                name="password"
                required
                className="search-text-input"
              />
            </div>
            <button type="submit" className="card-primary-btn">
              Create my account
            </button>
          </form>
          <p className="auth-switch-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-inline-link">
              Log in here
            </Link>
          </p>
        </div>
      </section>
      <div className="hub-pagination-row">
        <Link to="/" className="hub-btn">
          Return to Home Page
        </Link>
      </div>
    </>
  );
}
