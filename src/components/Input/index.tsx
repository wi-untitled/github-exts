export interface IInputProps {
    defaultValue: string;
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
    defaultValue,
    value,
    placeholder,
    onChange,
}: IInputProps) {
    return (
        <input
            onChange={onChange}
            className="p-1 border rounded-md outline-none text-light dark:text-dark bg-light dark:bg-dark border-light/[0.15] dark:border-dark/[0.15] placeholder-light dark:placeholder-dark"
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
        />
    );
}
