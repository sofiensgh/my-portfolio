export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="nier-parallax-slow nier-ambient-mask absolute inset-0">
        <div className="nier-ambient-rings absolute left-1/2 top-1/2 h-[130vmax] w-[130vmax] -translate-x-1/2 -translate-y-1/2" />
        <div className="nier-ambient-grid absolute inset-0 animate-nier-grid" />
      </div>
      <div className="nier-ambient-horizon absolute left-0 right-0 top-[62%]" />
      <div className="nier-ambient-scan absolute left-0 right-0 animate-nier-scan" />
      <div className="nier-ambient-vignette absolute inset-0" />
    </div>
  );
}
