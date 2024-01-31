import { ReactNode } from "react";

export interface IGlobalDeveloperProps {
    children: ReactNode;
}

export function GlobalDeveloper({ children }: IGlobalDeveloperProps) {
    return <>{import.meta.env.MODE === "development" ? children : null}</>;
}
