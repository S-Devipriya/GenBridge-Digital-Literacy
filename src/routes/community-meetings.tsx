import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/community-meetings")({
  head: () => ({
    meta: [{ title: "Community Meetings — GenBridge" }],
  }),
  component: CommunityMeetings,
});

function CommunityMeetings() {
  return (
    <>
      <section className="unified-panel auth-container">
        <div className="auth-content-box">
          <h2 className="auth-main-heading">Community Meetings</h2>
          <p className="auth-subtext">
            Live online classes and community meetings will appear here soon.
          </p>
        </div>
      </section>
      <div className="hub-pagination-row">
        <Link to="/home" className="hub-btn">Return to Home Page</Link>
      </div>
    </>
  );
}