import { WidgetsId } from "src/enums";
import { Switch } from "src/components";

export interface ISettingsSwitchProps {
    id: WidgetsId | string; // TODO: should remove string later when enums is clear
    enabled: boolean;
    onChange: ({ id, value }: { id: string; value: boolean }) => void;
    title: string;
}

export function SettingsSwitch({
    id,
    enabled,
    title,
    onChange,
}: ISettingsSwitchProps) {
    return (
        <div key={id} className="flex flex-row justify-between items-center">
            <p className="text-sm pr-1">{title}</p>
            <Switch id={id} initValue={enabled} onChange={onChange} />
        </div>
    );
}
