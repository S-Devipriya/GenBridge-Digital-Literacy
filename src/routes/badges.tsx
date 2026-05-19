import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/badges")({
  head: () => ({ meta: [{ title: "My Badges — GenBridge" }] }),
  component: Badges,
});

const BADGES = [
  { icon: "🎉", label: "Logged In!", desc: "Welcome to GenBridge.", earned: true },
  { icon: "📚", label: "First Lesson", desc: "Completed your first lesson.", earned: true },
  { icon: "💬", label: "First Post", desc: "Shared your first message.", earned: true },
  { icon: "📅", label: "Meeting Joined", desc: "Attended a community meeting.", earned: true },
  { icon: "⭐", label: "Star Learner", desc: "Complete 10 lessons.", earned: false },
  { icon: "🏆", label: "Champion", desc: "Finish a learning path.", earned: false },
];

function Badges() {
  return (
    <>
      <section className="unified-panel welcome-landing-container" style={{ minHeight: "auto", padding: "2rem" }}>
        <div className="welcome-landing-content">
          <h1 className="welcome-landing-heading">Your Achievement Badges</h1>
          <p className="welcome-landing-mission">Earn badges as you learn and connect.</p>
        </div>
      </section>

      <div className="three-column-lessons-grid">
        {BADGES.map((b) => (
          <article key={b.label} className="unified-panel lesson-card-simple" style={{ opacity: b.earned ? 1 : 0.5, textAlign: "center" }}>
            <div style={{ fontSize: "3rem" }}>{b.icon}</div>
            <h4 className="card-main-heading">{b.label}</h4>
            <p className="card-body-prose">{b.desc}</p>
            <span className={`badge-tag ${b.earned ? "welcome-tag" : "read-tag"}`} style={{ margin: "0 auto" }}>
              {b.earned ? "Earned" : "Locked"}
            </span>
          </article>
        ))}
      </div>

      <div className="hub-pagination-row">
        <Link to="/learner-dashboard" className="hub-btn">Back to Dashboard</Link>
      </div>
    </>
  );
}
