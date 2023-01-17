async function getRecipes() {
  let overlay = document.getElementById("overlay");
  overlay.style.display = "none"
  formElement = document.forms.searchRecipe
  formData = new FormData(formElement)
  params = {title: formData.get('title'), level: formData.get('level')}

  const res = await axios.get('http://localhost:8081/recipe', {params: params});
  console.log(res)
  data = res.data

  return formatRecipes(data)
}

function formatRecipes(recipes) {
  console.log(recipes)
  return showRecipes(recipes)
}

function showRecipes(recipes) {
  result = ''
  for (recipe in recipes) {
    result += `
    <div class="card">
      <div class="portrait"><img class="recipe-img" src="${recipes[recipe].imgLink}" alt=""></div>
      <div class="recipe-box">
        <div class="recipe-title"><h2>${recipes[recipe].title}</h2></div>
        <div class="recipe-description">${recipes[recipe].description}</div>
        <div class="recipe-level"><span></span>${recipes[recipe].level}</div>
        <div><div class="item-actions" style="display: flex;" id="edit"><svg xmlns="http://www.w3.org/2000/svg" class="primary-button" onclick="editItem(${recipes[recipe].id})" height="32" width="32" viewbox="-5 0 58 58"><path d="M9 47.4q-1.2 0-2.1-.9-.9-.9-.9-2.1v-30q0-1.2.9-2.1.9-.9 2.1-.9h20.25l-3 3H9v30h30V27l3-3v20.4q0 1.2-.9 2.1-.9.9-2.1.9Zm15-18Zm9.1-17.6 2.15 2.1L21 28.1v4.3h4.25l14.3-14.3 2.1 2.1L26.5 35.4H18v-8.5Zm8.55 8.4-8.55-8.4 5-5q.85-.85 2.125-.85t2.125.9l4.2 4.25q.85.9.85 2.125t-.9 2.075Z"/></svg><svg xmlns="http://www.w3.org/2000/svg" onclick="deleteItem(${recipes[recipe].id})" class="secondary-button" height="32" width="32" viewbox="0 0 48 48"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg></div> </div>
      </div>
      
    </div>
    `
  }
  cards = document.getElementById('cards')
  cards.innerHTML = result

}


async function deleteItem(id) {
  params = {id: id}
  
  const res = await axios.delete('http://localhost:8081/recipe', {params: params});
  return getRecipes()
}

async function editItem(id) {
  itemToEdit = await axios.get('http://localhost:8081/recipe', {params: {id: id}});
  item = itemToEdit.data
  return overlay(item)
}

function overlay(item = null, action = "open") {
  let overlay = document.getElementById("overlay");
  if (item) {
    form = document.getElementById("recipe")
    form['id'].value = item.id
    form["title"].value = item.title
    form["level"].value = item.level
    form["imgLink"].value = item.imgLink
    form["description"].value = item.description
  }
  
  if (action == "open") {
    overlay.style.display = "grid";
  } else {
    overlay.style.display = "none";
  }
}

async function sendEdit() {
  let overlay = document.getElementById("overlay");
  debugger
  formElement = document.forms.recipe
  formData = new FormData(formElement)
  params = {id: formData.get('id'), title: formData.get('title'), level: formData.get('level'), description: formData.get('description'), imgLink: formData.get('imgLink')}

  const res = await axios.get('http://localhost:8081/editRecipe', {params}).then(getRecipes())
  return

}

recipes = getRecipes(URL)
