const config = require("../knexfile");
const knex = require("knex")(config);

const getSushiBars = async () => {
  const sushiBars = await knex("sushi_bars").select();
  return sushiBars;
};

const addSushiBar = params => {
  const name = params.name;
  const rating = Number(params.rating);
  if (rating >= 1 && rating <= 6) {
    return knex("sushi_bars").insert({
      name,
      rating
    });
  }
  return "Rating is from 1 to 5. Please put a good number!";
};

const deleteSushiBars = () => {
  return knex("sushi_bars")
    .select()
    .del();
};

module.exports = { getSushiBars, addSushiBar, deleteSushiBars };
