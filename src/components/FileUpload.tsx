import { useState } from "react";
import { Controller } from "react-hook-form";
import type { FileUploadProps } from "../types";
import type { FieldValues } from "react-hook-form";

export const FileUpload = <T extends FieldValues>({
  label,
  name,
  control,
  error,
  className,
  onFileChange,
  ...props
}: FileUploadProps<T>) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => {
        const file = value && value.length > 0 ? value[0] : null;
        const fileName = file?.name;

        const handleDragOver = (e: React.DragEvent) => {
          e.preventDefault();
          setIsDragging(true);
        };

        const handleDragLeave = (e: React.DragEvent) => {
          e.preventDefault();
          setIsDragging(false);
        };

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          setIsDragging(false);

          const files = e.dataTransfer.files;
          if (files && files.length > 0) {
            onChange(files);
            if (onFileChange) {
              onFileChange(files[0]);
            }
          }
        };

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            onChange(files);
            if (onFileChange) {
              onFileChange(files[0]);
            }
          }
        };

        const clearFile = () => {
          onChange(null);
          if (onFileChange) {
            onFileChange(null);
          }
        };

        return (
          <div className="flex flex-col gap-2">
            <label
              htmlFor={name}
              className="text-sm font-semibold text-gray-700"
            >
              {label}{" "}
              {props.required !== false && (
                <span className="text-red-500">*</span>
              )}
            </label>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl transition-all ${
                isDragging
                  ? "border-primary-500 bg-primary-50"
                  : error
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:border-primary-300 bg-gray-50"
              }`}
            >
              <input
                id={name}
                type="file"
                onChange={handleFileChange}
                ref={ref}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                {...props}
              />

              <div className="p-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                      isDragging
                        ? "bg-primary-100"
                        : error
                        ? "bg-red-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <svg
                      className={`w-8 h-8 transition-colors ${
                        isDragging
                          ? "text-primary-600"
                          : error
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>

                  <div>
                    {fileName ? (
                      <div className="flex items-center gap-2 text-sm">
                        <svg
                          className="w-5 h-5 text-primary-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-semibold text-gray-700">
                          {fileName}
                        </span>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-gray-700">
                          <span className="text-primary-600 hover:text-primary-700 cursor-pointer">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, WEBP up to 5MB
                        </p>
                      </>
                    )}
                  </div>

                  {fileName && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        clearFile();
                      }}
                      className="text-xs text-primary-600 hover:text-primary-700 font-semibold underline z-20 relative"
                    >
                      Change file
                    </button>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <span className="text-xs text-red-500 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error.message?.toString()}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};
