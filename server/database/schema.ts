import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const settings = sqliteTable('settings', {
    key: text('key').primaryKey().unique(),
    value: text('value'),
})

export const pedigrees = sqliteTable('pedigrees', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title'),
    kennel: text('kennel'),
    address: text('address'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
})

// @ts-ignore
export const animals = sqliteTable('animals', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    legacyId: text('legacy_id'),
    chipNumber: text('chip_number'),
    studbookNumber: text('studbook_number'),
    name: text('name'),
    kennel: text('kennel'),
    kennelNameFirst: integer('kennel_name_first', { mode: 'boolean' }).notNull().default(false),
    awardsLength1: text('awards_length_1'),
    awardsLength2: text('awards_length_2'),
    awardsLength3: text('awards_length_3'),
    awardsLength4: text('awards_length_4'),
    notes: text('notes'),
    birthDate: text('birth_date'),
    breed: text('breed'),
    sex: text('sex'),
    size: text('size'),
    hair_type: text('hair_type'),
    hair_color: text('hair_color'),
    pedigreeId: integer('pedigree_id').references(() => pedigrees.id),
    // @ts-ignore
    motherId: integer('mother_id').references(() => animals.id),
    fatherId: integer('father_id').references(() => animals.id),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
})