export function limitNumber(num) {
    return parseFloat((num || 0).toFixed(2))
}