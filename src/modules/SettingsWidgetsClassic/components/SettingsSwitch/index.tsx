import { WidgetsId } from "src/enums";
import { Switch } from "src/components";
import { FeatureFlag } from "src/core";
import { Tooltip } from "react-tooltip";

export interface ISettingsSwitchProps {
    id: WidgetsId | string; // TODO: should remove string later when enums is clear
    enabled: boolean;
    onChange: ({ id, value }: { id: string; value: boolean }) => void;
    title: string;
    info?: string;
}

export function SettingsSwitch({
    id,
    enabled,
    title,
    onChange,
    info,
}: ISettingsSwitchProps) {
    return (
        <div
            key={id}
            className="flex flex-row justify-between items-center"
            data-tooltip-id={id}
            data-tooltip-content={info}
        >
            <p className="text-sm pr-1">{title}</p>
            <Switch id={id} initValue={enabled} onChange={onChange} />
            <FeatureFlag name="enableWidgetTitleTooltip">
                <>
                    {info && (
                        <Tooltip
                            delayShow={3000}
                            className="!bg-gray-600 !w-[310px]"
                            id={id}
                        />
                    )}
                </>
            </FeatureFlag>
        </div>
    );
}
