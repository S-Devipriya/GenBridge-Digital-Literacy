import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/lessons")({
  head: () => ({ meta: [{ title: "Lessons — GenBridge" }] }),
  component: Lessons,
});

type LessonType = "All" | "Videos" | "Articles" | "Tryouts";

const FILTERS: { label: LessonType; cls: string }[] = [
  { label: "All", cls: "" },
  { label: "Videos", cls: "chip-videos" },
  { label: "Articles", cls: "chip-articles" },
  { label: "Tryouts", cls: "chip-tryouts" },
];

const LESSONS: { title: string; type: Exclude<LessonType, "All">; desc: string; cta: string; icon: string; tag: string; tagClass: string }[] = [
  { title: "What is Logging in?", type: "Articles", desc: "Learn how usernames and passwords keep you safe online.", cta: "Read Guide", icon: "📄", tag: "Read", tagClass: "read-tag" },
  { title: "Join a Google Meet", type: "Videos", desc: "Step-by-step video on joining a meeting from your device.", cta: "Watch Video", icon: "▶", tag: "Watch", tagClass: "watch-tag" },
  { title: "Practice Sending a Payment", type: "Tryouts", desc: "Try a safe fake wallet — no real money used.", cta: "Start Activity", icon: "🚀", tag: "Try", tagClass: "try-tag" },
  { title: "Spotting Online Scams", type: "Articles", desc: "Common scams and how to avoid them.", cta: "Read Guide", icon: "📄", tag: "Read", tagClass: "read-tag" },
  { title: "Sending a WhatsApp Voice Note", type: "Videos", desc: "Record and send your first voice message.", cta: "Watch Video", icon: "▶", tag: "Watch", tagClass: "watch-tag" },
];

function Lessons() {
  const [filter, setFilter] = useState<LessonType>("All");
  const [query, setQuery] = useState("");

  const visible = filter === "All"
    ? LESSONS
    : LESSONS.filter((l) => l.type === filter);

  function handleVoice() {
    alert("Voice search coming soon — please tell us what you want to learn.");
  }

  return (
    <>
      <section className="unified-panel search-box-container">
        <label htmlFor="hub-search" className="search-title-text">
          What do you want to learn to do today?
        </label>
        <form onSubmit={(e) => e.preventDefault()} className="search-horizontal-form">
          <input
            type="text"
            id="hub-search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try 'banking', 'whatsapp', or 'video call'..."
            className="search-text-input"
          />
          <button type="button" className="voice-search-btn" onClick={handleVoice} aria-label="Voice search">
            🎤 Voice
          </button>
          <button type="submit" className="search-action-btn">Search</button>
        </form>
        <div className="lesson-filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f.label}
              type="button"
              className={`filter-chip ${f.cls}${filter === f.label ? " is-active" : ""}`}
              onClick={() => setFilter(f.label)}
            >
              {f.label}
            </button>
          ))}
          <Link to="/learning-paths" className="filter-chip chip-paths">
            Learning Paths
          </Link>
        </div>
      </section>

      <div className="hub-content-shelf">
        <h3 className="hub-main-title">Start with our recommended lessons</h3>

        <div className="three-column-lessons-grid margin-bottom-modifier">
          <article className="unified-panel learning-card">
            <div className="card-media-frame">
              <span className="media-indicator-icon">▶</span>
            </div>
            <div className="card-text-block">
              <span className="badge-tag welcome-tag">Welcome</span>
              <h4 className="card-main-heading">Welcome to GenBridge</h4>
              <p className="card-body-prose">
                A short welcome video showing how to navigate our website.
              </p>
            </div>
            <div className="card-button-anchor">
              <button className="card-primary-btn">Watch Video</button>
            </div>
          </article>
        </div>

        <div className="three-column-lessons-grid">
          {visible.map((l) => (
            <article key={l.title} className="unified-panel lesson-card-simple">
              <span className={`badge-tag ${l.tagClass}`}>{l.icon} {l.tag}</span>
              <h4 className="card-main-heading">{l.title}</h4>
              <p className="card-body-prose">{l.desc}</p>
              <div className="card-button-anchor">
                {l.type === "Learning Paths" ? (
                  <Link to="/learning-paths" className="card-primary-btn">{l.cta}</Link>
                ) : (
                  <button className="card-primary-btn">{l.cta}</button>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="hub-pagination-row">
          <Link to="/home" className="hub-btn">Return to Home Page</Link>
        </div>
      </div>
    </>
  );
}