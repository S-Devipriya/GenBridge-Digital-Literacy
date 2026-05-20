import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/course/$id")({
  head: () => ({ meta: [{ title: "Course — GenBridge" }] }),
  component: CourseDetail,
});

type Item = { id: string; type: "Article" | "Video" | "Tryout"; title: string; action: string; tagClass: string };

const COURSE = {
  title: "Google Meet Fundamentals",
  difficulty: "Beginner",
  lessons: 5,
  time: "2 hours",
  items: [
    { id: "what-is-meet", type: "Article", title: "What is Google Meet?",       action: "Read",  tagClass: "read-tag" },
    { id: "install",      type: "Video",   title: "Install & sign in",           action: "Watch", tagClass: "watch-tag" },
    { id: "join-meeting", type: "Article", title: "Joining a meeting safely",    action: "Read",  tagClass: "read-tag" },
    { id: "in-call",      type: "Video",   title: "Camera, mic, and chat",       action: "Watch", tagClass: "watch-tag" },
    { id: "try-join",     type: "Tryout",  title: "Practice joining a meeting",  action: "Start", tagClass: "try-tag" },
  ] as Item[],
};

const RELATED = [
  { name: "Digital Basics", slug: "digital-basics" },
  { name: "Smart Phone Safety", slug: "smart-phone-safety" },
];

const ARTICLE_BODY: Record<string, { heading: string; body: string[] }> = {
  "what-is-meet": {
    heading: "What is Google Meet?",
    body: [
      "Google Meet is a free app that lets you see and talk to family, doctors, or friends through your phone or computer — just like a phone call, but with video.",
      "You can join a meeting by tapping a link someone sends you, or by entering a short meeting code. You do not need to install anything special on a computer; on a phone, the free Google Meet app works very well.",
      "In this course you will learn how to install Meet, join your first call, turn your camera and microphone on or off, and stay safe when meeting new people online.",
    ],
  },
  "join-meeting": {
    heading: "Joining a meeting safely",
    body: [
      "Always check who sent you the meeting link. If you do not recognise the sender, do not tap the link.",
      "When you open the link, Meet will ask for permission to use your camera and microphone. Tap Allow only when you are ready to be seen and heard.",
      "Before you join, you can preview yourself. Use this moment to check your lighting and tidy your background. Then tap Join now.",
    ],
  },
};

function CourseDetail() {
  const [activeId, setActiveId] = useState<string>("what-is-meet");
  const active = COURSE.items.find((i) => i.id === activeId)!;
  const isArticle = active.type === "Article" && ARTICLE_BODY[active.id];

  function handlePrint() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <>
      <div className="split-layout">
        <aside className="unified-panel split-pane">
          <h2 className="course-side-heading">{COURSE.title}</h2>
          <p className="course-side-meta">
            <strong>{COURSE.difficulty}</strong> · {COURSE.lessons} lessons · {COURSE.time}
          </p>

          <div className="lesson-pick-list">
            {COURSE.items.map((it) => (
              <button
                key={it.id}
                className={`lesson-pick-item ${activeId === it.id ? "active" : ""}`}
                onClick={() => setActiveId(it.id)}
                type="button"
              >
                <span className={`badge-tag ${it.tagClass}`}>{it.type}</span>
                <span className="lesson-pick-title">{it.title}</span>
                <span className="lesson-pick-action">{it.action}</span>
              </button>
            ))}
          </div>

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ margin: "1rem 0 0.25rem 0", fontSize: "1.125rem" }}>Related courses</h3>
            {RELATED.map((r) => (
              <Link key={r.slug} to="/learning-paths" className="lesson-pick-item" style={{ display: "block" }}>
                {r.name}
              </Link>
            ))}
            <Link to="/feedback" className="hub-btn" style={{ marginTop: "0.5rem" }}>
              Give Feedback
            </Link>
          </div>
        </aside>

        <section className="unified-panel">
          {isArticle ? (
            <article className="article-view">
              <button className="article-download-btn" onClick={handlePrint}>⬇ Download / Print</button>
              <h1>{ARTICLE_BODY[active.id].heading}</h1>
              {ARTICLE_BODY[active.id].body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </article>
          ) : (
            <div className="article-view">
              <h1>{active.title}</h1>
              <div className="card-media-frame" style={{ marginTop: "1rem" }}>
                <span className="media-indicator-icon">
                  {active.type === "Video" ? "▶" : "🚀"}
                </span>
              </div>
              <p>
                {active.type === "Video"
                  ? "Press play to start the video lesson."
                  : "Click below to launch the practice activity."}
              </p>
              <button className="card-primary-btn" style={{ maxWidth: "20rem" }}>
                {active.action}
              </button>
            </div>
          )}
        </section>
      </div>

      <div className="hub-pagination-row">
        <Link to="/learning-paths" className="hub-btn">Back to Learning Paths</Link>
      </div>
    </>
  );
}
