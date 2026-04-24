export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} — Built with care & caffeine.
        </p>
        <div className="flex gap-5 text-sm text-muted-foreground">
          <a href="https://github.com" className="transition-colors hover:text-primary">
            GitHub
          </a>
          <a href="https://linkedin.com" className="transition-colors hover:text-primary">
            LinkedIn
          </a>
          <a href="https://x.com" className="transition-colors hover:text-primary">
            X / Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
