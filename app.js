const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("config");
var cors = require("cors");

const app = express();

const productsRoutes = require("@routes/productsRouter");
const customersRoutes = require("@routes/customersRouter");
const ordersRoutes = require("@routes/ordersRouter");

if (config.util.getEnv("NODE_ENV") == "test") {
  app.use(morgan("test"));
} else {
  app.use(morgan("dev"));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/products", productsRoutes);
app.use("/customers", customersRoutes);
app.use("/orders", ordersRoutes);

app.use((request, response, next) => {
  const error = new Error("Not found");
  error.status = 404;

  next(error);
});

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
