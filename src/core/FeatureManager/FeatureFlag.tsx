import React, { useEffect } from "react";
import { useFeatureFlags } from "src/hooks";

export interface IRenderProps {
    show: boolean;
    children: JSX.Element;
    override?: { name: string; value: boolean };
}

export function Render({ show, children, override }: IRenderProps) {
    const { updateFeatureFlag } = useFeatureFlags();

    useEffect(() => {
        if (override) {
            updateFeatureFlag(override.name, override.value);
        }
    }, [updateFeatureFlag, override]);

    return show ? children : null;
}

export interface IFeatureFlagProps {
    name: string;
}
export function FeatureFlag({
    children,
    name,
    ...rest
}: IFeatureFlagProps &
    Pick<React.ComponentProps<typeof Render>, "override" | "children">) {
    const { flags } = useFeatureFlags();

    return (
        <Render {...rest} show={flags[name]}>
            {children}
        </Render>
    );
}
