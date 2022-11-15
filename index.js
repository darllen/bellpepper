function Exibir() {
    var body = document.body;
    var div = document.createElement('div');
    body.appendChild(div);

    var paragrafo = document.createElement('p');
    paragrafo.textContent = entrada.value;
    div.appendChild(paragrafo);

    var icone_editar = document.createElement('img');
    icone_editar.src = 'img/editar.jpg';
    div.appendChild(icone_editar);

    var icone_excluir = document.createElement('img');
    icone_excluir.src = 'img/excluir.png';
    div.appendChild(icone_excluir);


    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.marginBottom = '3%';

    paragrafo.style.backgroundColor = '#FFFFFF';
    paragrafo.style.color = '#284982';
    paragrafo.style.boxShadow = '0px 2px 5px 0px rgba(0, 0, 0, 0.25)';
    paragrafo.style.width = '40%'; 
    paragrafo.style.height = '5vh'; 
    paragrafo.style.paddingLeft = '1em';
    paragrafo.style.paddingTop = '1em';

    icone_editar.style.width = '35px';
    icone_editar.style.marginLeft = '2%'

    icone_excluir.style.width = '35px';
    icone_excluir.style.marginLeft = '2%'

    document.getElementById('inpt').value = "";

}

const entrada = document.getElementById('inpt');
const botaoEnviar = document.getElementById('btn');
const saida = document.getElementById('output')

var initialText = document.getElementById('sub-logo')
initialText.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "

initialText.style.color = '#284982';
initialText.style.fontSize = '18px';
initialText.style.width = '45%';
initialText.style.letterSpacing = '.1rem';
initialText.style.textAlign = 'right';
initialText.style.marginLeft = '5%';
