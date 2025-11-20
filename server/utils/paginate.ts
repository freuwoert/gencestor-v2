export function usePaginate<T>(items: T[], page: number, pageSize: number) {
    const totalItems = items.length
    const totalPages = Math.ceil(totalItems / pageSize)
    const currentPage = Math.min(Math.max(1, page), totalPages)

    const startIndex = (currentPage - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, totalItems)

    const paginatedItems = items.slice(startIndex, endIndex)

    return {
        totalItems,
        totalPages,
        page: currentPage,
        size: pageSize,
        items: paginatedItems,
    }
}