import { Tooltip as BasicTooltip } from "react-tooltip";
import { FeatureFlag } from "src/core";

interface ITooltipProps {
    children: React.ReactNode;
    id: string;
    info: string;
}

export function Tooltip({ children, id, info }: ITooltipProps) {
    return (
        <FeatureFlag name="enableWidgetTitleTooltip">
            <div data-tooltip-id={id} data-tooltip-content={info}>
                {children}
                <BasicTooltip
                    delayShow={3000}
                    className="!bg-gray-600 !w-[310px]"
                    id={id}
                />
            </div>
        </FeatureFlag>
    );
}
