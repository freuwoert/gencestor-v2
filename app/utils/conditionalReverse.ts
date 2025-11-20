export function conditionalReverse<T>(array: T[], condition: boolean): T[] {
    return condition ? [...array].reverse() : array
}