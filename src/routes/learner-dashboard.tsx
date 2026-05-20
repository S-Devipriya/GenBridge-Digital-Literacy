import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/learner-dashboard")({
  head: () => ({ meta: [{ title: "My Dashboard — GenBridge" }] }),
  component: LearnerDashboard,
});

const BADGES = [
  { icon: "🎉", label: "Logged In!" },
  { icon: "📚", label: "First Lesson" },
  { icon: "💬", label: "First Post" },
  { icon: "📅", label: "Meeting Joined" },
];

function LearnerDashboard() {
  return (
    <>
      <section className="unified-panel learner-profile-row">
        <div className="learner-profile-left">
          <div className="dashboard-avatar">A</div>
          <div>
            <h1 className="dashboard-greeting-name">Welcome back, Asha!</h1>
            <p className="dashboard-greeting-sub">Ready to learn something new today?</p>
          </div>
        </div>
        <div className="learner-level-badge">
          <span className="learner-level-icon">🏆</span>
          <p className="learner-level-title">Curious Explorer</p>
          <p className="course-progress-label">Level 3</p>
        </div>
      </section>

      <div className="learner-big-buttons">
        <Link to="/lessons" className="learner-big-btn theme-pastel-blue">
          <span className="big-btn-icon">📖</span>
          Go Back to Lessons
        </Link>
        <Link to="/community-meetings" className="learner-big-btn theme-pastel-green">
          <span className="big-btn-icon">📅</span>
          Upcoming Meetings
        </Link>
        <Link to="/bookmarks" className="learner-big-btn theme-pastel-pink">
          <span className="big-btn-icon">🔖</span>
          My Bookmarks
        </Link>
      </div>

      <h2 className="section-heading" style={{ marginTop: "1.5rem" }}>Your Achievement Badges</h2>
      <section className="unified-panel achievement-panel">
        {BADGES.slice(0, 4).map((b) => (
          <Link key={b.label} to="/badges" className="achievement-tile">
            <span className="achievement-icon">{b.icon}</span>
            <span className="achievement-label">{b.label}</span>
          </Link>
        ))}
        <Link to="/badges" className="see-all-tile">See all →</Link>
      </section>

      <div className="learner-big-buttons">
        <Link to="/learning-paths" className="learner-big-btn theme-pastel-yellow">
          <span className="big-btn-icon">📈</span>
          My Progress
        </Link>
        <Link to="/group-chat" className="learner-big-btn theme-pastel-purple">
          <span className="big-btn-icon">💬</span>
          Group Chat
        </Link>
        <Link to="/feedback" className="learner-big-btn theme-pastel-orange">
          <span className="big-btn-icon">📝</span>
          Feedback History
        </Link>
      </div>

      <div className="hub-pagination-row">
        <Link to="/home" className="hub-btn">Return to Home Page</Link>
      </div>
    </>
  );
}
