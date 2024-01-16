import { observer } from "mobx-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Instruction } from "src/components";

export function InstructionComponent() {
    const navigate = useNavigate();

    const handleNavigateBackCallback = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className="w-full h-full">
            <div className="p-2" onClick={handleNavigateBackCallback}>
                <Icon
                    icon="back"
                    className="w-6 h-6 text-gray-400 dark:text-gray-500"
                />
            </div>
            <Instruction />
        </div>
    );
}

InstructionComponent.routeName = "/instruction";

export const InstructionScreen = observer(InstructionComponent);
