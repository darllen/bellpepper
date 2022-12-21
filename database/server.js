const express = require('express');
const app = express();
const port = 8081;
const fs = require('fs');
const bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false})


app.get('/', (req, res) => {
	res.send('<p style="background-color:pink;">Teste</p>');
});

app.get('/cadastraProduto',(req,res)=>{
	var form = "<form action='/produto' method='POST'>";
	form+="<label>Código: </label><input type='text' name='codigo'><br>";
	form+="<label>Nome: </label><input type='text' name='nome'><br>";
	form+="<label>Preço: </label><input type='text' name='preco'><br>";
	form+="<button>Cadastrar</button></form>";
	
	res.send('<div>Cadastre um novo produto.</div><br>'+form);
});

app.get('/buscaProduto',(req,res)=>{
	var form = "<form action='/produto' method='GET'>";
	form+="<label>Preço: </label><input type='text' name='preco'><br>";
	form+="<label>Nome: </label><input type='text' name='nome'>";
	form+="<button>Buscar</button></form>";
	
	res.send('<div>Procure o seu produto.</div><br>'+form);
});

app.post('/produto', urlEncodedParser, (req,res)=>{
	
	var codigo = req.body.codigo;
	var nome = req.body.nome;
	var preco = req.body.preco;
	
	var novoProduto = {codigo:codigo, nome:nome, preco:preco};
	
	fs.readFile('recipes.json','utf8',(erro, texto)=>{
		if (erro)
			throw "Deu algum erro: "+erro;
		
		var meuBD = JSON.parse(texto);
		meuBD.produtos.push(novoProduto);
		
		var meuBDString = JSON.stringify(meuBD);
		console.log(meuBDString);
		
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

app.get('/produto', (req,res)=>{
	
	var preco = req.query.preco;
	var nome = req.query.nome;
	
	console.log(req.query);
		
	fs.readFile('recipes.json','utf8',(erro, texto)=>{
		if (erro)
			throw "Deu algum erro: "+erro;
		var meuBD = JSON.parse(texto);
		var produtos = meuBD.produtos;
		console.log(meuBD);
		
		var encontrado = produtos.filter(p => (parseFloat(p.preco) < preco && p.nome.toLowerCase().includes(nome.toLowerCase())));
		var exibicao = "";
		
		for(var i=0; i < encontrado.length;i++){
			exibicao+= "<a href='/detalhe/"+encontrado[i].codigo+"'>";
			exibicao+= "<b>Nome:</b> "+encontrado[i].nome;
			exibicao+= "<b> Preço </b> "+encontrado[i].preco;
			exibicao+= "</a><br>";
		}
		res.send(encontrado);
	})
});


app.listen(port, () => {
	console.log(`Esta aplicação está escutando a
	porta ${port}`)
});
