/* eslint-disable */

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("mocks/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/api/product/valid-types", (req, res) => {
  res.json({
    customerCategory: ["men", "women", "kids"],
    productCategory: ["tops", "bottoms", "footwear"],
    type: ["hoodie", "t-shirt", "pants", "shoes"],
  });
});

server.use("/api", router);

server.listen(8080, () => {
  console.log("✅ JSON Server is running at: http://localhost:8080/api");
});
