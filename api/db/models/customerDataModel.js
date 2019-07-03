const Types = require("sequelize")

exports.customerDataModel = {
	id: {
		type: Types.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: { type: Types.STRING, allowNull: false },
	email: { type: Types.STRING, allowNull: false },
	phone: { type: Types.STRING, allowNull: true },
	vatNumber: { type: Types.STRING, allowNull: false },
	delivery_street: { type: Types.STRING, allowNull: false },
	delivery_city: { type: Types.STRING, allowNull: false },
	delivery_country: { type: Types.STRING, allowNull: false },
	delivery_postCode: { type: Types.STRING, allowNull: true },
	billing_street: { type: Types.STRING, allowNull: false },
	billing_city: { type: Types.STRING, allowNull: false },
	billing_country: { type: Types.STRING, allowNull: false },
	billing_postCode: { type: Types.STRING, allowNull: true }
}
