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
            className="p-1 border rounded-md border-gray-700 outline-gray-600 text-white bg-slate-800 placeholder-white"
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
        />
    );
}
