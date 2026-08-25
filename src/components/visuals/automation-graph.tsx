const nodes = [
  [12, 18], [29, 12], [48, 22], [72, 11], [88, 28],
  [17, 46], [39, 42], [59, 52], [81, 48],
  [8, 72], [31, 78], [54, 70], [76, 82], [92, 68],
] as const;

const paths = [
  [12, 18, 29, 12], [29, 12, 48, 22], [48, 22, 72, 11], [72, 11, 88, 28],
  [12, 18, 17, 46], [29, 12, 39, 42], [48, 22, 59, 52], [88, 28, 81, 48],
  [17, 46, 39, 42], [39, 42, 59, 52], [59, 52, 81, 48],
  [17, 46, 8, 72], [39, 42, 31, 78], [59, 52, 54, 70], [81, 48, 92, 68],
  [8, 72, 31, 78], [31, 78, 54, 70], [54, 70, 76, 82], [76, 82, 92, 68],
] as const;

export function AutomationGraph() {
  return (
    <div className="relative min-h-[360px] overflow-hidden bg-panel md:min-h-[560px]" aria-hidden="true">
      <div className="absolute inset-0 technical-grid opacity-60" />
      <div className="absolute left-5 top-5 font-mono text-[11px] tracking-[0.14em] text-muted">TEST MATRIX / 14</div>
      <div className="absolute right-5 top-5 flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted">
        <span className="h-1.5 w-1.5 bg-accent" /> VERIFIED
      </div>
      <div className="absolute inset-[12%_6%_8%]">
        {paths.map(([x1, y1, x2, y2], index) => {
          const dx = x2 - x1;
          const dy = y2 - y1;
          const length = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          return (
            <span
              key={index}
              className="absolute h-px origin-left bg-strong"
              style={{ left: `${x1}%`, top: `${y1}%`, width: `${length}%`, transform: `rotate(${angle}deg)` }}
            />
          );
        })}
        {nodes.map(([x, y], index) => (
          <span
            key={`${x}-${y}`}
            className={`graph-node absolute -ml-1.5 -mt-1.5 h-3 w-3 border bg-panel ${index === nodes.length - 1 ? "border-accent bg-accent" : "border-ink"}`}
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${index * 120}ms` }}
          />
        ))}
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border-t border-strong pt-3 font-mono text-[10px] tracking-[0.12em] text-muted">
        <span>COMPLEXITY / ROUTED</span>
        <span>RELEASE / 01</span>
      </div>
    </div>
  );
}
