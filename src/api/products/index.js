import express from "express"
import ProductsModel from "./model.js"
import createHttpError from "http-errors";

const productsRouter = express.Router()

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductsModel.find()
    res.send(products)
  } catch (error) {
    next(error)
  }
})

productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = new ProductsModel(req.body)
    const { _id } = await newProduct.save()
    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await ProductsModel.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      next(createHttpError(404, `Product with ID ${req.params.id} not found`));
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedProduct = await ProductsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (updatedProduct) {
      res.send(updatedProduct);
    } else {
      next(createHttpError(404, `Product with id ${req.params.id} not found.`));
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedProduct = await ProductsModel.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `Product with id ${req.params.id} not found.`));
    }
  } catch (error) {
    next(error);
  }
});

export default productsRouter
