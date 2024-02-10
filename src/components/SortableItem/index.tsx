import { useSortable } from "@dnd-kit/sortable";
import clsx from "clsx";
import { CSS } from "@dnd-kit/utilities";
import type { UniqueIdentifier } from "@dnd-kit/core";

import DragIcon from "src/assets/drag.svg?react";

export interface ISortableItemProps {
    id: number;
    activeId: UniqueIdentifier | null;
    render: () => React.ReactNode;
}

export function SortableItem({ id, activeId, render }: ISortableItemProps) {
    const {
        setNodeRef,
        transform,
        transition,
        listeners,
        setActivatorNodeRef,
    } = useSortable({
        id,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };
    const Component = render;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={clsx("relative", {
                "sortable-item dragging-dbd-kit z-50": activeId === id,
                "sortable-item": activeId !== id,
            })}
        >
            <div
                className="absolute flex bg-light dark:bg-dark justify-center items-center right-1 -top-2 w-5 h-4.5 border border-light dark:border-dark rounded-sm"
                ref={setActivatorNodeRef}
                {...listeners}
            >
                <DragIcon className="dark:text-dark text-accent fill-current w-3 h-3 cursor-grab" />
            </div>
            <Component />
        </div>
    );
}
