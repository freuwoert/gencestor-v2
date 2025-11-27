export type PedigreeResource = Pedigree & {
    kennelNameFirst: boolean
    breed: string | null
    birthDate: string | null
    animals: AnimalResource[]
    fatherId: number | null
    father: AnimalResource | null
    motherId: number | null
    mother: AnimalResource | null
    maleCount: number
    femaleCount: number
}

export type PedigreeStructure = Omit<PedigreeResource, 'id'> & {
    id: number | null
}