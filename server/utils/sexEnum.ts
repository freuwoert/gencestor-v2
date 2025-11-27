export function useSexEnum(sex: string | null | undefined): string {
    switch (sex) {
        case 'male': return 'Rüde'
        case 'female': return 'Hündin'
        default: return 'unbekannt'
    }
}