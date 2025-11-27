import dayjs from 'dayjs'

export function useGermanDate(date?: Date | string | null | undefined): string {
    if (!date) return ''
    return dayjs(date).format('DD.MM.YYYY')
}