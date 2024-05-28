export function formatNumber(value: any) {
    return Number(value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
    });
}
