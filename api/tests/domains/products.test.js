const expect = require('chai').expect;

const ProductDb = require('../../db/models/product');
const productDomain = require('../../domain/products');

describe('Products', () => {

    let clearDatabase = () => {
        console.log("Called clearDatabase");
        ProductDb.Products.destroy({
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

    it('Should create new product', async () => {
        //ARRANGE
        var productTestObj = {
            name: 'TestProduct'
        };
        console.log('Mock object: ' + productTestObj.name + ', ' + productTestObj.id);

        //ACT
        var createdProduct = await productDomain.create(productTestObj);

        //ASSERT
        expect(createdProduct).to.have.property('name').equal(productTestObj.name);
        expect(createdProduct).to.have.property('id');
        expect(createdProduct).to.have.property('id').that.is.a('number');
    });

    it('Should not create new product with name as empty string', async () => {
        //ARRANGE
        var productTestObj = {
            name: ""
        };
        var expectedErrorString = 'Name can\'t be empty';

        try {
            //ACT
            await productDomain.create(productTestObj);
        } catch (error) {
            //ASSERT
            expect(error).to.have.property('message').to.equal(expectedErrorString);
        }

    });

    it('Should not create new product with name as space only string', async () => {
        //ARRANGE
        var productTestObj = {
            name: " "
        };
        var expectedErrorString = 'Name can\'t be empty';

        try {
            //ACT
            await productDomain.create(productTestObj);
        } catch (error) {
            //ASSERT
            expect(error).to.have.property('message').to.equal(expectedErrorString);
        }
    });

    it('Should return a list of all products', async () => {
        //ARRANGE
        var productTestObj1 = {
            name: "Product1"
        };

        var productTestObj2 = {
            name: "Product2"
        };

        await ProductDb.Products.bulkCreate([productTestObj1, productTestObj2]);

        //ACT
        const allProducts = await ProductDb.Products.findAll()
            .map(el => el.get({ plain: true }));
        //ASSERT
        expect(allProducts).to.be.an('array');
        expect(allProducts).to.have.lengthOf(2);
    });

    it('Should return empty array when there are no products in DB', async () => {
        //ACT
        const result = await productDomain.getAll();

        //ASSERT
        expect(result).to.be.an('array');
        expect(result).to.has.lengthOf(0);
    });
});