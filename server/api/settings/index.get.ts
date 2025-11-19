export default defineEventHandler(async (event) => {
    const settings = await useDrizzle()
    .select()
    .from(tables.settings)
    .all()

    return settings.reduce((acc, setting) => {
        acc[setting.key] = JSON.parse(setting.value as string)
        return acc
    }, {} as Record<string, any>)
})