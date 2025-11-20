import { asc } from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const results = await useDrizzle()
        .selectDistinct({ hairType: tables.animals.hairType })
        .from(tables.animals)
        .orderBy(asc(tables.animals.hairType))
        .all()

    return results.map(i => i.hairType).filter(i => !!i)
})