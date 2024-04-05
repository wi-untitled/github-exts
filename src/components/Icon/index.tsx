export const icons = [
    "logout",
    "settings",
    "approved",
    "bug",
    "linkedin",
    "instagram",
    "facebook",
    "twitter",
    "youtube",
    "back",
    "messages",
    "notification",
    "approved",
    "exclamation",
    "merged",
    "star",
    "total",
    "tooltip",
    "request",
    "drag",
] as const;

export interface IIconProps {
    icon: (typeof icons)[number];
    className?: string;
    viewBox?: string;
}

export function Icon({ icon, className, viewBox = "0 0 16 16" }: IIconProps) {
    return (
        <div className={className}>
            <svg
                data-role={icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox={viewBox}
            >
                <use href={`#${icon}`} />
            </svg>
        </div>
    );
}
