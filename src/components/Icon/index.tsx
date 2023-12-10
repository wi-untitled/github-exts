export const icons = ["pull-request", "changes-request", "logout"] as const;

export interface IIconProps {
    icon: (typeof icons)[number];
    className?: string;
}

export function Icon({ icon, className }: IIconProps) {
    return (
        <div className={className}>
            <svg
                data-role={icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
            >
                <use href={`#${icon}`} />
            </svg>
        </div>
    );
}
