import type { Knex } from 'knex'

// export const Meal = {
//   id: "8",
//   name: "Hambúrguer artesanal",
//   description: "sanduiche de pao integral com atum e salada de alface e tomate",
//   date: "11/08/2003",
//   time: "21:00",
//   isOnDiet: false,
// }

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.text('description').notNullable()
    table.timestamp('consumed_at').notNullable()
    table.boolean('isOnDiet').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
