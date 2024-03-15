import { useState, useCallback } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export interface ISwitchInputProps {
    checked: boolean;
    id: string;
}

export function SwitchInput({ checked, id }: ISwitchInputProps) {
    return (
        <input
            className="h-0 left-0 opacity-0 absolute top-0 z-20 w-0"
            type="radio"
            id={id}
            name="swtich"
            checked={checked}
        />
    );
}

export interface ISwitchLabelProps {
    text: string;
    htmlFor: string;
    onClick: () => void;
    className?: string;
}

export function SwitchLabel({
    text,
    htmlFor,
    onClick,
    className,
}: ISwitchLabelProps) {
    const handleSpaceKeyUpCallback = useCallback(
        (_: React.KeyboardEvent<HTMLLabelElement>) => {
            return undefined;
        },
        [],
    );

    return (
        <label
            className={clsx(
                "transition-all duration-100 ease-linear",
                className,
            )}
            htmlFor={htmlFor}
            onClick={onClick}
            onKeyUp={handleSpaceKeyUpCallback}
            role="switch"
        >
            {text}
        </label>
    );
}

export interface ISwitchProps {
    initValue?: boolean;
    id: string;
    onChange: ({ id, value }: { id: string; value: boolean }) => void;
}

export function Switch({ initValue = false, onChange, id }: ISwitchProps) {
    const [checked, setChecked] = useState(initValue);
    const { t } = useTranslation();

    const handleToggleCheckedCallback = useCallback(() => {
        setChecked((prevState) => {
            const newCheckedValue = !prevState;

            if (onChange) {
                onChange({ id: id, value: newCheckedValue });
            }
            return newCheckedValue;
        });
    }, [id, onChange]);
    const handleSpaceKeyUpCallback = useCallback(
        (_: React.KeyboardEvent<HTMLDivElement>) => {
            return undefined;
        },
        [],
    );

    return (
        <div className="flex items-center relative h-5 space-x-1">
            <SwitchInput id="switch-off" checked={!checked} />
            <SwitchInput id="switch-on" checked={checked} />
            <SwitchLabel
                className={clsx("dark:text-white text-black", {
                    "text-[#808080]": checked,
                })}
                htmlFor="switch-off"
                onClick={handleToggleCheckedCallback}
                text={t("components.switch.off")}
            />
            <div
                className="dark:bg-white bg-gray-300 rounded-[32px] h-5 relative block w-9"
                onClick={handleToggleCheckedCallback}
                role="radio"
                onKeyUp={handleSpaceKeyUpCallback}
            >
                <span
                    className={clsx(
                        "bg-[#4a4a4a] top-[2px] rounded-[50%] h-4 w-4 absolute z-30 transition-all duration-100 ease-linear",
                        {
                            "left-[2px]": !checked,
                            "left-[18px]": checked,
                        },
                    )}
                />
            </div>
            <SwitchLabel
                className={clsx("dark:text-white text-black", {
                    "text-[#808080]": !checked,
                })}
                htmlFor="switch-on"
                onClick={handleToggleCheckedCallback}
                text={t("components.switch.on")}
            />
        </div>
    );
}
