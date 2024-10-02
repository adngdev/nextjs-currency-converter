export default function rateProcessor(rates: { [name: string]: number }, amount: number) {
    return Object.entries(rates).map(([currency, rate]) => ({
        currency,
        rate,
        exchangedAmount: amount * rate
    }));
}
