import express from "express";
import cors from "cors";
import productsRouter from "./api/products/index.js";
import {
  badRequestHandler,
  genericErrorHandler,
  notFoundHandler,
} from "./errorHandlers.js";

const server = express();

// ************************************* MIDDLEWARES *******************************
server.use(cors());
server.use(express.json());

// *************************************** ENDPOINTS *******************************
server.use("/products", productsRouter);

// ************************************ ERROR HANDLERS *****************************
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

export default server;
