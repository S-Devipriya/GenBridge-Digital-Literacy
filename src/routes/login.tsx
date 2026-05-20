import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Log In — GenBridge" }],
  }),
  component: Login,
});

const ACCOUNTS: Record<string, { password: string; role: "admin" | "learner" | "volunteer"; redirect: string }> = {
  "admin@genbridge.org.in": { password: "123", role: "admin", redirect: "/admin-dashboard" },
  "priya@gmail.com":        { password: "567", role: "learner", redirect: "/learner-dashboard" },
  "asha@gmail.com":         { password: "890", role: "learner", redirect: "/learner-dashboard" },
};

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const acct = ACCOUNTS[email.trim().toLowerCase()];
    let role: "admin" | "learner" | "volunteer" = "learner";
    let redirect = "/learner-dashboard";
    if (acct) {
      if (acct.password !== password) {
        setError("Incorrect password.");
        return;
      }
      role = acct.role;
      redirect = acct.redirect;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("genbridge_role", role);
      localStorage.setItem("genbridge_learner", "1");
      window.dispatchEvent(new Event("genbridge-auth"));
    }
    navigate({ to: redirect });
  }
  return (
    <>
      <section className="unified-panel auth-container">
        <div className="auth-content-box">
          <h2 className="auth-main-heading">Log In</h2>
          <form onSubmit={handleSubmit} className="auth-vertical-form">
            <div className="form-input-group">
              <label htmlFor="login-email" className="form-label-text">Your Email Address</label>
              <input type="email" id="login-email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.com" className="search-text-input" required />
            </div>
            <div className="form-input-group">
              <label htmlFor="login-password" className="form-label-text">Your Password</label>
              <input type="password" id="login-password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="search-text-input" required />
            </div>
            {error && <p style={{ color: "#dc2626", fontWeight: 700, margin: 0 }}>{error}</p>}
            <button type="submit" className="card-primary-btn auth-submit-btn">Log In</button>
          </form>
          <p className="auth-switch-text">
            Don't have an account?{" "}
            <Link to="/register" className="auth-inline-link">Click here to register</Link>
          </p>
        </div>
      </section>
      <div className="hub-pagination-row">
        <Link to="/" className="hub-btn">Return to Home Page</Link>
      </div>
    </>
  );
}