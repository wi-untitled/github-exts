export interface ISettingsTitleProps {
    title: string;
    info?: string;
}

export function SettingsTitle({ title, info }: ISettingsTitleProps) {
    return (
        <div>
            <p className="text-base">{title}</p>
            {info && <span className="text-2xs">{info}</span>}
        </div>
    );
}
