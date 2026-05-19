import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/community-meetings")({
  head: () => ({ meta: [{ title: "Community Meetings — GenBridge" }] }),
  component: CommunityMeetings,
});

export const MEETINGS = [
  { id: "1", topic: "Staying Safe on WhatsApp", date: "June 4, 2026", day: "Thursday", time: "5:00 PM IST" },
  { id: "2", topic: "Intro to Online Banking", date: "June 8, 2026", day: "Monday", time: "11:00 AM IST" },
  { id: "3", topic: "Video Calls with Family", date: "June 12, 2026", day: "Friday", time: "4:30 PM IST" },
  { id: "4", topic: "Spotting Scam Messages", date: "June 18, 2026", day: "Thursday", time: "6:00 PM IST" },
];

function CommunityMeetings() {
  return (
    <>
      <section className="unified-panel welcome-landing-container" style={{ minHeight: "auto", padding: "2rem" }}>
        <div className="welcome-landing-content">
          <h1 className="welcome-landing-heading">Upcoming Community Meetings</h1>
          <p className="welcome-landing-mission">Join live, friendly sessions hosted by our volunteers.</p>
        </div>
      </section>

      <div className="meeting-list">
        {MEETINGS.map((m) => (
          <article key={m.id} className="unified-panel meeting-row">
            <Link to="/meeting-signup/$id" params={{ id: m.id }} className="meeting-signup-btn">
              Sign Up
            </Link>
            <div className="meeting-info">
              <h2 className="meeting-topic">{m.topic}</h2>
              <p className="meeting-detail">📅 {m.day}, {m.date}</p>
              <p className="meeting-detail">🕒 {m.time}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="hub-pagination-row">
        <Link to="/home" className="hub-btn">Return to Home Page</Link>
      </div>
    </>
  );
}