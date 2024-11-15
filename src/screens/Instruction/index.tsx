import { observer } from "mobx-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Instruction } from "src/components";

export function InstructionComponent() {
    const navigate = useNavigate();

    const handleNavigateBackCallback = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleSpaceKeyUpCallback = useCallback(
        (_: React.KeyboardEvent<HTMLDivElement>) => {
            return undefined;
        },
        [],
    );

    return (
        <div className="w-full h-full">
            <div
                className="p-2"
                onClick={handleNavigateBackCallback}
                role="navigation"
                onKeyUp={handleSpaceKeyUpCallback}
            >
                <Icon
                    icon="back"
                    className="w-6 h-6 cursor-pointer dark:text-dark text-accent"
                />
            </div>
            <Instruction />
        </div>
    );
}

InstructionComponent.routeName = "/instruction";

export const InstructionScreen = observer(InstructionComponent);
