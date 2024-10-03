export default function rateProcessor(rates: { [name: string]: number }, amount: number) {
    return Object.entries(rates).slice(0,5).map(([currency, rate]) => ({
        currency,
        rate,
        exchangedAmount: amount * rate
    }));
};
