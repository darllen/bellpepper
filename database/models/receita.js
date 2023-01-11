const connection = require('./connection')

const Receita = connection.database.define('receita', {
	id: {
		type: connection.sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: connection.sequelize.STRING
	},
	level: {
		type: connection.sequelize.STRING
	},
	description: {
		type: connection.sequelize.STRING
	}
})

module.exports = Receita
