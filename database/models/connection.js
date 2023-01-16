const sequelize = require('sequelize')

//CREATE USER 'user1'@localhost IDENTIFIED BY 'password1';
//GRANT ALL PRIVILEGES ON *.* TO 'user1'@localhost IDENTIFIED BY 'password1';

const database = new sequelize('bellpepper', 'user1', 'password1', {
	host: 'localhost',
	dialect: 'mariadb'
})

database.authenticate().then(() => {
	console.log('Conectado')
}).catch(error => {
	console.log('Erro ao conectar', error)
})

module.exports = {
  database: database,
  sequelize: sequelize
}
