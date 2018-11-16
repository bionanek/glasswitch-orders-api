const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const ProductModel = require('../../db/models/product').Product;
const productDomain = require('../../domain/products');

describe('Products', () => {

    let clearDatabase = () => {
        ProductModel.destroy({
            where: {},
            truncate: true
        });
    }

    beforeEach((done) => {
        clearDatabase();
        done();
    });

    afterEach((done) => {
        clearDatabase();
        done();
    });

    it('Create new product', () => {
        var productTestObj = {
            name: 'TestProduct'
        };
        console.log('Mock object: ' + productTestObj.name + ', ' + productTestObj.id);

        var createProductPromise = productDomain.createProduct(productTestObj);
        return Promise.all([
            createProductPromise.should.eventually.have.property('name').equal(productTestObj.name),
            createProductPromise.should.eventually.have.property('id'),
            createProductPromise.should.eventually.have.property('id').that.is.a('number')

        ]);
    });
});