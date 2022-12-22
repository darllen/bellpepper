URL =  'https://voluble-conkies-26aad6.netlify.app/.netlify/functions/api'
//URL =  'https://us-east1-dant-financeiro-359200.cloudfunctions.net/function-recipes'

async function getRecipes(UR) {
  const resp = await axios.get(URL)
    .then(data => data.data)
    .catch(err => console.log(err))
  
  return formatRecipes(resp)
}

function formatRecipes(recipes) {
  recipes = JSON.parse(recipes)
  console.log(recipes)
  return showRecipes(recipes)
}

function showRecipes(recipes) {
  result = ''
  for (recipe in recipes) {
    result += `
    <div class="card">
      <div class="portrait"><img class="recipe-img" src="${recipes[recipe].img}" alt=""></div>
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