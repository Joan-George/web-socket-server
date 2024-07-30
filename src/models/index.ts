import { readdirSync } from "fs";
import { join } from "path";
import { DataTypes, Sequelize } from "sequelize";
import config from "../../config/config";

const env = process.env.NODE_ENV || "dev";
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

const db: any = {};

readdirSync(__dirname)
	.filter((file) => {
		console.log(file.indexOf(".") !== 0 && file !== "index.ts" && file.slice(-3) === ".ts");
		return file.indexOf(".") !== 0 && file !== "index.ts" && file.slice(-3) === ".ts";
	})
	.forEach((file) => {
		const model = require(join(__dirname, file))(sequelize, DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
