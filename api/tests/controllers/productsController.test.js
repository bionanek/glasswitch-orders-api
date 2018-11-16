const sinon = require('sinon');
const expect = require('chai').expect;

const Products = require('../../db/dbHelper').Products;
const ProductModel = require('../../db/models/product');
const ProductsController = require('../../controllers/productsController');

describe('ProductsController.get_all()', () => {

    let sandbox;

    beforeEach((done) => {
        sandbox = sinon.createSandbox();

        Products.destroy({
            where: {},
            truncate: true
        });
        done();
    });

    afterEach((done) => {
        sandbox.restore();
        done();
    });

    it('should return all available products', (done) => {

        // ARRANGE 
        var product1Mock = sinon.mock(ProductModel);
        var product2Mock = sinon.mock(ProductModel);

        var expectedResult = [product1Mock, product2Mock];           
        Products.bulkCreate(expectedResult)
            .then(() => {
                // ACT 
                ProductsController.get_all()
            })
            .then((req, res) => {

                console.log(res);
                //ASSERT
                // expect(res.Products).to.equal(expectedResult);
                // expect(res.Total).to.equal(expect.length);
                done();
            });
    });
});