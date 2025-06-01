/* eslint-disable */

const jsonServerCanvas = require("json-server");
const serverCanvas = jsonServerCanvas.create();
const routerCanvas = jsonServerCanvas.router("mocks/db-canvas.json");
const middlewaresCanvas = jsonServerCanvas.defaults();

serverCanvas.use(middlewaresCanvas);

serverCanvas.get("/api/product/valid-types", (req, res) => {
  res.json({
    customerCategory: ["men", "women", "kids"],
    productCategory: ["tops", "bottoms", "footwear"],
    type: ["hoodie", "t-shirt", "pants", "shoes"],
  });
});

serverCanvas.use("/api", routerCanvas);

serverCanvas.listen(8080, () => {
  console.log(
    "✅ JSON Server(Canvas-based) is running at: http://localhost:8080/api",
  );
});
