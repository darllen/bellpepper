console.log('po0i')

function getRecipes(URL = 'https://voluble-conkies-26aad6.netlify.app/.netlify/functions/api') {
  fetch(URL)
  .then((response) => response.json())
  .then((data) => console.log(data));
}

console.log(getRecipes())
