const Products = require("@db/dbHelper").Products;
const Prices = require("@db/dbHelper").Prices;
const Sequelize = require("@db/dbHelper").Sequelize;

const Op = Sequelize.Op;
exports.Products = Products;

exports.createProduct = async productData => {
  return await Products.create(productData, {
    include: [Products.Price],
    as: "productId"
  });
};

exports.updateProduct = async (productId, updatedProductData) => {
  const productUpdate = await Products.update(updatedProductData, {
    where: { id: productId }
  });
  const priceUpdate = await Prices.update(updatedProductData.price, {
    where: { id: updatedProductData.priceId }
  });

  return parseInt(productUpdate) + parseInt(priceUpdate);
};

exports.deleteProduct = async productId => {
  let affectedRows = 0;
  const priceId = await Products.findById(productId).priceId;

  affectedRows += await Products.destroy({
    where: { id: productId },
    cascade: true
  });
  affectedRows += await Prices.destroy({ where: { id: priceId } });

  return affectedRows;
};

exports.getAll = async () => {
  return await Products.findAll({ include: [Products.Price] }).map(el =>
    el.get({ plain: true })
  );
};

exports.getById = async productId => {
  return await Products.findById(productId, { include: [Products.Price] });
};

exports.getSearchResults = async searchPhrase => {
  const likeOperator = { [Op.like]: `%${searchPhrase}%` };
  const searchResults = await Products.findAll({
    where: {
      [Op.or]: [
        { name: likeOperator },
        { code: likeOperator },
        { description: likeOperator },
        { category: likeOperator },
        { type: likeOperator }
      ]
    },
    include: [Products.Price]
  });

  return searchResults;
};
