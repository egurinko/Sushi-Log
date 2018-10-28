const { setupExpressServer } = require("..");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const sushiBars = require("./data.json");
const config = require("../knexfile");
const knex = require("knex")(config);

const app = setupExpressServer();

describe("The express server", () => {
  let request;
  let counter = 0;
  beforeEach(() => {
    request = chai.request(app);
    const fetches = sushiBars.map(bar => {
      counter++;
      return knex("sushi_bars").insert({
        id: counter,
        name: bar.name,
        rating: bar.rating
      });
    });
    Promise.all(fetches);
  });
  afterEach(() => {
    counter = 0;
    return knex("sushi_bars")
      .select()
      .del();
  });

  describe("GET /sushi_bar", () => {
    it("should return status 200", async () => {
      const res = await request.get("/sushi_bar");
      res.should.have.status(200);
    });
    it("should return sushi_bar in Tokyo", async () => {
      const res = await request.get("/sushi_bar");
      JSON.parse(res.text)[0].should.deep.equal({
        id: 1,
        name: "DaiwaSushi",
        rating: 4.5
      });
    });
    it("should return specific sushi_bar", async () => {
      const res = await request.get("/sushi_bar/3");
      JSON.parse(res.text)[0].should.deep.equal({
        id: 3,
        name: "SUSHIZANMAIHonten",
        rating: 4.5
      });
    });
  });

  describe("POST /sushi_bar/add/:name/:rating", () => {
    it("should send status 400 if rating is not 1-5", async () => {
      const res = await request.post("/sushi_bar/add/extreme/10");
      res.should.have.status(400);
    });
    it("should post correctly to database", () => {
      const result = request.post("/sushi_bar/add/DaiwaSushi/4");
      const check = request.get("/sushi_bar");
      Promise.all([result, check]).then(data => {
        JSON.parse(data[1].text)
          .pop()
          .should.deep.equal({
            id: 4,
            name: "DaiwaSushi",
            rating: 4
          });
      });
    });
  });
  describe("PUT /sushi_bar/replace", () => {
    it("should send status 200", async () => {
      const res = await request.put("/sushi_bar/replace/5/kappa/2");
      res.should.have.status(200);
    });
    it("should add record if there is no value", () => {
      const result = request.put("/sushi_bar/replace/21/kappa/2");
      const check = request.get("/sushi_bar/21");
      Promise.all([result, check]).then(data => {
        JSON.parse(data[1].text)
          .pop()
          .should.deep.equal({
            id: 21,
            name: "kappa",
            rating: 2
          });
      });
    });
    it("should change record if there is a value", () => {
      const result = request.put("/sushi_bar/replace/3/kappa/2");
      const check = request.get("/sushi_bar/3");
      Promise.all([result, check]).then(data => {
        JSON.parse(data[1].text)
          .pop()
          .should.deep.equal({
            id: 3,
            name: "kappa",
            rating: 2
          });
      });
    });
  });
  describe("DELETE /sushi_bar/delete", () => {
    it("should send status 200", async () => {
      const res = await request.delete("/sushi_bar/delete");
      res.should.have.status(200);
    });
    it("should delete all data", () => {
      const result = request.delete("/sushi_bar/delete");
      const check = request.get("/sushi_bar");
      Promise.all([result, check]).then(data => {
        chai.expect(JSON.parse(data[1].text).length).to.eql(0);
      });
    });
  });
});
