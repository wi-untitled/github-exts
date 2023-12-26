import { useState, useCallback } from "react";

export function useCollapse({
    initVisibleCount,
}: {
    initVisibleCount: number;
}) {
    const [isCollapsed, setCollapsed] = useState(true);
    const [visibleCount, setVisibleCount] = useState(initVisibleCount);

    const handleUpdateCollapseCallback = useCallback((value: boolean) => {
        setCollapsed(value);
    }, []);

    const handleUpdateVisibleCountCallback = useCallback(
        (newVisibleCount: number) => {
            setVisibleCount(newVisibleCount);
        },
        [],
    );

    return {
        visibleCount: visibleCount,
        isCollapsed: isCollapsed,
        updateCollapse: handleUpdateCollapseCallback,
        updateVisibleCount: handleUpdateVisibleCountCallback,
    };
}
