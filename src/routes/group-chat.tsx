import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/group-chat")({
  head: () => ({ meta: [{ title: "Group Chat — GenBridge" }] }),
  component: GroupChat,
});

const CATEGORIES = ["Chat and Connect", "General Help", "Success Stories", "Q&A"] as const;
type Category = (typeof CATEGORIES)[number];

const POSTS: { id: string; author: string; category: Category; time: string; title: string; preview: string }[] = [
  { id: "1", author: "Ramesh", category: "Success Stories", time: "2 hours ago", title: "I made my first video call!", preview: "Today I called my granddaughter on WhatsApp video and it worked..." },
  { id: "2", author: "Priya", category: "General Help", time: "5 hours ago", title: "How do I change my phone wallpaper?", preview: "Can someone explain step by step how to set a new wallpaper..." },
  { id: "3", author: "Suresh", category: "Q&A", time: "Yesterday", title: "Is online banking safe?", preview: "I want to start using my bank's app but I'm worried about safety..." },
  { id: "4", author: "Meena", category: "Chat and Connect", time: "Yesterday", title: "Good morning everyone!", preview: "Just wanted to wish all of you a wonderful day full of learning..." },
];

function GroupChat() {
  const [active, setActive] = useState<Category | "All">("All");
  const [message, setMessage] = useState("");
  const [cat, setCat] = useState<Category>("Chat and Connect");

  const visible = active === "All" ? POSTS : POSTS.filter((p) => p.category === active);

  function handlePost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Post created (demo).");
    setMessage("");
  }

  return (
    <>
      <section className="unified-panel forum-compose">
        <h1 className="hub-main-title" style={{ padding: 0 }}>Group Chat</h1>
        <form onSubmit={handlePost} className="forum-compose-row">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="search-text-input"
            required
          />
          <select value={cat} onChange={(e) => setCat(e.target.value as Category)} className="form-select" style={{ width: "auto" }}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="submit" className="search-action-btn">Create Post</button>
        </form>
      </section>

      <div className="forum-category-tabs">
        <button type="button" className={`forum-tab${active === "All" ? " is-active" : ""}`} onClick={() => setActive("All")}>All</button>
        {CATEGORIES.map((c) => (
          <button key={c} type="button" className={`forum-tab${active === c ? " is-active" : ""}`} onClick={() => setActive(c)}>{c}</button>
        ))}
      </div>

      <div className="forum-posts">
        {visible.map((p) => (
          <article key={p.id} className="unified-panel forum-post">
            <div className="forum-post-meta">
              <span>👤 {p.author} · {p.category}</span>
              <span>{p.time}</span>
            </div>
            <h2 className="forum-post-title">{p.title}</h2>
            <p className="forum-post-preview">{p.preview}</p>
          </article>
        ))}
      </div>

      <div className="hub-pagination-row">
        <Link to="/learner-dashboard" className="hub-btn">Back to Dashboard</Link>
      </div>
    </>
  );
}
