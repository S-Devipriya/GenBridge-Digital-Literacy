import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/helpline")({
  head: () => ({
    meta: [{ title: "Helpline — GenBridge" }],
  }),
  component: Helpline,
});

function Helpline() {
  return (
    <>
      <section className="unified-panel helpline-container">
        <div className="helpline-content-box">
          <h2 className="helpline-main-heading">Need Direct Assistance?</h2>
          <p className="helpline-subtext">
            You can speak directly with one of our friendly volunteers right now.
          </p>
          <a href="tel:+911234567890" className="helpline-call-target">
            Call Helpline: +91 12345 67890
          </a>
          <p className="helpline-availability">
            Our team is available every day to guide you step-by-step.
          </p>
        </div>
      </section>
      <div className="hub-pagination-row">
        <Link to="/home" className="hub-btn">Return to Home Page</Link>
      </div>
    </>
  );
}