import { Controller } from 'react-hook-form';
import type { SelectFieldProps } from '../types';
import type { FieldValues } from 'react-hook-form';

export const SelectField = <T extends FieldValues>({ label, name, control, error, options, className, ...props }: SelectFieldProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col gap-2">
                    <label htmlFor={name} className="text-sm font-semibold text-gray-700">
                        {label} {props.required !== false && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                        <select
                            id={name}
                            {...field}
                            className={`appearance-none w-full border rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white transition-all cursor-pointer ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-300'
                                } ${className}`}
                            {...props}
                        >
                            <option value="" className="text-gray-400">Select {label}</option>
                            {options.map((option) => (
                                <option key={option.value} value={option.value} className="text-gray-900">
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    {error && (
                        <span className="text-xs text-red-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error.message}
                        </span>
                    )}
                </div>
            )}
        />
    );
};
