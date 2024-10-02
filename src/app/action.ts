'use server'

import axios from 'axios';

import { formSchema, formSchemaType } from "@/validation/form-validation";
import rateProcessor from '@/lib/rate-processor';

export default async function getConvertedAmount(data: formSchemaType) {
    const validatedFields = formSchema.safeParse(data);

    if (!validatedFields.success) {
        return { message: 'Invalid fields!' };
    }

    const { amount } = validatedFields.data;

    try {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-CA', { year: 'numeric', month: 'numeric', day: 'numeric' });

        const response = await axios.get(`https://openexchangerates.org/api/historical/${formattedDate}.json?base=AUD&app_id=${process.env.NEXT_PUBLIC_OPEN_EXCHANGE_API_KEY}`);

        return {
            message: 'Successfully exchanged amount!',
            data: rateProcessor(response.data.rates, amount)
        };
    } catch (error) {
        return { message: 'Something went wrong!' };
    }
};
