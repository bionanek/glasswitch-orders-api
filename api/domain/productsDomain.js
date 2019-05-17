const productRepo = require("@repos/productRepository");
const { IdNotFound, SequelizeError } = require("@helpers/errors");
const { Verification, Resources } = require("@verify/verification");
const imageUtils = require("../../productsImages/imageUtils");
const fileSystem = require("fs");

exports.create = async productData => {
  try {
    return await productRepo.createProduct(productData);
  } catch (error) {
    throw new Error(error);
  }
};

exports.update = async (productId, updatedProductData) => {
  try {
    await Verification.IdExists(Resources.Products, productId);
    const product = await productRepo.getById(productId);
    await this.imageUpdate(product, updatedProductData);

    return await productRepo.updateProduct(productId, updatedProductData);
  } catch (error) {
    if (error.name.includes("Sequelize")) {
      throw new SequelizeError("Field cannot be null.");
    }
    throw new IdNotFound(
      "Product with given ID doesn't exist. No product was updated."
    );
  }
};

exports.delete = async productId => {
  try {
    await Verification.IdExists(Resources.Products, productId);
    const product = await productRepo.getById(productId);
    imageUtils.imageDelete(product.imageName);

    return await productRepo.deleteProduct(productId);
  } catch (error) {
    throw new IdNotFound(
      "Product with given ID doesn't exist. No product was deleted."
    );
  }
};

exports.getAll = async () => {
  try {
    return await productRepo.getAll();
  } catch (error) {
    throw new Error("No products were found.");
  }
};

exports.getById = async productId => {
  try {
    await Verification.IdExists(Resources.Products, productId);

    return await productRepo.getById(productId);
  } catch (error) {
    throw new IdNotFound("Product with given ID doesn't exist.");
  }
};

exports.getSearchResults = async searchPhrase => {
  return await productRepo.getSearchResults(searchPhrase);
};

exports.imageUpdate = async (product, updatedProductData) => {
  if (product.imageName !== updatedProductData.imageName) {
    if (updatedProductData.imageName === undefined) {
      await this.imageNameUrlUpdate(updatedProductData, product.imageName);
    }
    updatedProductData.imageUrl =
      "http://localhost:3001/" + updatedProductData.imageName;

    imageUtils.imageDelete(product.imageName);
  }
};

exports.imageNameUrlUpdate = (updatedProductData, oldFileName) => {
  const dateNoTime = new Date().toISOString().split("T")[0];

  updatedProductData.imageName =
    updatedProductData.code + "_" + dateNoTime + ".jpg";

  updatedProductData.imageUrl =
    "http://localhost:3001/" + updatedProductData.imageName;

  imageUtils.imageRename(oldFileName, updatedProductData.imageName);

  return updatedProductData;
};
