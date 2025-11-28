import { useState } from 'react';
import { Controller } from 'react-hook-form';
import type { SelectFieldProps } from '../types';
import type { FieldValues } from 'react-hook-form';

export const CustomSelect = <T extends FieldValues>({
    label,
    name,
    control,
    error,
    options,
    className,
    ...props
}: SelectFieldProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => {
                const selectedOption = options.find(opt => opt.value === value);

                const handleSelect = (newValue: string) => {
                    onChange(newValue);
                    setIsOpen(false);
                };

                return (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">
                            {label} {props.required !== false && <span className="text-red-500">*</span>}
                        </label>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className={`w-full border rounded-xl px-4 py-3 text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all flex items-center justify-between ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-300 bg-white'
                                    }`}
                            >
                                <span className={value ? 'text-gray-900' : 'text-gray-400'}>
                                    {selectedOption ? selectedOption.label : `Select ${label}`}
                                </span>
                                <svg
                                    className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isOpen && (
                                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                                    {options.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => handleSelect(option.value)}
                                            className={`w-full px-4 py-3 text-left text-sm hover:bg-primary-50 transition-colors flex items-center justify-between ${value === option.value ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-gray-700'
                                                }`}
                                        >
                                            <span>{option.label}</span>
                                            {value === option.value && (
                                                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
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
                );
            }}
        />
    );
};
