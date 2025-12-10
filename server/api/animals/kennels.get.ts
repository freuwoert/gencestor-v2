import { asc } from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const results = await useDrizzle()
        .selectDistinct({ kennel: tables.animals.kennel })
        .from(tables.animals)
        .orderBy(asc(tables.animals.kennel))
        .all()

    return results.map(i => i.kennel).filter(i => !!i)
})