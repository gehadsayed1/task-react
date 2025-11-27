import type { UseFormRegister, FieldError, Path, FieldValues } from 'react-hook-form';

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

export interface SelectFieldProps<T extends FieldValues> extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
    options: SelectOption[];
}


export interface TextAreaFieldProps<T extends FieldValues> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
}


export interface FileUploadProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
    onFileChange?: (file: File | null) => void;
}

export interface MultiSelectProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
    options: string[];
    onChange?: (selected: string[]) => void;
}
