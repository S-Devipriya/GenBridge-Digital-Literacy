import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Share Your Feedback — GenBridge" },
      {
        name: "description",
        content:
          "Tell us how we can make GenBridge better. Share your name, email or phone, and your feedback.",
      },
    ],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="unified-panel auth-container">
        <div className="auth-content-box">
          <h1 className="auth-main-heading">Share Your Feedback</h1>
          <p className="auth-subtext">
            We would love to hear your thoughts. Your feedback helps us make
            GenBridge better for everyone.
          </p>

          {submitted ? (
            <p className="auth-switch-text" role="status">
              Thank you! Your feedback has been received.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="auth-vertical-form">
              <div className="form-input-group">
                <label htmlFor="feedback-name" className="form-label-text">
                  Your Name
                </label>
                <input
                  type="text"
                  id="feedback-name"
                  name="name"
                  placeholder="Enter your full name"
                  className="search-text-input"
                  required
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="feedback-contact" className="form-label-text">
                  Your Email or Phone Number
                </label>
                <input
                  type="text"
                  id="feedback-contact"
                  name="contact"
                  placeholder="example@mail.com or +91 12345 67890"
                  className="search-text-input"
                  required
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="feedback-message" className="form-label-text">
                  Your Feedback
                </label>
                <textarea
                  id="feedback-message"
                  name="feedback"
                  placeholder="Tell us what you think, or what we can do better..."
                  className="search-text-input"
                  rows={6}
                  required
                />
              </div>

              <button
                type="submit"
                className="card-primary-btn auth-submit-btn"
              >
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      </section>

      <div className="hub-pagination-row">
        <Link to="/home" className="hub-btn">
          Return to Home Page
        </Link>
      </div>
    </>
  );
}