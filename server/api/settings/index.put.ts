import { sql } from 'drizzle-orm'
import { z } from 'zod'

const settingsSchema = z.object({
    'margin.1.top': z.number().optional(),
    'margin.1.bottom': z.number().optional(),
    'margin.1.left': z.number().optional(),
    'margin.1.right': z.number().optional(),
    'margin.2.top': z.number().optional(),
    'margin.2.bottom': z.number().optional(),
    'margin.2.left': z.number().optional(),
    'margin.2.right': z.number().optional(),
    'margin.3.top': z.number().optional(),
    'margin.3.bottom': z.number().optional(),
    'margin.3.left': z.number().optional(),
    'margin.3.right': z.number().optional(),
})

export default defineEventHandler(async (event) => {
    const db = useDrizzle()
    const body = await readValidatedBody(event, settingsSchema.parse)
    const settings = Object.entries(body).map(([key, value]) => ({ key, value: JSON.stringify(value) }))

    await db
    .insert(tables.settings)
    .values(settings)
    .onConflictDoUpdate({
        target: [tables.settings.key],
        set: { value: sql`EXCLUDED.value` },
    })
})