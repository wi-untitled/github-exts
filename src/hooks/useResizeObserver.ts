import { useEffect, useState } from "react";

export function useResizeObserver(ref: any) {
    const [dimensions, setDimensions] = useState<DOMRectReadOnly>();

    useEffect(() => {
        const observeTarget = ref.current;

        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry: ResizeObserverEntry) => {
                setDimensions(entry.contentRect);
            });
        });

        resizeObserver.observe(observeTarget!);

        return () => {
            resizeObserver.unobserve(observeTarget!);
        };
    }, [ref]);
    return dimensions;
}
