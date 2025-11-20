import { asc } from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const results = await useDrizzle()
        .selectDistinct({ hairColor: tables.animals.hairColor })
        .from(tables.animals)
        .orderBy(asc(tables.animals.hairColor))
        .all()

    return results.map(i => i.hairColor).filter(i => !!i)
})