import { useSortable } from "@dnd-kit/sortable";
import clsx from "clsx";
import { CSS } from "@dnd-kit/utilities";

import { Icon } from "src/components";

export interface ISortableItemProps {
    id: number;
    activeId: number;
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
                className="absolute flex justify-center shadow-sm shadow-gray-400/25 items-center right-2 -top-1 w-5 h-2 rounded-sm border bg-light dark:bg-dark border-light dark:border-dark"
                ref={setActivatorNodeRef}
                {...listeners}
            >
                <Icon
                    icon="drag"
                    className="w-3 h-2 text-gray-400"
                    viewBox="0 0 15 12"
                />
            </div>
            <Component />
        </div>
    );
}
