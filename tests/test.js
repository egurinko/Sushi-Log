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
  describe("PUT /sushi_bar/add/:name/:rating", () => {
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
});
