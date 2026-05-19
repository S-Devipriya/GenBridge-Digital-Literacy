import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MEETINGS } from "./community-meetings";

export const Route = createFileRoute("/meeting-signup/$id")({
  head: () => ({ meta: [{ title: "Sign Up — Community Meeting" }] }),
  component: MeetingSignup,
});

function MeetingSignup() {
  const { id } = Route.useParams();
  const meeting = MEETINGS.find((m) => m.id === id) ?? MEETINGS[0];
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="unified-panel auth-container">
        <div className="auth-content-box">
          <h2 className="auth-main-heading">{meeting.topic}</h2>
          <p className="auth-subtext">
            📅 {meeting.day}, {meeting.date}<br />
            🕒 {meeting.time}
          </p>
          <p className="auth-subtext">
            Join us for a friendly, beginner-friendly session led by a GenBridge volunteer.
            Sign up below to reserve your spot.
          </p>

          {submitted ? (
            <p className="auth-subtext" style={{ color: "#065f46", fontWeight: 700 }}>
              ✅ You're signed up! We'll see you there.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="auth-vertical-form">
              <div className="form-input-group">
                <label htmlFor="ms-name" className="form-label-text">Your Name</label>
                <input id="ms-name" name="name" required className="search-text-input" />
              </div>
              <div className="form-input-group">
                <label htmlFor="ms-contact" className="form-label-text">Email or Phone Number</label>
                <input id="ms-contact" name="contact" required className="search-text-input" />
              </div>
              <label className="form-checkbox-row">
                <input type="checkbox" name="reminder" defaultChecked />
                Send me a reminder before the meeting
              </label>
              <button type="submit" className="card-primary-btn">Confirm Sign Up</button>
            </form>
          )}
        </div>
      </section>
      <div className="hub-pagination-row">
        <Link to="/community-meetings" className="hub-btn">Back to Meetings</Link>
      </div>
    </>
  );
}