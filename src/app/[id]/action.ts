
'use server'

import axios from 'axios';

import dateProcessor from '@/lib/date-processor';

export default async function getHistoricalExchangeRate(currency: string) {
    try {
        const { startDate, endDate } = dateProcessor();
        
        const response = await axios.get(`https://openexchangerates.org/api/time-series.json?app_id=${process.env.NEXT_PUBLIC_OPEN_EXCHANGE_API_KEY}&start=${startDate}&end=${endDate}&base=AUD&symbols=${currency}`);
        
        return response.data.rates;
    } catch (error) {
        return { message: 'Something went wrong' };
    }
};
