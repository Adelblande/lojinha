'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPhotoFkSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table
        .foreign('photo', 'photo_user')
        .references('id')
        .inTable('images')
        .onUpdate('cascade')
        .onDelete('cascade')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropForeign('photo_user')
      table.dropColumn('photo')
    })
  }
}

module.exports = UserPhotoFkSchema
