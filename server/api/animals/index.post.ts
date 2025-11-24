import { z } from 'zod'

const requestBodySchema = z.object({
    legacyId: z.string().max(255).optional().nullable(),
    chipNumber: z.string().max(255).optional().nullable(),
    studbookNumber: z.string().max(255).optional().nullable(),
    name: z.string().max(255).optional().nullable(),
    kennel: z.string().max(255).optional().nullable(),
    kennelNameFirst: z.boolean().default(false).optional().nullable(),
    awardsLength1: z.string().max(1023).optional().nullable(),
    awardsLength2: z.string().max(1023).optional().nullable(),
    awardsLength3: z.string().max(1023).optional().nullable(),
    awardsLength4: z.string().max(1023).optional().nullable(),
    notes: z.string().max(1023).optional().nullable(),
    birthDate: z.coerce.date().optional().nullable(),
    breed: z.string().max(255).optional().nullable(),
    sex: z.enum(['male', 'female', 'unknown']).optional().nullable(),
    size: z.string().max(255).optional().nullable(),
    hairType: z.string().max(255).optional().nullable(),
    hairColor: z.string().max(255).optional().nullable(),
    motherId: z.number().optional().nullable(),
    fatherId: z.number().optional().nullable(),
})

export default defineEventHandler(async (event) => {
    const requestBody = await readValidatedBody(event, requestBodySchema.parse)

    const result = await useDrizzle()
        .insert(tables.animals)
        .values(requestBody)
        .returning() as Animal[]

    return result[0]
})