const connection = require('./connection')

const User = connection.database.define('user', {
	id: {
		type: connection.sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	email: {
		type: connection.sequelize.STRING,
		unique: true,
    allowNull: false

	},
	password: {
		type: connection.sequelize.STRING,
		allowNull: false
	},
	token: {
		type: connection.sequelize.STRING,
		
	},
}, { timestamps: false,})

module.exports = User
