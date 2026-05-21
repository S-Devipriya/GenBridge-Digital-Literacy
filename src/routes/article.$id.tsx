import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/article/$id")({
  head: () => ({ meta: [{ title: "Article — GenBridge" }] }),
  component: ArticlePage,
});

const ARTICLES: Record<string, { title: string; pdfUrl: string }> = {
  "logging-in": {
    title: "How to Login on Any Website",
    pdfUrl: "/articles/how_to_login.pdf",
  },
};

function ArticlePage() {
  const { id } = Route.useParams();
  const article = ARTICLES[id] ?? ARTICLES["logging-in"];

  function handleDownload() {
    if (typeof window !== "undefined") window.open(article.pdfUrl, "_blank");
  }

  return (
    <>
      <section className="unified-panel article-standalone-panel">
        <button type="button" className="article-download-btn" onClick={handleDownload}>
          ⬇ Download / Print
        </button>
        <div className="article-pdf-frame">
          <object
            data={`${article.pdfUrl}#view=FitH`}
            type="application/pdf"
            aria-label={article.title}
          >
            <p>
              Your browser does not support inline PDFs.{" "}
              <a href={article.pdfUrl} target="_blank" rel="noreferrer">
                Click here to open the PDF
              </a>
              .
            </p>
          </object>
        </div>
      </section>

      <div className="hub-pagination-row">
        <Link to="/lessons" className="hub-btn">Back to Lessons</Link>
      </div>
    </>
  );
}