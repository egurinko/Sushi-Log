const { setupExpressServer } = require("..");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const app = setupExpressServer();

describe("The express server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(app);
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
        name: "s",
        rating: 1
      });
    });
    it("should return specific sushi_bar", async () => {
      const res = await request.get("/sushi_bar/3");
      JSON.parse(res.text)[0].should.deep.equal({
        id: 3,
        name: "sus",
        rating: 3
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
    it("should put correctly to database", () => {
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
  });
  describe("DELETE /sushi_bar/delete", () => {
    it("should send status 200", async () => {
      const res = await request.delete("/sushi_bar/delete");
      res.should.have.status(200);
    });
    it("should delete all data", () => {
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
  });
});
