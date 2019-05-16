const productRepo = require("@repos/productRepository");
const { IdNotFound, SequelizeError } = require("@helpers/errors");
const { Verification, Resources } = require("@verify/verification");
const removeImage = require("../../productsImages/removeImage");

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
    removeImage.imageDelete(product.imageName);

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
