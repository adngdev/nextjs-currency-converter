export default function logProcessor(rates: { [date: string]: { [currency: string]: number } }, currency: string) {
    return Object.entries(rates).map(([date, values]) => ({
        date: date,
        rateOnDate: values[currency].toFixed(3)
    }));
};
