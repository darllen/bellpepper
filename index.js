function Exibir() {
  if (entrada.value == "") {
    overlay();
    return;
  }

  var divList = document.getElementById("list");
  let item = document.createElement("div");
  let itemText = document.createElement("div");
  let itemActions = document.createElement("div");
  let itemCheck = document.createElement("input");
  let paragrafo = document.createElement("p");
  let inputEdit = document.createElement("input");
  inputEdit.type = 'text'

  divList.appendChild(item);

  item.appendChild(itemText);
  item.appendChild(itemActions);

  // Mostrar e sumir opções
  item.addEventListener("mouseenter", onMouseInItem);
  item.addEventListener("mouseleave", onMouseOutItem);
  // end

  item.classList.add("item");
  itemText.classList.add("item-text");
  itemCheck.classList.add("checkinho");
  inputEdit.classList.add("input-item");
  inputEdit.id = 'new-text'

  paragrafo.textContent = entrada.value;

  itemCheck.type = "checkbox";
  itemText.appendChild(itemCheck);
  itemText.appendChild(paragrafo);
  itemText.appendChild(inputEdit)
  itemActions.outerHTML += '<div class="item-actions" id="actions"><svg xmlns="http://www.w3.org/2000/svg" onclick="deleteItem(this)" class="primary-button" height="32" width="32" viewbox="0 0 48 48"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg><svg xmlns="http://www.w3.org/2000/svg" class="secondary-button" onclick="editItem(this)" height="32" width="32" viewbox="-5 0 58 58"><path d="M9 47.4q-1.2 0-2.1-.9-.9-.9-.9-2.1v-30q0-1.2.9-2.1.9-.9 2.1-.9h20.25l-3 3H9v30h30V27l3-3v20.4q0 1.2-.9 2.1-.9.9-2.1.9Zm15-18Zm9.1-17.6 2.15 2.1L21 28.1v4.3h4.25l14.3-14.3 2.1 2.1L26.5 35.4H18v-8.5Zm8.55 8.4-8.55-8.4 5-5q.85-.85 2.125-.85t2.125.9l4.2 4.25q.85.9.85 2.125t-.9 2.075Z"/></svg></div> <div class="item-actions" id="edit"><svg xmlns="http://www.w3.org/2000/svg" class="primary-button success-color" onclick="saveEdit(this)" height="32" width="32" viewbox="0 0 48 48"><path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z"/></svg><svg xmlns="http://www.w3.org/2000/svg" class="secondary-button danger-color" onclick="exitEdit(this)" height="32" width="32" viewbox="0 0 48 48"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg></div>';

  document.getElementById("inpt").value = "";
}

/* Session Edit Item */
function editItem(item) {
  inEdit = true;
  
  let itemActionsSaveChange = document.createElement("div");
  
  
  const divParent = getItemTextDiv(item);
  const paragraph = getItemTextDiv(item).children[0].children[1];
  const checkbox = getItemTextDiv(item).children[0].children[0];
  const actionsEdit = getItemTextDiv(item).children[3]
  const inputEdit = getItemTextDiv(item).children[0].children[2]
  const actionsDiv = getItemTextDiv(item).children[2];
  
  inputEdit.focus()
  inputEdit.style.display = 'block'
  inputEdit.value = paragraph.innerHTML
  
  paragraph.style.display = "none";
  checkbox.style.display = "none";
  actionsDiv.style.display = "none";

  actionsEdit.style.display = "grid";
  
  
  
  divParent.appendChild(itemActionsSaveChange);
  
  console.log(getItemTextDiv(item).children[0].children)
  //divParent.innerHTML += '<div class="item-actions" id="edit"><svg xmlns="http://www.w3.org/2000/svg" class="primary-button success-color" onclick="saveEdit(this)" height="32" width="32" viewbox="0 0 48 48"><path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z"/></svg><svg xmlns="http://www.w3.org/2000/svg" class="secondary-button danger-color" onclick="exitEdit(this)" height="32" width="32" viewbox="0 0 48 48"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg></div>';
  const actionsEditDiv = divParent.children[4];

  actionsEditDiv.style.display = "grid";
  
}

  function exitEdit(item) {
    inEdit = false
    const divParent = getItemTextDiv(item);
    const divText = getItemTextDiv(item).children[0];
    const paragraph = getItemTextDiv(item).children[0].children[1];
    const checkbox = getItemTextDiv(item).children[0].children[0];
    const inputEdit = getItemTextDiv(item).children[0].children[2]

    actionsEditDiv = divParent.children[3];
    actionsDiv = getItemTextDiv(item).children[2];

    actionsEditDiv.style.display = 'none'
    inputEdit.style.display = 'none'
    actionsDiv.style.display = 'grid'
    paragraph.style.display = 'grid'
    checkbox.style.display = ''

    console.log(defaultParagraphValue)
  }

  function saveEdit(item) {
    const paragraph = getItemTextDiv(item).children[0].children[1];
    const inputEdit = getItemTextDiv(item).children[0].children[2]
    console.log(paragraph)
    console.log(inputEdit.value)
    paragraph.innerHTML = inputEdit.value
    console.log(paragraph)
    exitEdit(item)
  }


/* session end */

/* Hover item session */
function options(item, action) {
  // if not item in edit: do it (to do)
  if (!inEdit) {
    if (action == "open") {
      item.target.children[2].style.display = "grid";
    } else {
      item.target.children[2].style.display = "none";
    }
  }
}

function onMouseInItem(item) {
  item.target.style.background = "rgba(255,255,255,.5)";
  options(item, "open");
}

function onMouseOutItem(item) {
  item.target.style.backgroundColor = "#E6EBF6";
  options(item, "close");
}
/* session end */

/* Input Listener Session */

function startListener(input) {
  input.addEventListener("input", updateInput);
  input.addEventListener("focusout", focusOut);
  input.addEventListener("focusin", focusIn);
}

function updateInput(item) {
  if (item.target.value) {
    item.target.style.border = "1px solid #FFA924";
  } else {
    item.target.style.border = "1px solid #FF0000";
  }
}

function focusOut(item) {
  item.target.style.border = "1px solid #E6EBF6";
}
function focusIn(item) {
  item.target.style.border = "1px solid #FFA924";
}

/* session end */

function overlay(action = "open") {
  let overlay = document.getElementById("overlay");

  if (action == "open") {
    overlay.style.display = "grid";
  } else {
    overlay.style.display = "none";
  }
}

/* Receitas listener session */
function recipesStartListener(button) {
  button.addEventListener("mouseover", () => {
    debugger
    label = document.getElementById('recipes-label-button')
    label.style.display = 'inline'
  })
  button.addEventListener("mouseout", () => {
    debugger
    label = document.getElementById('recipes-label-button')
    label.style.display = 'none'
  })
}
/* session end */

var inEdit = false;
var defaultParagraphValue = ''

const getItemTextDiv = (item) => item.parentElement.parentElement;
const deleteItem = (item) => item.parentElement.parentElement.remove();

const entrada = document.getElementById("inpt");
const botaoEnviar = document.getElementById("btn");

var initialText = document.getElementById("sub-logo");
initialText.innerHTML =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. ";
