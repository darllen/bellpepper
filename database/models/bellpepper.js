const connection = require('./connection')
const Receita = require('./receita')

const Bellpepper = connection.database.define('bellpepper',{
	nome: {
		type: connection.sequelize.STRING
	},
	descricao: {
		type: connection.sequelize.TEXT
	}
})

Receita.belongsTo(Bellpepper)
Bellpepper.hasMany(Receita)
