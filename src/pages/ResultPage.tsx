import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';

export const ResultPage: React.FC = () => {
    const { formData } = useFormContext();
    const navigate = useNavigate();

    if (!formData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center px-4">
                <div className="bg-white shadow-2xl rounded-3xl p-12 text-center max-w-md border border-gray-100">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">No Data Found</h2>
                    <p className="text-gray-600 mb-6">Please fill out the registration form first</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 transition-all shadow-lg"
                    >
                        Go to Form
                    </button>
                </div>
            </div>
        );
    }

    const renderSection = (title: string, icon: React.ReactNode, data: Record<string, any>) => {
        const hasData = Object.entries(data).some(([_, value]) => value !== undefined && value !== null && value !== '');
        if (!hasData) return null;

        return (
            <section className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-200">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                        {icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                </div>
                <dl className="space-y-4">
                    {Object.entries(data).map(([key, value]) => {
                        if (value === undefined || value === null || value === '') return null;

                        if (key === 'profilePhoto' && value instanceof FileList) {
                            return (
                                <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2">
                                    <dt className="text-sm font-semibold text-gray-500 capitalize sm:w-1/3">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </dt>
                                    <dd className="text-sm text-gray-900 font-medium sm:w-2/3 bg-primary-50 px-3 py-2 rounded-lg">
                                        📎 {value[0]?.name || 'No file'}
                                    </dd>
                                </div>
                            )
                        }
                        return (
                            <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2">
                                <dt className="text-sm font-semibold text-gray-500 capitalize sm:w-1/3">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </dt>
                                <dd className="text-sm text-gray-900 font-medium sm:w-2/3 break-words bg-gray-50 px-3 py-2 rounded-lg">
                                    {Array.isArray(value) ? value.join(', ') : value.toString()}
                                </dd>
                            </div>
                        );
                    })}
                </dl>
            </section>
        );
    };

    const personalInfo = {
        fullName: formData.fullName,
        email: formData.email,
        gender: formData.gender,
        birthDate: formData.birthDate,
        profilePhoto: formData.profilePhoto,
    };

    const professionalInfo = {
        yearsOfExperience: formData.yearsOfExperience,
        skills: formData.skills,
    };

    const additionalInfo = {
        bio: formData.bio,
        agreeToTerms: formData.agreeToTerms ? '✓ Agreed' : '✗ Not Agreed',
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white shadow-2xl rounded-3xl p-8 mb-8 border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-500 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Registration Complete</h1>
                            </div>
                            <p className="text-gray-600 ml-15">Your information has been successfully submitted</p>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors text-sm font-semibold shadow-sm hover:shadow flex items-center gap-2 justify-center sm:justify-start"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Information
                        </button>
                    </div>
                </div>

                {/* Sections */}
                <div className="space-y-6">
                    {renderSection(
                        'Personal Information',
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>,
                        personalInfo
                    )}
                    {renderSection(
                        'Professional Info',
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>,
                        professionalInfo
                    )}
                    {renderSection(
                        'Additional Information',
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>,
                        additionalInfo
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-10">
                    <p className="text-sm text-gray-500">Thank you for your registration!</p>
                </div>
            </div>
        </div>
    );
};
