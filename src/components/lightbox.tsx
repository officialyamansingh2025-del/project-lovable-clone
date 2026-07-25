import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Item = { src: string; label?: string };

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: Item[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, items.length, onClose, onIndexChange]);

  if (index === null) return null;
  const cur = items[index];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>
      {items.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); onIndexChange((index - 1 + items.length) % items.length); }}
            className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); onIndexChange((index + 1) % items.length); }}
            className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      <figure
        className="relative max-h-[90vh] max-w-[92vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={cur.src}
          alt={cur.label || "Image"}
          className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
        />
        {cur.label && (
          <figcaption className="mt-3 text-center text-sm text-white/80">
            {cur.label}
            {items.length > 1 && (
              <span className="ml-2 text-white/50">
                {index + 1} / {items.length}
              </span>
            )}
          </figcaption>
        )}
      </figure>
    </div>
  );
}