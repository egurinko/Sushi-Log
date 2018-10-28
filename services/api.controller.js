const config = require("../knexfile");
const knex = require("knex")(config);

const getSushiBars = async () => {
  const sushiBars = await knex("sushi_bars").select();
  return sushiBars;
};
const searchSushiBars = async data => {
  const searchedSushiBar = await knex("sushi_bars")
    .where({ id: data })
    .select();
  return searchedSushiBar;
};

const addSushiBar = params => {
  const name = params.name;
  const rating = Number(params.rating);
  if (rating >= 1 && rating <= 6) {
    return knex("sushi_bars")
      .insert({
        name,
        rating
      })
      .returning("*");
  }
  return "Rating is from 1 to 5. Please put a good number!";
};
const replaceSushiBars = data => {
  return knex("sushi_bars")
    .where({ id: data.id })
    .update({
      name: data.name,
      rating: data.rating
    });
};

const deleteSushiBars = () => {
  return knex("sushi_bars")
    .select()
    .del();
};

module.exports = {
  getSushiBars,
  searchSushiBars,
  addSushiBar,
  deleteSushiBars,
  replaceSushiBars
};
