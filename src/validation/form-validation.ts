import { z } from 'zod';

export const formSchema = z.object({
    amount: z.number({ coerce: true })
});

export type formSchemaType = z.infer<typeof formSchema>;
