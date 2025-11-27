import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const formSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    gender: z.enum(["male", "female", "other"] as const),
    birthDate: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Valid date is required" }),
    profilePhoto: z
        .any()
        .refine((files) => files?.length == 1, "Profile photo is required.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),

    yearsOfExperience: z.number().min(0).max(50),
    skills: z.array(z.string()).min(1, "Select at least one skill"),

    bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
    agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

export type FormData = z.infer<typeof formSchema>;
