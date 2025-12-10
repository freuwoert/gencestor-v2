import { asc } from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const results = await useDrizzle()
        .selectDistinct({ breeder: tables.pedigrees.breeder })
        .from(tables.pedigrees)
        .orderBy(asc(tables.pedigrees.breeder))
        .all()

    return results.map(i => i.breeder).filter(i => !!i)
})