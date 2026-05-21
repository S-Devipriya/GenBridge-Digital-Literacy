import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    setStatus("loading");

    (async () => {
      try {
        const pdfjs: any = await import(/* @vite-ignore */ "pdfjs-dist/build/pdf.mjs" as any);
        const workerUrl = (await import(/* @vite-ignore */ "pdfjs-dist/build/pdf.worker.mjs?url" as any)).default;
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

        const loadingTask = pdfjs.getDocument(article.pdfUrl);
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const containerWidth = container.clientWidth || 800;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          if (cancelled) return;
          const baseViewport = page.getViewport({ scale: 1 });
          const scale = containerWidth / baseViewport.width;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.className = "article-pdf-page";
          const dpr = window.devicePixelRatio || 1;
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;

          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          const transform = dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined;
          await page.render({ canvasContext: ctx, viewport, transform, canvas }).promise;
          if (cancelled) return;
          container.appendChild(canvas);
        }

        setStatus("ready");
      } catch (err) {
        console.error("PDF render failed", err);
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [article.pdfUrl]);

  function handleDownload() {
    if (typeof window !== "undefined") window.open(article.pdfUrl, "_blank");
  }

  return (
    <>
      <section className="unified-panel article-standalone-panel">
        <button type="button" className="article-download-btn" onClick={handleDownload}>
          ⬇ Download / Print
        </button>
        <div className="article-pdf-canvas-wrap" ref={containerRef} aria-label={article.title} />
        {status === "loading" && <p className="article-pdf-status">Loading article…</p>}
        {status === "error" && (
          <p className="article-pdf-status">
            Could not load the article.{" "}
            <a href={article.pdfUrl} target="_blank" rel="noreferrer">
              Open the PDF
            </a>
            .
          </p>
        )}
      </section>

      <div className="hub-pagination-row">
        <Link to="/lessons" className="hub-btn">Back to Lessons</Link>
      </div>
    </>
  );
}