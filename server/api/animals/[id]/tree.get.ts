import { eq } from "drizzle-orm"
import z from "zod"

const requestParamsSchema = z.object({
    id: z.coerce.number(),
})

const requestQuerySchema = z.object({
    generations: z.coerce.number().min(1).max(10).default(4),
})

export default defineEventHandler(async (event) => {
    const requestParams = await getValidatedRouterParams(event, requestParamsSchema.parse)
    const requestQuery = await getValidatedRouterParams(event, requestQuerySchema.parse)

    return await getTree(requestParams.id, requestQuery.generations)
})

async function getTree(childId: number, generations: number): Promise<Animal | null> {
    if (generations <= 0) return null
    if (!childId) return null

    const child = await useDrizzle().query.animals.findFirst({
        where: eq(tables.animals.id, childId),
    })

    if (!child) return null

    child.father = child.fatherId ? await getTree(child.fatherId, generations - 1) : null
    child.mother = child.motherId ? await getTree(child.motherId, generations - 1) : null

    return child as Animal
}