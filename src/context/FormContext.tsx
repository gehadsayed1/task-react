import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { FormData, FormContextType } from '../types';

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [formData, setFormDataState] = useState<Partial<FormData> | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            try {
                setFormDataState(JSON.parse(storedData));
            } catch (error) {
                console.error("Failed to parse stored form data", error);
            }
        }
    }, []);

    const setFormData = (data: FormData) => {
        setFormDataState(data);
        localStorage.setItem('formData', JSON.stringify(data));
    };

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};
