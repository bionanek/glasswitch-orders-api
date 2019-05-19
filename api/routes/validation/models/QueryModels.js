const { CurrencyEnum, OrderEnum } = require("@helpers/enums");

exports.ProductsQueries = {
	ByPriceRangeQueryModel: {
		priceFrom: "number",
		priceTo: "number",
		curr: CurrencyEnum,
		order: OrderEnum
	}
};
