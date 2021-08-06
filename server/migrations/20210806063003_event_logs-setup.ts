import {Knex} from 'knex'

export async function up(knex: Knex): Promise<any> {
    return knex.schema.hasTable('event_logs')
            .then(isTableExists => {
                if(!isTableExists) {
                    return knex.schema.createTable('event_logs', (t) => {
                        t.increments('id').primary()
                        t.bigInteger('createdAt').notNullable()
                        t.string('roomId').notNullable()
                        t.string('clientId').notNullable()
                        t.string('kind').notNullable()})
                }
                return
            })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('event_logs')
}