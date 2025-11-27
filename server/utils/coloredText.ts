export function useColoredText(text: string | null | undefined): string {
    if (!text) return ''

    text = text
        .replace(/\*\*\*\*/g, '</span><span style="color:inherit;">')
        .replace(/\*\*\*/g, '</span><span style="color:#009432;">')
        .replace(/\*\*/g, '</span><span style="color:red;">')
        .replace(/\*/g, '</span><span style="color:blue;">')

    return `<span>${text}</span>`
}