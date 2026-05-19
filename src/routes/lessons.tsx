import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/lessons")({
  head: () => ({
    meta: [{ title: "Lessons — GenBridge" }],
  }),
  component: Lessons,
});

function Lessons() {
  return (
    <>
      <section className="unified-panel search-box-container">
        <label htmlFor="hub-search" className="search-title-text">
          What do you want to learn to do today?
        </label>
        <form action="/search" method="GET" className="search-horizontal-form">
          <input
            type="text"
            id="hub-search"
            name="q"
            placeholder="Try typing 'banking', 'whatsapp', or 'video call'..."
            className="search-text-input"
          />
          <button type="submit" className="search-action-btn">
            Search
          </button>
        </form>
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
                Watch this short welcome video to see how easily you can
                navigate our website and start learning.
              </p>
            </div>
            <div className="card-button-anchor">
              <button className="card-primary-btn">Watch Video</button>
            </div>
          </article>
        </div>

        <div className="three-column-lessons-grid">
          <article className="unified-panel learning-card">
            <div className="card-media-frame">
              <span className="media-indicator-icon">📄</span>
            </div>
            <div className="card-text-block">
              <span className="badge-tag read-tag">Read a Guide</span>
              <h4 className="card-main-heading">What is Logging in?</h4>
              <p className="card-body-prose">
                This guide covers the basics of logging in to websites,
                including how to create a username and password and how to stay
                safe while logging in online.
              </p>
            </div>
            <div className="card-button-anchor">
              <button className="card-primary-btn">Read Guide</button>
            </div>
          </article>

          <article className="unified-panel learning-card">
            <div className="card-media-frame">
              <span className="media-indicator-icon">▶</span>
            </div>
            <div className="card-text-block">
              <span className="badge-tag watch-tag">Watch a Video</span>
              <h4 className="card-main-heading">
                How to join a meeting on GoogleMeet
              </h4>
              <p className="card-body-prose">
                Learn how to join a Google Meet meeting from your device.
              </p>
            </div>
            <div className="card-button-anchor">
              <button className="card-primary-btn">Watch Video</button>
            </div>
          </article>

          <article className="unified-panel learning-card">
            <div className="card-media-frame">
              <span className="media-indicator-icon">🚀</span>
            </div>
            <div className="card-text-block">
              <span className="badge-tag try-tag">Try it Safely</span>
              <h4 className="card-main-heading">
                Practice Sending a Digital Payment
              </h4>
              <p className="card-body-prose">
                A fake interactive wallet screen. Type dummy values and try keys
                securely without using any real money.
              </p>
            </div>
            <div className="card-button-anchor">
              <button className="card-primary-btn">Start Activity</button>
            </div>
          </article>
        </div>

        <div className="hub-pagination-row">
          <Link to="/home" className="hub-btn">
            Return to Home Page
          </Link>
        </div>
      </div>
    </>
  );
}