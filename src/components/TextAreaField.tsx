import type { TextAreaFieldProps } from '../types';
import type { FieldValues } from 'react-hook-form';

export const TextAreaField = <T extends FieldValues>({ label, name, register, error, className, ...props }: TextAreaFieldProps<T>) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-sm font-semibold text-gray-700">
                {label}
            </label>
            <textarea
                id={name}
                {...register(name)}
                className={`border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-300'
                    } ${className}`}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error.message}
                </span>
            )}
        </div>
    );
};
