const Types = require("sequelize");

exports.productDataModel = {
  id: {
    type: Types.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: Types.STRING, allowNull: false },
  description: { type: Types.STRING, allowNull: true },
  type: { type: Types.STRING, allowNull: false },
  category: {
    type: Types.STRING,
    allowNull: false,
    defaultValue: ""
  },
  width: { type: Types.STRING, allowNull: true },
  height: { type: Types.STRING, allowNull: true },
  depth: { type: Types.STRING, allowNull: true },
  imageUrl: { type: Types.STRING, allowNull: true }
};
