console.log('oi')

// https://voluble-conkies-26aad6.netlify.app/.netlify/functions/api
// https://us-east1-dant-financeiro-359200.cloudfunctions.net/function-recipes

async function getRecipes(URL = 'https://voluble-conkies-26aad6.netlify.app/.netlify/functions/api') {
  const resp = await axios.get(URL)
    .then(data => data.data)
    .catch(err => console.log(err))
  
  return formatRecipes(resp)
}

function formatRecipes(recipes) {
  recipes = JSON.parse(recipes)
  console.log(recipes)
}

function showRecipes() {

}

recipes = getRecipes()
