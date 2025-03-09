const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("mocks/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use("/api", router);

server.listen(8080, () => {
  console.log("✅ JSON Server is running at: http://localhost:8080/api");
});
