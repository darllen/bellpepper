const express = require('express');
const cors = require('cors');
const app = express();
const port = 8081;
const fs = require('fs');
const bodyParser = require('body-parser');

// baixar mariadb, criar tabela bellpepper e usuario (Ou não)

const sequelize = require('sequelize')
const database = new sequelize('bellpepper', 'user1', 'password1', {
	host: 'localhost',
	dialect: 'mariadb'
})

database.authenticate().then(() => {
	console.log('Conectado')
}).catch(error => {
	console.log('Erro ao conectar', error)
})

const Receita = database.define('receita', {
	id: {
		type: sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: sequelize.STRING
	},
	level: {
		type: sequelize.STRING
	},
	description: {
		type: sequelize.STRING
	}
})

Receita.sync()


app.use(cors({
	origin: '*'
}));
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.post('/recipe', (req,res)=>{
	
	var title = req.body.title;
	var level = req.body.level;
	var description = req.body.description;
	var imgLink = req.body.imgLink;
	
	var newRecipe = {id: null, title:title, level:level, description:description, imgLink: imgLink};
	
	fs.readFile('recipes.json','utf8',(erro, texto)=>{
		if (erro)
		throw "Deu algum erro: "+erro;
		
		var meuBD = JSON.parse(texto);
		for (recipe in meuBD.recipes) {
			lastID = meuBD.recipes[recipe].id
		}

		if (!meuBD.recipes[0]) lastID = 0
		
		newRecipe.id = parseFloat(lastID) + 1
		meuBD.recipes.push(newRecipe);

		var meuBDString = JSON.stringify(meuBD);
		
		fs.writeFile('recipes.json',meuBDString,(erro)=>{
			if (erro){
				throw "Deu algum erro: "+erro;
			}
			else{
				res.send(meuBDString);
			}
		});
	});
});

app.get('/recipe', (req,res)=>{
	
	var title = req.query.title;
	var level = req.query.level;
		
	fs.readFile('recipes.json','utf8',(erro, texto)=>{
		if (erro)
			throw "Deu algum erro: "+erro;
		var meuBD = JSON.parse(texto);
		var recipes = meuBD.recipes;

		if(title && !level) {

			var encontrado = recipes.filter(p => (p.title.toLowerCase().includes(title.toLowerCase())));
			res.send(encontrado)
			return

		} else if(title && level) {
			var encontrado = recipes.filter(p => (p.title.toLowerCase().includes(title.toLowerCase())) && p.level.toLowerCase().includes(level.toLowerCase()));
			res.send(encontrado)
			return

		} else if(!title && level) {
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


app.listen(port, () => {
	console.log(`Esta aplicação está escutando a
	porta ${port}`)
});
