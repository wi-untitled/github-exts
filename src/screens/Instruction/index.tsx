import { observer } from "mobx-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Instruction } from "src/components";
import BackIcon from "src/assets/back.svg?react";

export function InstructionComponent() {
    const navigate = useNavigate();

    const handleNavigateBackCallback = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className="w-full h-full">
            <div className="p-2" onClick={handleNavigateBackCallback}>
                <BackIcon className="w-6 h-6 cursor-pointer fill-current dark:text-dark text-accent" />
            </div>
            <Instruction />
        </div>
    );
}

InstructionComponent.routeName = "/instruction";

export const InstructionScreen = observer(InstructionComponent);
