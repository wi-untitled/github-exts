import { useResizeObserver } from "src/hooks";
import { useEffect, useRef, useMemo, useState } from "react";
import { scaleBand, select, scaleLinear, max } from "d3";
import { ITopLanguageWithMaxSize } from "src/types";
import { Random } from "src/utils";

import styles from "./styles.module.css";

export const RECT_RADIUS_X = 8;
export const IFRAME_PADDING_X = 36; // 16px for html and 0.5 for div#root
export const Y_SPACE = 14;
export const TEXT_PADDING_LEFT = 8;
export const WRAPPER_HEIGHT = "160px";

export interface IRacingBarChartProps {
    initData: ITopLanguageWithMaxSize[];
    medium: number;
}

export function RacingBarChart({ initData, medium }: IRacingBarChartProps) {
    const [iteration, setIteration] = useState(0);
    const svgRef = useRef(null);
    const wrapperRef = useRef(null);
    const dimensions = useResizeObserver(wrapperRef);
    const [data, setData] = useState(initData);

    useEffect(() => {
        setData(initData);
    }, [initData]);

    const isDoneAnimation = useMemo(() => {
        const arr = data.map(({ size, maxSize }) => size === maxSize);
        const isAllDone = arr.every((x) => x !== false);

        return isAllDone;
    }, [data]);

    const id = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isDoneAnimation) {
            clearInterval(id.current!);

            return;
        }

        id.current = setInterval(() => {
            const rndIndx =
                Random.getRandomIndex<ITopLanguageWithMaxSize>(data);

            setData((prevData) =>
                prevData.map((entry, idx) => {
                    if (idx === rndIndx) {
                        return {
                            ...entry,
                            size:
                                entry.size + medium < entry.maxSize
                                    ? entry.size + medium
                                    : entry.maxSize,
                        };
                    } else {
                        return {
                            ...entry,
                        };
                    }
                }),
            );

            setIteration(iteration + 1);
        }, 70);
    }, [initData, isDoneAnimation]);

    useEffect(() => {
        const svg = select(svgRef.current);

        if (!dimensions) return;

        const yScale = scaleBand()
            .domain(data.map((_, index: number) => index) as Iterable<string>)
            .range([0, dimensions.height - Y_SPACE * 5]);

        const xScale = scaleLinear()
            .domain([0, max(data, (x) => x.size) as number])
            .range([0, dimensions.width - IFRAME_PADDING_X]);

        svg.selectAll(".bar")
            .data(
                data,
                (entry) => (entry as ITopLanguageWithMaxSize).name as string,
            )
            .join((enter) => {
                return enter
                    .append("rect")
                    .attr(
                        "y",
                        (_, idx) =>
                            yScale(idx as unknown as string)! +
                            Y_SPACE * (idx + 1),
                    );
            })
            .attr("fill", (x) => x.color)
            .attr("class", "bar")
            .attr("x", 0)
            .attr("rx", RECT_RADIUS_X)
            .attr("height", yScale.bandwidth())
            .transition()
            .attr("width", (x) => xScale(x.size) + IFRAME_PADDING_X)
            .attr(
                "y",
                (_, idx) =>
                    yScale(idx as unknown as string)! + Y_SPACE * (idx + 1),
            );

        svg.selectAll(`.${styles.topLanguageLabel}`)
            .data(data, (entry, _) => (entry as ITopLanguageWithMaxSize).name)
            /**
             * Text need space 1px before rect this why subtract 3px
             */
            .join((enter) =>
                enter
                    .append("text")
                    .attr(
                        "y",
                        (_, idx) =>
                            yScale(idx as unknown as string)! +
                            Y_SPACE * (idx + 1) -
                            3,
                    ),
            )
            .text((x) => `${x.name}`)
            .attr("class", styles.topLanguageLabel)
            .attr("style", "font-size: 12px")
            .attr("x", TEXT_PADDING_LEFT)
            .transition()
            /**
             * Text need space 1px before rect this why subtract 3px
             */
            .attr(
                "y",
                (_, idx) =>
                    yScale(idx as unknown as string)! + Y_SPACE * (idx + 1) - 3,
            );
    }, [data, dimensions]);

    return (
        <div
            ref={wrapperRef}
            style={{ height: WRAPPER_HEIGHT }}
            className="p-2"
        >
            <svg ref={svgRef} className="h-full w-full"></svg>
        </div>
    );
}
