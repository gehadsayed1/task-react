import { useState } from 'react';
import type { MultiSelectProps } from '../types';
import type { FieldValues } from 'react-hook-form';

export const MultiSelect = <T extends FieldValues>({
    label,
    name,
    register,
    error,
    options,
    onChange
}: MultiSelectProps<T>) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (option: string) => {
        const newSelected = selected.includes(option)
            ? selected.filter(item => item !== option)
            : [...selected, option];

        setSelected(newSelected);
        if (onChange) {
            onChange(newSelected);
        }
    };

    const removeOption = (option: string) => {
        const newSelected = selected.filter(item => item !== option);
        setSelected(newSelected);
        if (onChange) {
            onChange(newSelected);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
                {label} <span className="text-red-500">*</span>
            </label>

       
            <select
                multiple
                {...register(name)}
                value={selected}
                onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value);
                    setSelected(values);
                }}
                className="hidden"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full border rounded-xl px-4 py-3 text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary-300 bg-white'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <span className={selected.length === 0 ? 'text-gray-400' : 'text-gray-700'}>
                            {selected.length === 0 ? 'Select skills...' : `${selected.length} skill${selected.length > 1 ? 's' : ''} selected`}
                        </span>
                        <svg
                            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>

                
                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => toggleOption(option)}
                                className={`w-full px-4 py-3 text-left text-sm hover:bg-primary-50 transition-colors flex items-center justify-between ${selected.includes(option) ? 'bg-primary-50' : ''
                                    }`}
                            >
                                <span className={selected.includes(option) ? 'text-primary-700 font-semibold' : 'text-gray-700'}>
                                    {option}
                                </span>
                                {selected.includes(option) && (
                                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            
            {selected.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {selected.map((option) => (
                        <span
                            key={option}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                        >
                            {option}
                            <button
                                type="button"
                                onClick={() => removeOption(option)}
                                className="hover:bg-primary-200 rounded-full p-0.5 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </span>
                    ))}
                </div>
            )}

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
