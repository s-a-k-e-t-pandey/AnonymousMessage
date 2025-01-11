import {z} from 'zod'


export const signupSchema = z.object({
    identifier: z.string().email(),
    password: z.string().min(6).max(20)
});