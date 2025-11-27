export function useNl2Br(text: string | null | undefined): string {
    if (!text) return ''
    return text.replace(/\n/g, '<br>')
}