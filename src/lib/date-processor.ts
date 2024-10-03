export default function dateProcessor() {
    const currentDate = Date.now();
    const milSecIn14Days = 14 * 24 * 60 * 60 * 1000;
    const previousDate = currentDate - milSecIn14Days;

    return {
        startDate: (new Date(previousDate)).toLocaleDateString('en-CA', { year: 'numeric', month: 'numeric', day: 'numeric' }),
        endDate: (new Date(currentDate)).toLocaleDateString('en-CA', { year: 'numeric', month: 'numeric', day: 'numeric' })
    }
};
