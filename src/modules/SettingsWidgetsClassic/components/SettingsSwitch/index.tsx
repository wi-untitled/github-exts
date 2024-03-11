import { WidgetsId } from "src/enums";
import { Switch } from "src/components";

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
        <div key={id} className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <p className="text-sm pr-1">{title}</p>
                <Switch id={id} initValue={enabled} onChange={onChange} />
            </div>
            <div>{info && <span className="text-2xs">{info}</span>}</div>
        </div>
    );
}
