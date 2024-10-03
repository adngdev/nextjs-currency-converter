'use server'

import axios from 'axios';

import rateProcessor from '@/lib/rate-processor';
import dateProcessor from '@/lib/date-processor';

import { formSchema, formSchemaType } from '@/validation/form-validation';

export default async function getConvertedAmount(data: formSchemaType) {
    const validatedFields = formSchema.safeParse(data);

    if (!validatedFields.success) {
        return { message: 'Invalid fields!' };
    }

    const { amount } = validatedFields.data;

    try {
        const { endDate } = dateProcessor();

        const response = await axios.get(`https://openexchangerates.org/api/historical/${endDate}.json?base=AUD&app_id=${process.env.NEXT_PUBLIC_OPEN_EXCHANGE_API_KEY}`);

        return {
            message: 'Successfully exchanged amount!',
            data: rateProcessor(response.data.rates, amount)
        };
    } catch (error) {
        return { message: 'Something went wrong!' };
    }
};
