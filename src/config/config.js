require("dotenv").config();

const development = {
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
	host: process.env.DATABASE_HOST,
	dialect: "postgres",
};

const test = {
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
	host: process.env.DATABASE_HOST,
	dialect: "postgres",
};

const production = {
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
	host: process.env.DATABASE_HOST,
	dialect: "postgres",
};

// const config = {
// 	dev: ,
// 	test: {
// 		username: process.env.DATABASE_USER as string,
// 		password: process.env.DATABASE_PASSWORD as string,
// 		database: (process.env.DATABASE + "_test") as string,
// 		host: process.env.DATABASE_HOST as any,
// 		dialect: process.env.DB_DIALECT as "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql",
// 	},
// 	production: {
// 		username: process.env.DATABASE_USER as string,
// 		password: process.env.DATABASE_PASSWORD as string,
// 		database: (process.env.DATABASE + "_prod") as string,
// 		host: process.env.DATABASE_HOST as any,
// 		dialect: process.env.DB_DIALECT as "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql",
// 	},
// };

module.exports = { development, test, development };
