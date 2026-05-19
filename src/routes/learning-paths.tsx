import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/learning-paths")({
  head: () => ({ meta: [{ title: "Learning Paths — GenBridge" }] }),
  component: LearningPaths,
});

const COURSES = [
  { name: "Digital Basics", lessons: 8, hours: 3, progress: 60 },
  { name: "GoogleMeet Fundamentals", lessons: 5, hours: 2, progress: 20 },
  { name: "Smart Phone Safety", lessons: 6, hours: 2.5, progress: 0 },
  { name: "Online Banking", lessons: 7, hours: 3, progress: 40 },
];

function LearningPaths() {
  return (
    <>
      <section className="unified-panel welcome-landing-container" style={{ minHeight: "auto", padding: "2rem" }}>
        <div className="welcome-landing-content">
          <h1 className="welcome-landing-heading">Learning Paths</h1>
          <p className="welcome-landing-mission">
            Pick a course and learn step by step at your own pace.
          </p>
        </div>
      </section>

      <div className="course-list">
        {COURSES.map((c) => (
          <article key={c.name} className="unified-panel course-row">
            <div className="course-info-block">
              <h2 className="course-title">{c.name}</h2>
              <p className="course-meta"><strong>{c.lessons}</strong> lessons</p>
              <p className="course-meta">Estimated time: <strong>{c.hours} hours</strong></p>
            </div>
            <div className="course-cta-block">
              <div className="course-progress-track">
                <div className="course-progress-fill" style={{ width: `${c.progress}%` }} />
              </div>
              <p className="course-progress-label">{c.progress}% complete</p>
              <button type="button" className="course-start-btn">
                {c.progress > 0 ? "Continue" : "Start"}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="hub-pagination-row">
        <Link to="/lessons" className="hub-btn">Back to Lessons</Link>
      </div>
    </>
  );
}