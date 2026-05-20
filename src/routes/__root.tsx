import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useNavigate,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

import appCss from "../styles.css?url";
import genbridgeCss from "../genbridge.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: genbridgeCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [largeText, setLargeText] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const read = () => {
      setRole(localStorage.getItem("genbridge_role"));
      setLargeText(localStorage.getItem("genbridge_large_text") === "1");
      setLanguage(localStorage.getItem("genbridge_language") || "en");
    };
    read();
    window.addEventListener("genbridge-auth", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("genbridge-auth", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("genbridge-text-large", largeText);
  }, [largeText]);

  function toggleTextSize() {
    const next = !largeText;
    setLargeText(next);
    localStorage.setItem("genbridge_large_text", next ? "1" : "0");
  }

  function updateLanguage(next: string) {
    setLanguage(next);
    localStorage.setItem("genbridge_language", next);
  }

  function logout() {
    localStorage.removeItem("genbridge_role");
    localStorage.removeItem("genbridge_learner");
    localStorage.removeItem("genbridge_name");
    window.dispatchEvent(new Event("genbridge-auth"));
    navigate({ to: "/" });
  }

  const dashboardLink =
    role === "admin" ? "/admin-dashboard"
    : role === "volunteer" ? "/volunteer-dashboard"
    : "/learner-dashboard";

  return (
    <QueryClientProvider client={queryClient}>
      <header className="header-bar">
        <Link to="/" className="brand-logo">☀ GenBridge</Link>
        <nav className="nav-links">
          <div className="accessibility-text-controls" aria-label="Text size controls">
            <button type="button" className={`text-size-btn ${!largeText ? "active-size" : ""}`} onClick={toggleTextSize}>A</button>
            <button type="button" className={`text-size-btn ${largeText ? "active-size" : ""}`} onClick={toggleTextSize}>A+</button>
          </div>
          <label className="language-select-wrapper" aria-label="Select language">
            🌐
            <select className="language-dropdown-selector" value={language} onChange={(e) => updateLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
            </select>
          </label>
          {role ? (
            <>
              <Link to={dashboardLink} className="nav-btn-icon" aria-label="My Account" title="My Account">👤</Link>
              <Link to={dashboardLink} className="nav-btn-icon" aria-label="Settings" title="Settings">⚙️</Link>
              <button type="button" className="nav-btn" onClick={logout}>Log Out</button>
            </>
          ) : (
            <Link to="/login" className="nav-btn">Log In</Link>
          )}
        </nav>
      </header>
      <main className="main-container">
        <Outlet />
      </main>
      <footer className="footer-bar">
        <p>GenBridge Eco-Learning System. Designed explicitly for digital accessibility.</p>
        <p>
          Any Queries or Suggestions?{" "}
          <Link to="/feedback">Share your feedback</Link>
        </p>
        <p>Write to us at <a href="mailto:info@genbridge.org.in">info@genbridge.org.in</a></p>
      </footer>
    </QueryClientProvider>
  );
}
