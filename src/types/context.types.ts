import type { FormData } from './form.types';

export interface FormContextType {
    formData: Partial<FormData> | null;
    setFormData: (data: FormData) => void;
}
