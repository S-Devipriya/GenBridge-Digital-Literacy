import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help — GenBridge" }] }),
  component: HelpPage,
});

function HelpPage() {
  return (
    <>
      <section className="unified-panel help-page-panel">
        <div className="help-page-header">
          <div>
            <h2 className="help-page-heading">How can we help?</h2>
            <p className="help-page-sub">
              Watch our short welcome video, or call our friendly helpline team.
            </p>
          </div>
          <a href="tel:+911234567890" className="help-call-btn">
            📞 Call Helpline
          </a>
        </div>

        <Link to="/video/$id" params={{ id: "welcome" }} className="help-video-card">
          <div className="help-video-thumb">
            <span className="media-indicator-icon">▶</span>
          </div>
          <div className="help-video-info">
            <span className="badge-tag watch-tag">▶ Watch</span>
            <h3 className="card-main-heading">Welcome to GenBridge</h3>
            <p className="card-body-prose">
              A short welcome video showing how to navigate our website.
            </p>
          </div>
        </Link>
      </section>

      <div className="hub-pagination-row">
        <Link to="/home" className="hub-btn">Return to Home Page</Link>
      </div>
    </>
  );
}