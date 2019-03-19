'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPhotoFkSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table
        .foreign('image_id')
        .references('id')
        .inTable('images')
        .onDelete('cascade')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropForeign('image_id')
    })
  }
}

module.exports = UserPhotoFkSchema
