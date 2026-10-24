export function CRTOverlay() {
  return (
    <>
      <div
        className="nier-scanlines pointer-events-none fixed inset-0 z-[100]"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.06]" aria-hidden="true">
        <div className="grain-overlay animate-grain absolute -inset-[30%]" />
      </div>
    </>
  );
}
