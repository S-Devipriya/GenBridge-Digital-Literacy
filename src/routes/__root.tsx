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
  const [isLearner, setIsLearner] = useState(false);

  useEffect(() => {
    const read = () => setIsLearner(localStorage.getItem("genbridge_learner") === "1");
    read();
    window.addEventListener("genbridge-auth", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("genbridge-auth", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  function logout() {
    localStorage.removeItem("genbridge_learner");
    window.dispatchEvent(new Event("genbridge-auth"));
    navigate({ to: "/" });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <header className="header-bar">
        <Link to="/" className="brand-logo">☀ GenBridge</Link>
        <nav className="nav-links">
          {isLearner ? (
            <>
              <Link to="/learner-dashboard" className="icon-btn" aria-label="My Account" title="My Account">👤</Link>
              <Link to="/learner-dashboard" className="icon-btn" aria-label="Settings" title="Settings">⚙️</Link>
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
        <Link to="/register-volunteer">Register as Volunteer</Link>
      </footer>
    </QueryClientProvider>
  );
}
