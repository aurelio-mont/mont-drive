import z  from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const userSchema =  z.object({
    id_user: z.string(),
    email: z.string().email(),
    password: z.string().refine(password=>passwordRegex.test(password), {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
});

export const createUserSchema = userSchema.omit({id_user: true});

export const updateUserSchema = userSchema.partial({
    email: true,
    password: true,
});

export const deleteUserSchema = userSchema.omit({
    password: true,
    email: true,
});

export type User = z.infer<typeof userSchema>;

export type CreateUser = z.infer<typeof createUserSchema>;

export type UpdateUser = z.infer<typeof updateUserSchema>;

export type DeleteUser = z.infer<typeof deleteUserSchema>;