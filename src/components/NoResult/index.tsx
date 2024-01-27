export interface INoResultProps {
    message: string;
}

export function NoResult({ message }: INoResultProps) {
    return (
        <div className="h-14 w-full flex justify-center items-center">
            <p>{message}</p>
        </div>
    );
}
