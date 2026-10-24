import { useState } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { CRTOverlay } from "@/components/effects/CRTOverlay";
import { BootSequence } from "@/components/effects/BootSequence";
import { PageTransition } from "@/components/effects/PageTransition";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { themeInitScript } from "@/hooks/useTheme";

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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Sofien Essghaier — Software Engineering Student & Full-Stack Developer",
      },
      {
        name: "description",
        content:
          "Portfolio of Sofien Essghaier, a software engineering student in Tunis building full-stack web applications with the MERN stack.",
      },
      { name: "author", content: "Sofien Essghaier" },
      {
        property: "og:title",
        content: "Sofien Essghaier — Full-Stack Developer",
      },
      {
        property: "og:description",
        content:
          "Software engineering student building full-stack web apps with React, Node.js & TypeScript.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@sofien" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster richColors position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <AmbientBackground />
      <ScrollProgress />
      <div className="nier-depth-scope relative z-10">
        <Outlet />
      </div>
      <CRTOverlay />
      <PageTransition />
      <CustomCursor />
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
    </>
  );
}
