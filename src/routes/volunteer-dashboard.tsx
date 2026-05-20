import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/volunteer-dashboard")({
  head: () => ({ meta: [{ title: "Volunteer Dashboard — GenBridge" }] }),
  component: VolunteerDashboard,
});

const METRICS = [
  { value: 4, label: "Meetings Assigned" },
  { value: 12, label: "Content Submitted" },
  { value: 3, label: "Under Review" },
  { value: 47, label: "Hours Contributed" },
];

const BADGES = [
  { icon: "🏅", label: "First Meeting" },
  { icon: "✍️", label: "5 Articles Published" },
  { icon: "🎬", label: "Video Creator" },
  { icon: "🌟", label: "Top Mentor" },
];

const TASKS = [
  { title: "Community Meeting: Online Banking Basics", meta: "Mon, June 8 — 11:00 AM IST", status: "assigned", label: "Assigned" },
  { title: "Article: Spotting Online Scams", meta: "Submitted on May 14", status: "approved", label: "Approved" },
  { title: "Tryout Code: WhatsApp Voice Note Simulator", meta: "Submitted on May 17", status: "review", label: "Under Review" },
  { title: "Community Meeting: Video Calls with Family", meta: "Fri, June 12 — 4:30 PM IST", status: "assigned", label: "Assigned" },
];

function VolunteerDashboard() {
  return (
    <>
      <section className="unified-panel dashboard-profile-row">
        <div className="dashboard-avatar" aria-hidden>PA</div>
        <div style={{ flex: 1 }}>
          <h1 className="dashboard-greeting-name">Welcome back, Priya!</h1>
          <p className="dashboard-greeting-sub">Thank you for everything you do for our learners.</p>
        </div>
        <Link to="/learner-dashboard" className="hub-btn" style={{ maxWidth: "14rem", padding: "0.75rem 1rem" }}>
          📚 Learning Dashboard
        </Link>
      </section>

      <h2 className="section-heading">Your Impact</h2>
      <div className="metrics-grid">
        {METRICS.map((m) => (
          <div key={m.label} className="unified-panel metric-card">
            <p className="metric-value">{m.value}</p>
            <p className="metric-label">{m.label}</p>
          </div>
        ))}
      </div>

      <h2 className="section-heading">Achievement Badges</h2>
      <section className="unified-panel achievement-panel">
        {BADGES.slice(0, 4).map((b) => (
          <Link key={b.label} to="/badges" className="achievement-tile">
            <span className="achievement-icon">{b.icon}</span>
            <span className="achievement-label">{b.label}</span>
          </Link>
        ))}
        <Link to="/badges" className="see-all-tile">See all →</Link>
      </section>

      <h2 className="section-heading">My Tasks</h2>
      <section className="unified-panel task-list">
        {TASKS.map((t) => (
          <div key={t.title} className="task-item">
            <div>
              <p className="task-title">{t.title}</p>
              <p className="task-meta">{t.meta}</p>
            </div>
            <span className={`task-status status-${t.status}`}>{t.label}</span>
          </div>
        ))}
      </section>

      <div className="hub-pagination-row">
        <Link to="/home" className="hub-btn">Return to Home Page</Link>
      </div>
    </>
  );
}