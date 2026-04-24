export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sofien Essghaier — Built with care & caffeine.
        </p>
        <div className="flex gap-5 text-sm text-muted-foreground">
          <a href="mailto:sofensghaier2@gmail.com" className="transition-colors hover:text-primary">
            Email
          </a>
          <a href="https://github.com" className="transition-colors hover:text-primary">
            GitHub
          </a>
          <a href="https://linkedin.com" className="transition-colors hover:text-primary">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
