/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  await knex.schema
    .createTable("roles", (table) => {
      table.integer("role").notNullable().unique();
    })
    .then(() => {
      return knex("roles").insert([{ role: 0 }, { role: 1 }, { role: 2 }]);
    });

  await knex.schema
    .createTable("permissions", (table) => {
      table.string("permission").notNullable().unique();
    })
    .then(() => {
      return knex("permissions").insert([{ permission: "manage_users" }]);
    });

  await knex.schema.createTable("organization", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("phone").notNullable();
    table.string("address").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("country").notNullable();
    table.string("zip_code").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.string("password").notNullable();
    table.integer("role").defaultTo(1);
  });

  await knex.schema.createTable("employee", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("phone_number");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("employee_organization", (table) => {
    table
      .integer("employee_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("employee")
      .onDelete("CASCADE");
    table
      .integer("organization_id")
      .references("id")
      .inTable("organization")
      .onDelete("CASCADE");
    table.primary(["employee_id", "organization_id"]);
  });

  await knex.schema.createTable("employee_roles", (table) => {
    table
      .increments("employee_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("employee")
      .onDelete("CASCADE");
    table
      .integer("role")
      .references("role")
      .inTable("roles")
      .onDelete("CASCADE");
    table.primary(["employee_id", "role"]);
  });

  await knex.schema.createTable("employee_permissions", (table) => {
    table
      .integer("employee_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("employee")
      .onDelete("CASCADE");
    table
      .string("permission")
      .references("permission")
      .inTable("permissions")
      .onDelete("CASCADE");
    table.primary(["employee_id", "permission"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("employee_roles")
    .dropTableIfExists("employee_permissions")
    .dropTableIfExists("employee")
    .dropTableIfExists("organization")
    .dropTableIfExists("employee_organization")
    .dropTableIfExists("roles")
    .dropTableIfExists("permissions");
};
