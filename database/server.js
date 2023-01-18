const express = require('express');
const cors = require('cors');
const app = express();
const port = 8081;
const fs = require('fs');
const bodyParser = require('body-parser');
const crypto = require("crypto");
const connection = require('./models/connection')
const bellpepper = require('./models/bellpepper');
const { sequelize, database } = require('./models/connection');
const { Op, where } = require("sequelize");

const Receita = require('./models/receita');
const User = require('./models/user')



connection.database.authenticate().then(() => {
	console.log("Conectado!!")
}).catch((error) => {
	console.log(error)
})

connection.database.sync({ alter: true })
// baixar mariadb, criar tabela bellpepper e usuario (Ou não)


var userToken = ''
var userEmail = ''

app.use(cors({
	origin: '*'
}));
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

/** 
app.post('/recipe', (req, res) => {

	var title = req.body.title;
	var level = req.body.level;
	var description = req.body.description;
	var imgLink = req.body.imgLink;

	var newRecipe = { id: null, title: title, level: level, description: description, imgLink: imgLink };

	fs.readFile('recipes.json', 'utf8', (erro, texto) => {
		if (erro)
			throw "Deu algum erro: " + erro;

		var meuBD = JSON.parse(texto);
		for (recipe in meuBD.recipes) {
			lastID = meuBD.recipes[recipe].id
		}

		if (!meuBD.recipes[0]) lastID = 0

		newRecipe.id = parseFloat(lastID) + 1
		meuBD.recipes.push(newRecipe);

		var meuBDString = JSON.stringify(meuBD);

		fs.writeFile('recipes.json', meuBDString, (erro) => {
			if (erro) {
				throw "Deu algum erro: " + erro;
			}
			else {
				res.send(meuBDString);
			}
		});
	});
});
*/

app.post('/recipe', (req, res) => {
	recipe = Receita.create({
		title: req.body.title,
		level: req.body.level,
		description: req.body.description,
		imgLink: req.body.imgLink
	}).then(() => {
		console.log('`Receita inserida')
	}).catch((error) => {
		console.log(error)
	})

})

/*
app.get('/recipe', (req, res) => {

	var title = req.query.title;
	var level = req.query.level;

	fs.readFile('recipes.json', 'utf8', (erro, texto) => {
		if (erro)
			throw "Deu algum erro: " + erro;
		var meuBD = JSON.parse(texto);
		var recipes = meuBD.recipes;

		if (title && !level) {

			var encontrado = recipes.filter(p => (p.title.toLowerCase().includes(title.toLowerCase())));
			res.send(encontrado)
			return

		} else if (title && level) {
			var encontrado = recipes.filter(p => (p.title.toLowerCase().includes(title.toLowerCase())) && p.level.toLowerCase().includes(level.toLowerCase()));
			res.send(encontrado)
			return

		} else if (!title && level) {
			var encontrado = recipes.filter(p => (p.level.toLowerCase().includes(level.toLowerCase())));
			res.send(encontrado)
			return

		} else {
			var encontrado = recipes
			res.send(encontrado)
			return
		}


	})
});
*/

app.get('/recipe', (req, res) => {

	var id = req.query.id
	var title = req.query.title;
	var level = req.query.level;
	console.log(title)

	debugger
	if (!id) {
		Receita.findAll(
			{
				where: {
					title: {
						[Op.like]: `%${title}%`
					},
					level: {
						[Op.like]: `%${level}%`
					}
				}
			}
		).then((recipes) => {
			res.send(recipes);

		}).catch(function (erro) {
			console.log("Erro na consulta: " + erro)
			res.send("Ocorreu algum problema na consulta");
		})
	} else {
		Receita.findOne(
			{
				where: {
					
						id: id
					
				}
			}
		).then((recipe) => {
			console.log(recipe)
			res.send(recipe);

		}).catch(function (erro) {
			console.log("Erro na consulta: " + erro)
			res.send("Ocorreu algum problema na consulta");
		})
	}


});

app.get('/editRecipe', async (req, res) => {
	console.log(req.query.title)
	const recipe = await Receita.update(
	{
		title: req.query.title,
		level: req.query.level,
		description: req.query.description,
		imgLink: req.query.imgLink
	}, 
	{
		where: {id: req.query.id}

	}).then(() => {
		console.log('Receita atualizada')
	}).catch((error) => {
		console.log(error)
	})
	
})

app.delete('/recipe', async (req, res) => {
	id = req.query.id
	console.log(`oi`)
	await Receita.destroy({
		where: {
			id: id
		}
	}).then(() => {
		res.send('Receita excluida')
	})
})




// user

app.post('/user', (req, res) => {
	user = User.create({
		email: req.body.email,
		password: req.body.password,
	}).then(() => {
		console.log('Usuário criado')
	}).catch((error) => {
		console.log(error)
	})

})

app.get('/user', (req, res) => {

	var id = req.query.id
	var email = req.query.email || '';

	debugger
	if (!id) {
		User.findAll(
			{
				where: {
					email: {
						[Op.like]: `%${email}%`
					}
				}
			}
		).then((users) => {
			res.send(users);

		}).catch(function (erro) {
			console.log("Erro na consulta: " + erro)
			res.send("Ocorreu algum problema na consulta");
		})
	} else {
		User.findOne(
			{
				where: {
						id: id
				}

			}).then((user) => {
			console.log(user)
			res.send(user);

		}).catch(function (erro) {
			console.log("Erro na consulta: " + erro)
			res.send("Ocorreu algum problema na consulta");
		})
	}


});

app.get('/editUser', async (req, res) => {
	console.log(req.query.title)
	const user = await User.update(
	{
		email: req.query.email,
		password: req.query.password,
	}, 
	{
		where: {id: req.query.id}
	}).then(() => {
		console.log('Usuário atualizado')
	}).catch((error) => {
		console.log(error)
	})
	
})

app.delete('/user', async (req, res) => {
	id = req.query.id
	await User.destroy({
		where: {
			id: id
		}
	}).then(() => {
		res.send('Usuário excluído')
	})
})

app.post('/sign-in', async (req, res) => {
	email = req.body.email || ''
	password = req.body.password || ''
	console.log(email)
	result = await User.findOne(
		{
			where: {
				email: email,
				password: password
			}
		}

	)
	console.log(result)
	if (result) {
		token = crypto.randomBytes(20).toString('hex')
		userEmail = email
		userToken = token
		console.log(userToken)
		User.update(
			{
				token: token
			},
			{
				where: { email }
			}
		).then(() => {
			res.send('1')
		})
	}
	else {
		res.send('Login não realizado')
	}
})


app.listen(port, () => {
	console.log(`Esta aplicação está escutando a
	porta ${port}`)
});

app.get('/verifyToken', async (req, res) => {
	console.log(userEmail)
	result = await User.findOne(
		{
			where: {
				email: userEmail,
				token: userToken
			}
		}

	)
	if(result) {
		res.send('1')
	} else {
		res.send('0')
	}
})

app.get('/sign-out', async (req, res) => {
	result = await User.findOne(
		{
			where: {
				email: userEmail,
				token: userToken
			}
		}

	)
	if (result) {
		token = crypto.randomBytes(20).toString('hex')
		userEmail = email
		console.log(userToken)
		User.update(
			{
				token: token
			},
			{
				where: { email }
			}
		).then(() => {
			res.send('1')
		})
	}
	
})

