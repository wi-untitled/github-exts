import { FC } from "react";
import clsx from "clsx";

interface ISpinnerProps {
    absoluteFill?: boolean;
}
const Spinner: FC<ISpinnerProps> = ({ absoluteFill }) => {
    return (
        <div
            className={clsx(
                "flex items-center justify-center p-3",
                absoluteFill && "absolute inset-0",
            )}
        >
            <div className="animate-spin border-2 border-gray-300 border-t-transparent rounded-full w-6 h-6" />
        </div>
    );
};

export default Spinner;
