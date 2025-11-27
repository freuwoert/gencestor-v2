import type { PedigreeResource } from "~~/types/pedigree"
import { eq } from "drizzle-orm"
import z from "zod"

const requestParamsSchema = z.object({
    id: z.coerce.number(),
})

export default defineEventHandler(async (event) => {
    const requestParams = await getValidatedRouterParams(event, requestParamsSchema.parse)

    const result = await useDrizzle().query.pedigrees.findFirst({
        with: { animals: true },
        where: eq(tables.pedigrees.id, requestParams.id),
    })

    if (!result) throw createError({ statusCode: 404, statusMessage: "Pedigree not found" })

    const firstChild = result.animals[0]

    return {
        ...result,
        fatherId: firstChild?.fatherId,
        motherId: firstChild?.motherId,
        kennelNameFirst: firstChild?.kennelNameFirst || false,
        breed: firstChild?.breed || null,
        birthDate: firstChild?.birthDate || null,
        maleCount: result.animals.filter(a => a.sex === 'male').length,
        femaleCount: result.animals.filter(a => a.sex === 'female').length,
    } as PedigreeResource
})