import { createFileRoute, Link } from "@tanstack/react-router";
import { type FormEvent } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Log In — GenBridge" }],
  }),
  component: Login,
});

function Login() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <>
      <section className="unified-panel auth-container">
        <div className="auth-content-box">
          <h2 className="auth-main-heading">Log In</h2>
          <form onSubmit={handleSubmit} className="auth-vertical-form">
            <div className="form-input-group">
              <label htmlFor="login-email" className="form-label-text">Your Email Address</label>
              <input type="email" id="login-email" name="email" placeholder="example@mail.com" className="search-text-input" required />
            </div>
            <div className="form-input-group">
              <label htmlFor="login-password" className="form-label-text">Your Password</label>
              <input type="password" id="login-password" name="password" placeholder="Enter your password" className="search-text-input" required />
            </div>
            <button type="submit" className="card-primary-btn auth-submit-btn">Log In</button>
          </form>
          <p className="auth-switch-text">
            Don't have an account?{" "}
            <Link to="/register-volunteer" className="auth-inline-link">Click here to register</Link>
          </p>
        </div>
      </section>
      <div className="hub-pagination-row">
        <Link to="/" className="hub-btn">Return to Home Page</Link>
      </div>
    </>
  );
}