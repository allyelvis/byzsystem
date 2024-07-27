import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.json';

const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];

const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
  host: configEnv.host,
  dialect: configEnv.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, DataTypes);
db.Product = require('./product')(sequelize, DataTypes);
db.Sale = require('./sale')(sequelize, DataTypes);

// Define relationships
db.Product.hasMany(db.Sale, { foreignKey: 'productId' });
db.Sale.belongsTo(db.Product, { foreignKey: 'productId' });

export default db;
