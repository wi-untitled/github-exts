import React, { useCallback, useState } from "react";
import {
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import type {
    DragEndEvent,
    DragStartEvent,
    UniqueIdentifier,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { SortableItem } from "src/components";
import { WidgetsId } from "src/enums";
import { getIndex } from "src/utils";

export interface ISortableListProps {
    items: { render: () => React.ReactNode; id: number; key: WidgetsId }[];
    onSortEnd: ({
        oldIndex,
        newIndex,
    }: {
        oldIndex: number;
        newIndex: number;
    }) => void;
}

export function SortableList({ items, onSortEnd }: ISortableListProps) {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const sensors = useSensors(
        useSensor(MouseSensor, {
            // Require the mouse to move by 10 pixels before activating.
            // Slight distance prevents sortable logic messing with
            // interactive elements in the handler toolbar component.
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            // Press delay of 250ms, with tolerance of 5px of movement.
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
    );

    const handleDragStartCallback = useCallback(
        ({ active }: DragStartEvent) => {
            if (active) {
                setActiveId(active.id);
            }
        },
        [],
    );

    const handleDragCancelCallback = useCallback(() => {
        setActiveId(null);
    }, [setActiveId]);

    const handleDragEndCallback = useCallback(
        ({ over, active }: DragEndEvent) => {
            if (over && active.id !== over.id) {
                onSortEnd({
                    oldIndex: getIndex(items, active.id),
                    newIndex: getIndex(items, over.id),
                });
            }
            setActiveId(null);
        },
        [onSortEnd, items],
    );

    return (
        <DndContext
            sensors={sensors}
            autoScroll={{
                threshold: {
                    x: 0.1,
                    y: 0.25,
                },
            }}
            onDragStart={handleDragStartCallback}
            onDragEnd={handleDragEndCallback}
            onDragCancel={handleDragCancelCallback}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                <div className="sortable-list">
                    {items.map(({ id, render, key }) => (
                        <SortableItem
                            key={`item-${id}-${key}`}
                            id={id}
                            render={render}
                            activeId={activeId}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
