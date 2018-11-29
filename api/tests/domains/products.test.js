const expect = require('chai').expect;

const DbHelper = require('../../db/dbHelper');
const ProductDb = DbHelper.Products;
const PriceDb = DbHelper.Prices;
const Sequelize = DbHelper.Sequelize;
const productDomain = require('../../domain/productsDomain');

describe('Products', () => {
    let price;

    before(async () =>{
        await Sequelize.sync({force: true});

        price = await PriceDb.create({
            pln: 4.2,
            eur: 4.2,
            usd: 4.2
        });

        console.log('============= Price created, id: ' + price.id + ' =============')

        return;
    });

    afterEach(async () => {
        return await ProductDb.sync({force: true});
    });

    it('Should create new product', async () => {
        //ARRANGE
        var productTestObj = {
            name: 'TestProduct',
            description: 'Description',
            type: 'Type',
            category: 'Category',
            width: 12.2,
            height: 13.2,
            depth: 44.2,
            image: 'Image Path',
            Product_priceID: price.id
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

        await ProductDb.bulkCreate([productTestObj1, productTestObj2]);

        //ACT
        const allProducts = await ProductDb.findAll()
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