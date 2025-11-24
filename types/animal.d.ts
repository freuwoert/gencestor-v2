export type AnimalResource = Omit<Animal, 'birthDate'> & {
    birthDate: string | null
    mother: AnimalResource | null
    father: AnimalResource | null
}
export type AnimalStructure = Omit<AnimalResource, 'id'> & {
    id: number | null
}