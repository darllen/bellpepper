function Exibir() {
    var divList = document.getElementById('list');
    let item = document.createElement('div')
    let itemText = document.createElement('div')
    let itemActions = document.createElement('div')
    
    divList.appendChild(item)
    
    item.appendChild(itemText)
    item.appendChild(itemActions)
    
    let paragrafo = document.createElement('p');
    paragrafo.textContent = entrada.value;
    
    
    item.classList.add('item')
    itemText.classList.add('item-text')
    
    itemActions.outerHTML += '<div class="item-actions"><svg xmlns="http://www.w3.org/2000/svg" class="primary-button" onclick="deleteItem(this)" height="32" width="32" viewbox="0 0 48 48"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg><svg xmlns="http://www.w3.org/2000/svg" class="secondary-button" height="32" width="32" viewbox="-5 0 58 58"><path d="M9 47.4q-1.2 0-2.1-.9-.9-.9-.9-2.1v-30q0-1.2.9-2.1.9-.9 2.1-.9h20.25l-3 3H9v30h30V27l3-3v20.4q0 1.2-.9 2.1-.9.9-2.1.9Zm15-18Zm9.1-17.6 2.15 2.1L21 28.1v4.3h4.25l14.3-14.3 2.1 2.1L26.5 35.4H18v-8.5Zm8.55 8.4-8.55-8.4 5-5q.85-.85 2.125-.85t2.125.9l4.2 4.25q.85.9.85 2.125t-.9 2.075Z"/></svg></div>' 
    itemText.appendChild(paragrafo);
    


    document.getElementById('inpt').value = "";

}

const deleteItem = item => ((item.parentElement).parentElement).remove()

const entrada = document.getElementById('inpt');
const botaoEnviar = document.getElementById('btn');

var initialText = document.getElementById('sub-logo')
initialText.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "

initialText.style.color = '#284982';
initialText.style.fontSize = '18px';
initialText.style.width = '45%';
initialText.style.letterSpacing = '.1rem';
initialText.style.textAlign = 'right';
initialText.style.marginLeft = '5%';
