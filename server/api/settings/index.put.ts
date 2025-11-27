import { sql } from 'drizzle-orm'
import { z } from 'zod'

const requestBodySchema = z.object({
    'general.notes': z.string().optional().nullable(),
})

export default defineEventHandler(async (event) => {
    const requestBody = await readValidatedBody(event, requestBodySchema.parse)
    const settings = Object.entries(requestBody).map(([key, value]) => ({ key, value: JSON.stringify(value) }))

    await useDrizzle()
    .insert(tables.settings)
    .values(settings)
    .onConflictDoUpdate({
        target: [tables.settings.key],
        set: { value: sql`EXCLUDED.value` },
    })
})