import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({ meta: [{ title: "My Bookmarks — GenBridge" }] }),
  component: Bookmarks,
});

const BOOKMARKS = [
  { title: "Join a Google Meet", tag: "Watch", tagClass: "watch-tag" },
  { title: "Spotting Online Scams", tag: "Read", tagClass: "read-tag" },
  { title: "Practice Sending a Payment", tag: "Try", tagClass: "try-tag" },
];

function Bookmarks() {
  return (
    <>
      <section className="unified-panel welcome-landing-container" style={{ minHeight: "auto", padding: "2rem" }}>
        <div className="welcome-landing-content">
          <h1 className="welcome-landing-heading">My Bookmarks</h1>
          <p className="welcome-landing-mission">Lessons you saved for later.</p>
        </div>
      </section>

      <div className="three-column-lessons-grid">
        {BOOKMARKS.map((b) => (
          <article key={b.title} className="unified-panel lesson-card-simple">
            <span className={`badge-tag ${b.tagClass}`}>{b.tag}</span>
            <h4 className="card-main-heading">{b.title}</h4>
            <div className="card-button-anchor">
              <button className="card-primary-btn">Open</button>
            </div>
          </article>
        ))}
      </div>

      <div className="hub-pagination-row">
        <Link to="/learner-dashboard" className="hub-btn">Back to Dashboard</Link>
      </div>
    </>
  );
}
