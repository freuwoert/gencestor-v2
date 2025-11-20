export default defineEventHandler(async (event) => {
    const results = await useDrizzle().select().from(tables.settings).all()

    return results.reduce((acc, setting) => {
        acc[setting.key] = JSON.parse(setting.value as string)
        return acc
    }, {} as Record<string, any>)
})