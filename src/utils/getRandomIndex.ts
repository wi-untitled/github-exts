export function getRandomIndex<T>(array: T[]): number {
    return Math.floor(array.length * Math.random());
}
