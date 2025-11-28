import type { UseFormRegister, FieldError, Path, FieldValues, Control } from 'react-hook-form';

export interface InputFieldProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectFieldProps<T extends FieldValues> extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'name'> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    error?: FieldError;
    options: SelectOption[];
}


export interface TextAreaFieldProps<T extends FieldValues> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
}


export interface FileUploadProps<T extends FieldValues> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    error?: FieldError;
    onFileChange?: (file: File | null) => void;
}

export interface MultiSelectProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    error?: FieldError;
    options: string[];
    onChange?: (selected: string[]) => void;
}
