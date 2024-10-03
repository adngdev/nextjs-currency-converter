import { z } from 'zod';

export const formSchema = z.object({
    amount: z.number({ coerce: true, message: 'Input must be a number' })
});

export type formSchemaType = z.infer<typeof formSchema>;
