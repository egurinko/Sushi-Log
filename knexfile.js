// Update with your config settings.

module.exports = {
  client: "pg",
  connection:
    process.env.DATABASE_URL || "postgres://toru@localhost:5432/sushi",
  ssl: true,
  debug: true,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
