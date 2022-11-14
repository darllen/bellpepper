function Exibir() {
    var elemento_pai = document.body;
    var paragrafo = document.createElement('p');

    paragrafo.textContent = entrada.value;
    elemento_pai.appendChild(paragrafo);

    paragrafo.style.backgroundColor = "#83C5BE";
    paragrafo.style.borderRadius = "5px";
    paragrafo.style.padding = "3% 3% 3% 5%";
    paragrafo.style.width = "60%";
    paragrafo.style.height = "auto";

}

const entrada = document.getElementById('inpt');
const botaoEnviar = document.getElementById('btn1');
const botaoApagar = document.getElementById('btn2');
const saida = document.getElementById('output')
