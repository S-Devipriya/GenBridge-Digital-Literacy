import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/article/$id")({
  head: () => ({ meta: [{ title: "Article — GenBridge" }] }),
  component: ArticlePage,
});

const ARTICLES: Record<string, { heading: string; body: string[] }> = {
  "logging-in": {
    heading: "What is Logging in?",
    body: [
      "Logging in is how a website knows it is really you. You give it two things: a username (often your email or phone number) and a password — a secret only you should know.",
      "Why two things? The username tells the site which account to open. The password proves the account belongs to you. Together they are like a key and a name tag for your front door.",
      "A good password is long and hard for others to guess. Mix small letters, capital letters, numbers, and a symbol. Avoid your birthday, your name, or the word 'password'.",
      "Never share your password — not with friends, not with strangers on a phone call, not by email. A real bank or company will never ask for it.",
      "If a website looks different from usual, or asks for your password out of nowhere, stop. Close the page and open the app or site freshly yourself. When in doubt, ask a GenBridge volunteer.",
      "When you are done using a shared computer, look for a 'Log out' button and tap it. This locks the door behind you so the next person cannot open your account.",
    ],
  },
};

function ArticlePage() {
  const { id } = Route.useParams();
  const article = ARTICLES[id] ?? ARTICLES["logging-in"];

  function handlePrint() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <>
      <section className="unified-panel article-standalone-panel">
        <button type="button" className="article-download-btn" onClick={handlePrint}>
          ⬇ Download / Print
        </button>
        <article className="article-view article-standalone-body">
          <h1>{article.heading}</h1>
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </article>
      </section>

      <div className="hub-pagination-row">
        <Link to="/lessons" className="hub-btn">Back to Lessons</Link>
      </div>
    </>
  );
}