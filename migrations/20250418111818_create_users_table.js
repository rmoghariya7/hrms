/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("roles", (table) => {
    table.increments("id").primary();
    table.string("role").notNullable().unique();
  });

  await knex.schema
    .createTable("permissions", (table) => {
      table.increments("id").primary();
      table.string("permission").notNullable().unique();
    })
    .then(() => {
      return knex("permissions").insert([{ permission: "manage_users" }]);
    });

  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("phone_number");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("user_roles", (table) => {
    table
      .uuid("user_id")
      .primary()
      .defaultTo(knex.raw("gen_random_uuid()"))
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .defaultTo(knex.fn.uuid());
    table
      .integer("role_id")
      .references("id")
      .inTable("roles")
      .onDelete("CASCADE");
    table.primary(["user_id", "role_id"]);
  });

  await knex.schema.createTable("user_permissions", (table) => {
    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
    table
      .integer("permission_id")
      .references("id")
      .inTable("permissions")
      .onDelete("CASCADE");
    table.primary(["user_id", "permission_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("user_roles")
    .dropTableIfExists("user_permissions")
    .dropTableIfExists("users")
    .dropTableIfExists("roles")
    .dropTableIfExists("permissions");
};
