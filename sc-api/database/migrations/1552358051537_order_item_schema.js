'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderItemSchema extends Schema {
  up () {
    this.create('order_items', (table) => {
      table.increments()
      table.integer('product_id').unsigned()
      table.integer('quantity')
      table.integer('order_id').unsigned()
      table.timestamps()

      table
        .foreign('product_id')
        .references('id')
        .inTable('products')
        .onUpdate('cascade')
        .onDelete('cascade')
        
      table
        .foreign('order_id')
        .references('id')
        .inTable('orders')
        .onUpdate('cascade')
        .onDelete('cascade')

    })
  }

  down () {
    this.drop('order_items')
  }
}

module.exports = OrderItemSchema
