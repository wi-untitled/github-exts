import { renderHook, act } from "@testing-library/react";
import { useCollapse } from "../useCollapse";

describe("useCollapse", () => {
    it("should set initial visibleCount and isCollapsed correctly", () => {
        const { result } = renderHook(() =>
            useCollapse({ initVisibleCount: 5 }),
        );

        expect(result.current.visibleCount).toEqual(5);
        expect(result.current.isCollapsed).toEqual(true);
    });

    it("should update isCollapsed correctly", () => {
        const { result } = renderHook(() =>
            useCollapse({ initVisibleCount: 5 }),
        );

        act(() => {
            result.current.updateCollapse(false);
        });

        expect(result.current.isCollapsed).toEqual(false);
    });

    it("should update visibleCount correctly", () => {
        const { result } = renderHook(() =>
            useCollapse({ initVisibleCount: 5 }),
        );

        act(() => {
            result.current.updateVisibleCount(10);
        });

        expect(result.current.visibleCount).toEqual(10);
    });
});
