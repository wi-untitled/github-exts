import { observer } from "mobx-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Instruction } from "src/components";

export function InstructionComponent() {
    const navigate = useNavigate();

    const handleNavigateBackCallback = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className="w-full h-screen">
            <button onClick={handleNavigateBackCallback}>Back</button>
            <Instruction />
        </div>
    );
}

InstructionComponent.routeName = "/instruction";

export const InstructionScreen = observer(InstructionComponent);
