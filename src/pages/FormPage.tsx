import  { useState } from 'react';
import { useForm, type SubmitHandler, type FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { formSchema, type FormData } from '../utils/schema';
import { useFormContext } from '../context/FormContext';
import { InputField } from '../components/InputField';
import { CustomSelect } from '../components/CustomSelect';
import { TextAreaField } from '../components/TextAreaField';
import { FileUpload } from '../components/FileUpload';
import { MultiSelect } from '../components/MultiSelect';

export const FormPage: React.FC = () => {
    const { setFormData, formData: storedData } = useFormContext();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: storedData || {},
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        setFormData(data);
        setIsSubmitting(false);

        toast.success('Registration submitted successfully!', {
            duration: 3000,
            position: 'top-center',
            style: {
                background: '#10b981',
                color: '#fff',
                fontWeight: '600',
                padding: '16px',
                borderRadius: '12px',
            },
            icon: '✓',
        });

        setTimeout(() => {
            navigate('/result');
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 py-12 px-4">
            <Toaster />
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                        Registration Form
                    </h1>
                    <p className="text-gray-600">Please fill out the form below to complete your registration</p>
                </div>

                <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-gray-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                                    1
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                            </div>
                            <div className="space-y-5 pl-0 md:pl-13">
                                <InputField
                                    label="Full Name"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    register={register}
                                    error={errors.fullName}
                                />

                                <InputField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    register={register}
                                    error={errors.email}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <CustomSelect
                                        label="Gender"
                                        name="gender"
                                        register={register}
                                        error={errors.gender}
                                        options={[
                                            { value: 'male', label: 'Male' },
                                            { value: 'female', label: 'Female' },
                                            { value: 'other', label: 'Other' },
                                        ]}
                                    />
                                    <InputField
                                        label="Birth Date"
                                        name="birthDate"
                                        type="date"
                                        register={register}
                                        error={errors.birthDate}
                                    />
                                </div>

                                <FileUpload
                                    label="Profile Photo"
                                    name="profilePhoto"
                                    register={register}
                                    error={errors.profilePhoto as FieldError}
                                    accept="image/*"
                                    onFileChange={(file) => {
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setImagePreview(reader.result as string);
                                            };
                                            reader.readAsDataURL(file);
                                        } else {
                                            setImagePreview(null);
                                        }
                                    }}
                                />

                                {imagePreview && (
                                    <div className="flex justify-center">
                                        <div className="relative group">
                                            <img
                                                src={imagePreview}
                                                alt="Profile preview"
                                                className="w-32 h-32 rounded-2xl object-cover border-4 border-primary-200 shadow-lg"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-2xl flex items-center justify-center">
                                                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                                    2
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Professional Info</h2>
                            </div>
                            <div className="space-y-5 pl-0 md:pl-13">
                                <InputField
                                    label="Years of Experience"
                                    name="yearsOfExperience"
                                    type="number"
                                    placeholder="0"
                                    register={register}
                                    error={errors.yearsOfExperience}
                                />

                                <MultiSelect
                                    label="Skills"
                                    name="skills"
                                    register={register}
                                    error={errors.skills as FieldError}
                                    options={[
                                        'React',
                                        'TypeScript',
                                        'Node.js',
                                        'Python',
                                        'Java',
                                        'Go',
                                        'Rust',
                                        'Vue.js',
                                        'Angular',
                                        'Docker',
                                        'Kubernetes',
                                        'AWS',
                                    ]}
                                />
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                                    3
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Additional Information</h2>
                            </div>
                            <div className="space-y-5 pl-0 md:pl-13">
                                <TextAreaField
                                    label="Bio"
                                    name="bio"
                                    placeholder="Tell us a bit about yourself..."
                                    register={register}
                                    error={errors.bio}
                                    rows={5}
                                />

                                <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-4">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="agreeToTerms"
                                            {...register('agreeToTerms')}
                                            className="w-5 h-5 mt-0.5 rounded border-primary-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
                                        />
                                        <label htmlFor="agreeToTerms" className="text-sm text-gray-700 cursor-pointer select-none flex-1">
                                            I agree to the <span className="text-primary-600 font-semibold">terms and conditions</span> and understand that my information will be processed according to the privacy policy
                                        </label>
                                    </div>
                                    {errors.agreeToTerms && (
                                        <p className="text-xs text-red-500 mt-2 ml-8 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.agreeToTerms.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    'Submit Registration'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>Need help? Contact our support team</p>
                </div>
            </div>
        </div>
    );
};
