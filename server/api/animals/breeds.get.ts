import { asc } from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const results = await useDrizzle()
        .selectDistinct({ breed: tables.animals.breed })
        .from(tables.animals)
        .orderBy(asc(tables.animals.breed))
        .all()

    return results.map(i => i.breed).filter(i => !!i)
})