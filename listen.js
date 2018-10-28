const { setupExpressServer } = require("./index.js");

const PORT = process.env.PORT || 3000;
const app = setupExpressServer();
app.listen(PORT, () => {
  console.log("Server is listening on PORT:", PORT);
});
