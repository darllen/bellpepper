async function getRecipes() {
  
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
      <div class="portrait"><img class="recipe-img" src="${recipes[recipe].imglink}" alt=""></div>
      <div class="recipe-box">
        <div class="recipe-title"><h2>${recipes[recipe].title}</h2></div>
        <div class="recipe-description">${recipes[recipe].description}</div>
        <div class="recipe-level"><span></span>${recipes[recipe].level}</div>
      </div>
    </div>
    `
  }
  cards = document.getElementById('cards')
  cards.innerHTML = result

}

recipes = getRecipes(URL)