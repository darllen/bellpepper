const express = require('express');
const cors = require('cors');
const app = express();
const port = 8081;
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(cors({
	origin: '*'
}));
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('<p style="background-color:pink;">Teste</p>');
});

app.get('/registerRecipe',(req,res)=>{
	var form = "<form action='/recipe' method='POST'>";
	form+="<label>Título: </label><input type='text' name='title'><br>";
	form+="<label>Dificuldade: </label><input type='text' name='level'><br>";
	form+="<label>Descrição: </label><input type='text' name='description'><br>";
	form+="<button>Cadastrar</button></form>";
	
	res.send('<div>Cadastre um novo produto.</div><br>'+form);
});


app.post('/recipe', (req,res)=>{
	
	var title = req.body.title;
	var level = req.body.level;
	var description = req.body.description;
	
	var newRecipe = {title:title, level:level, description:description};
	
	fs.readFile('recipes.json','utf8',(erro, texto)=>{
		if (erro)
		throw "Deu algum erro: "+erro;
		
		var meuBD = JSON.parse(texto);
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
