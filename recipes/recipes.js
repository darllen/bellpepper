console.log('oi')

function getRecipes(URL = 'https://us-east1-dant-financeiro-359200.cloudfunctions.net/function-recipes') {
  resp = axios.get(URL)
    .then(data => console.log(data))
    .catch(err => console.log(err))
  
  return resp
}


console.log(getRecipes())
