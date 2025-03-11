/* eslint-disable */

const jsonServerCanvas = require("json-server");
const serverCanvas = jsonServerCanvas.create();
const routerCanvas = jsonServerCanvas.router("mocks/db-canvas.json");
const middlewaresCanvas = jsonServerCanvas.defaults();

serverCanvas.use(middlewaresCanvas);

serverCanvas.use("/api", routerCanvas);

serverCanvas.listen(8080, () => {
  console.log(
    "✅ JSON Server(Canvas-based) is running at: http://localhost:8080/api",
  );
});
