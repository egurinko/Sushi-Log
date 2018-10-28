exports.up = function(knex) {
  return knex.schema.createTable("sushi_bars", t => {
    t.increments().index();

    t.string("name", 50)
      .notNullable()
      .index();

    t.float("rating")
      .notNullable()
      .index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("sushi_bars");
};
