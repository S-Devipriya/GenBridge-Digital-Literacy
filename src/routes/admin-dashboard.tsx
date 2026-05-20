import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/admin-dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — GenBridge" }] }),
  component: AdminDashboard,
});

const METRICS = [
  { value: 1284, label: "Active Learners" },
  { value: 86, label: "Volunteers" },
  { value: 24, label: "Pending Review" },
  { value: 312, label: "Approved Items" },
];

type QueueItem = { id: number; type: string; title: string; by: string };
const INITIAL_QUEUE: QueueItem[] = [
  { id: 1, type: "Article",  title: "Spotting Online Scams (v2)", by: "Priya A." },
  { id: 2, type: "Video",    title: "Joining a Zoom Call",        by: "Ravi K." },
  { id: 3, type: "Tryout",   title: "Mock UPI Lab",               by: "Anand S." },
  { id: 4, type: "Meeting",  title: "Banking Basics — Mon 10AM",  by: "Sunita M." },
];

type User = { id: number; name: string; email: string; role: "Learner" | "Volunteer" };
const INITIAL_USERS: User[] = [
  { id: 1, name: "Asha Verma",  email: "asha@gmail.com",   role: "Learner" },
  { id: 2, name: "Priya A.",    email: "priya@gmail.com",  role: "Volunteer" },
  { id: 3, name: "Ravi Kumar",  email: "ravi@gmail.com",   role: "Volunteer" },
  { id: 4, name: "Meena Iyer",  email: "meena@gmail.com",  role: "Learner" },
];

function AdminDashboard() {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Learner" as User["role"] });

  function decide(id: number, _action: "approve" | "reject") {
    setQueue((q) => q.filter((x) => x.id !== id));
  }
  function removeUser(id: number) {
    setUsers((u) => u.filter((x) => x.id !== id));
  }
  function addUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    setUsers((u) => [...u, { id: Date.now(), ...newUser }]);
    setNewUser({ name: "", email: "", role: "Learner" });
  }

  return (
    <>
      <section className="unified-panel dashboard-profile-row">
        <div className="dashboard-avatar" aria-hidden>AD</div>
        <div style={{ flex: 1 }}>
          <h1 className="dashboard-greeting-name">Admin Dashboard</h1>
          <p className="dashboard-greeting-sub">Monitor activity, review submissions, and manage the community.</p>
        </div>
        <Link to="/learner-dashboard" className="hub-btn" style={{ maxWidth: "14rem", padding: "0.75rem 1rem" }}>
          📚 Learning Dashboard
        </Link>
      </section>

      <h2 className="section-heading">System Metrics</h2>
      <div className="metrics-grid">
        {METRICS.map((m) => (
          <div key={m.label} className="unified-panel metric-card">
            <p className="metric-value">{m.value}</p>
            <p className="metric-label">{m.label}</p>
          </div>
        ))}
      </div>

      <h2 className="section-heading">Volunteer Submission Queue</h2>
      <section className="unified-panel admin-section">
        {queue.length === 0 && <p>Queue is clear. Great work!</p>}
        {queue.map((q) => (
          <div key={q.id} className="admin-queue-item">
            <div>
              <p className="task-title">[{q.type}] {q.title}</p>
              <p className="task-meta">Submitted by {q.by}</p>
            </div>
            <div className="admin-actions">
              <button className="admin-btn admin-btn-approve" onClick={() => decide(q.id, "approve")}>Approve</button>
              <button className="admin-btn admin-btn-reject" onClick={() => decide(q.id, "reject")}>Reject</button>
            </div>
          </div>
        ))}
      </section>

      <h2 className="section-heading">Upload Approved Content</h2>
      <section className="unified-panel admin-section">
        <form
          onSubmit={(e) => { e.preventDefault(); alert("Content uploaded (demo)."); }}
          className="auth-vertical-form"
        >
          <div className="form-input-group">
            <label className="form-label-text">Title</label>
            <input className="search-text-input" required />
          </div>
          <div className="form-input-group">
            <label className="form-label-text">Tag</label>
            <select className="form-select" defaultValue="Article">
              <option>Article</option>
              <option>Video</option>
              <option>Tryout</option>
            </select>
          </div>
          <div className="form-input-group">
            <label className="form-label-text">Description</label>
            <textarea className="form-textarea" rows={3} required />
          </div>
          <div className="form-input-group">
            <label className="form-label-text">Content file (.pdf, .mp4, .html, .jar)</label>
            <input type="file" accept=".pdf,.mp4,.html,.jar" className="search-text-input" />
          </div>
          <button type="submit" className="card-primary-btn">Publish</button>
        </form>
      </section>

      <h2 className="section-heading">Manage Users</h2>
      <section className="unified-panel admin-section">
        {users.map((u) => (
          <div key={u.id} className="admin-user-item">
            <div>
              <p className="task-title">{u.name} <span className="task-meta" style={{ display: "inline", marginLeft: "0.5rem" }}>({u.role})</span></p>
              <p className="task-meta">{u.email}</p>
            </div>
            <div className="admin-actions">
              <button className="admin-btn admin-btn-reject" onClick={() => removeUser(u.id)}>Remove</button>
            </div>
          </div>
        ))}
        <form onSubmit={addUser} className="auth-vertical-form" style={{ marginTop: "1rem" }}>
          <h3 style={{ margin: 0 }}>Add a user</h3>
          <div className="form-input-group">
            <label className="form-label-text">Name</label>
            <input className="search-text-input" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          </div>
          <div className="form-input-group">
            <label className="form-label-text">Email</label>
            <input className="search-text-input" type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          </div>
          <div className="form-input-group">
            <label className="form-label-text">Role</label>
            <select className="form-select" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value as User["role"] })}>
              <option>Learner</option>
              <option>Volunteer</option>
            </select>
          </div>
          <button type="submit" className="admin-btn admin-btn-neutral" style={{ alignSelf: "flex-start" }}>Add User</button>
        </form>
      </section>

      <div className="hub-pagination-row">
        <Link to="/" className="hub-btn">Return to Home Page</Link>
      </div>
    </>
  );
}
