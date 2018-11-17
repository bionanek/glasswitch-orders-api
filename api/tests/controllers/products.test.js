const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const ProductModel = require('../../db/models/product').Product;
const productDomain = require('../../domain/products');

describe('Products', () => {

    let clearDatabase = () => {
        console.log("Called clearDatabase");
        ProductModel.destroy({
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

    it('Should create new product', () => {
        //ARANGE
        var productTestObj = {
            name: 'TestProduct'
        };
        console.log('Mock object: ' + productTestObj.name + ', ' + productTestObj.id);

        //ACT
        var createProductPromise = productDomain.create(productTestObj);

        return Promise.all([

            //ASSERT
            createProductPromise.should.eventually.have.property('name').equal(productTestObj.name),
            createProductPromise.should.eventually.have.property('id'),
            createProductPromise.should.eventually.have.property('id').that.is.a('number')
        ]);
    });

    it('Should not create new product with name as empty string', () => {
        //ARANGE
        var productTestObj = {
            name: ""
        };
        var expectedErrorString = 'Name can\'t be empty';

        //ACT
        var createProductPromise = productDomain.create(productTestObj);

        return Promise.all([
            //ASSERT
            createProductPromise.should.eventually.be.rejectedWith(Error, expectedErrorString)
        ]);
    });

    it('Should not create new product with name as space only string', () => {
        //ARANGE
        var productTestObj = {
            name: " "
        };
        var expectedErrorString = 'Name can\'t be empty';

        //ACT
        var createProductPromise = productDomain.create(productTestObj);

        return Promise.all([
            //ASSERT
            createProductPromise.should.eventually.be.rejectedWith(Error, expectedErrorString)
        ]);
    });

    it('Should return a list of all products', () => {
        //ARANGE
        var productTestObj1 = {
            name: "Product1"
        };

        var productTestObj2 = {
            name: "Product2"
        };

        ProductModel.bulkCreate([productTestObj1, productTestObj2])
            .then(() => {
                ProductModel.findAll()
                    .map(el => el.get({ plain: true }))
                    .then((createdProducts) => {
                        //ACT
                        console.log('Created products: ');
                        console.log(createdProducts);
                        var getAllPromise = productDomain.getAll();
        
                        return Promise.all([
                            expect(getAllPromise).eventually.be.an('array'),
                            expect(getAllPromise).eventually.has.lengthOf(2),
                            expect(getAllPromise).eventually.equal(createdProducts) // TODO: throws Unhandled rejection AssertionError: expected [ Array(2) ] to equal [ Array(2) ]
                        ]);
                    });
            });
    });
});